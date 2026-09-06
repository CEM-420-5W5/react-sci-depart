"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { MatchData, PlayerData } from './models';
import { useMatch } from './match-context';
import { useFakeMatch } from '@/hooks/useFakeMatch';


interface FakeSignalRContextType {
  isConnected: boolean;
  isJoiningMatch: boolean;
  waitForMatch: (matchId: number | null) => Promise<void>;
  cancelJoinMatch: () => Promise<void>;
  endTurn: () => Promise<void>;
  surrender: () => Promise<void>;
  connect: () => void;
}

const FakeSignalRContext = createContext<FakeSignalRContextType | undefined>(undefined);

export function SignalRProvider({ children }: { children: ReactNode }) {

  const {  myPlayerData, adversaryPlayerData, matchId, setMatchData, applyEvent } = useMatch();
  // TODO: La vrai implémentation ne devrait utiliser AUCUNE de ces méthodes!
  const { createFakeMatchData, createFakeStartMatchEvent, createFakePlayerEndTurnEvent, createFakeEndMatchEvent } = useFakeMatch();

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [isJoiningMatch, setIsJoiningMatch] = useState<boolean>(false);

  // Refs pour accéder aux données actuelles dans les event listeners
  const myPlayerDataRef = useRef<PlayerData | null>(null);
  const adversaryPlayerDataRef = useRef<PlayerData | null>(null);
  const matchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mettre à jour les refs chaque fois que les données changent
  /* Il faut garder ce code Début*/
  useEffect(() => {
    myPlayerDataRef.current = myPlayerData;
  }, [myPlayerData]);

  useEffect(() => {
    adversaryPlayerDataRef.current = adversaryPlayerData;
  }, [adversaryPlayerData]);
  /* Fin */

  // Cleanup: annuler le timeout si le composant se démonte
  useEffect(() => {
    return () => {
      if (matchTimeoutRef.current !== null) {
        clearTimeout(matchTimeoutRef.current);
      }
    };
  }, []);

  const connect = () => {
    // TODO: Dans la vraie implémentation, il faut se connecter à votre Hub
    fakeConnect();
  }

  const fakeConnect = () => {
    setTimeout(() => {
      setIsConnected(true);
    }, 2000);
  }

  const waitForMatch = async (matchId: number | null) => {    
    setIsJoiningMatch(true);

    fakeWaitForMatch();
  }

  const fakeWaitForMatch = async () => {
    matchTimeoutRef.current = setTimeout(() => {
      // Vérifier que le timeout n'a pas été annulé
      if (matchTimeoutRef.current !== null) {
        const fakeMatchData = createFakeMatchData();
        setMatchData(fakeMatchData);
        setIsJoiningMatch(false);
        matchTimeoutRef.current = null;

        let startMatchEvent = createFakeStartMatchEvent();
        applyEvent(startMatchEvent);
      }
    }, 3000);
  }

  const cancelJoinMatch = async () => {
    fakeCancelJoinMatch();
  }

  const fakeCancelJoinMatch = async () => {
    // Annuler le timeout en cours si actif
    if (matchTimeoutRef.current !== null) {
      clearTimeout(matchTimeoutRef.current);
      matchTimeoutRef.current = null;
    }
    setIsJoiningMatch(false);
  }

  const endTurn = async () => {
    fakeEndTurn();
  }

  const fakeEndTurn = async () => {
    let startMatchEvent = createFakePlayerEndTurnEvent(myPlayerDataRef.current!, adversaryPlayerDataRef.current!);
    applyEvent(startMatchEvent);

    // 1 seconde plus tard, on fait jouer l'adversaire
    setTimeout(() => {
      let startMatchEvent = createFakePlayerEndTurnEvent(adversaryPlayerDataRef.current!, myPlayerDataRef.current!);
      applyEvent(startMatchEvent);
    }, 1000);
  }

  const surrender = async () => {
    fakeSurrender();
  }

  const fakeSurrender = async () => {
    let endMatchEvent = createFakeEndMatchEvent(adversaryPlayerDataRef.current!);
    applyEvent(endMatchEvent);
  }

  return (
    <FakeSignalRContext.Provider value={{ isConnected, waitForMatch, endTurn, cancelJoinMatch, surrender, isJoiningMatch, connect }}>
      {children}
    </FakeSignalRContext.Provider>
  );
}

// Custom hook for easy consumption
export function useFakeSignalR() {
  const context = useContext(FakeSignalRContext);
  if (!context) {
    throw new Error('useFakeSignalR must be used within a FakeSignalRProvider');
  }
  return context;
}
