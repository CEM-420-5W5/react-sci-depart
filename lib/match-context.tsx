"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { MatchData, PlayableCard, PlayerData } from './models';
import { useAuth } from './auth-context';

interface MatchContextType {
  myPlayerData: PlayerData | null;
  adversaryPlayerData: PlayerData | null;
  isCurrentPlayerTurn: boolean;
  matchId: number | null;
  setMatchData: (match: MatchData) => void;
  applyEvent: (event: any) => Promise<void>;
  matchEndResult: { hasWon: boolean } | null;
  clearMatch: () => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: ReactNode }) {

  const {  playerId : myPlayerId } = useAuth();

  const [myPlayerData, setMyPlayerData] = useState<PlayerData | null>(null);
  const [matchId, setMatchId] = useState<number | null>(null);
  const [adversaryPlayerData, setAdversaryPlayerData] = useState<PlayerData | null>(null);
  const [isCurrentPlayerTurn, setIsCurrentPlayerTurn] = useState<boolean>(false);
  const [matchEndResult, setMatchEndResult] = useState<{ hasWon: boolean } | null>(null);

  // Refs pour accéder aux données actuelles dans les event listeners
  const myPlayerDataRef = useRef<PlayerData | null>(null);
  const adversaryPlayerDataRef = useRef<PlayerData | null>(null);

  // Mettre à jour les refs chaque fois que les données changent
  useEffect(() => {
    myPlayerDataRef.current = myPlayerData;
  }, [myPlayerData]);

  useEffect(() => {
    adversaryPlayerDataRef.current = adversaryPlayerData;
  }, [adversaryPlayerData]);

  const setMatchData = (matchData: MatchData) => {
    setMatchId(matchData.match.id);

    if(matchData.match.playerDataA.playerId == myPlayerId)
    {
      setMyPlayerData(matchData.match.playerDataA);
      setAdversaryPlayerData(matchData.match.playerDataB);
      // C'est notre tour si on est le joueur A et que c'est le tour du joueur A
      setIsCurrentPlayerTurn(matchData.match.isPlayerATurn);
    }
    else
    {
      setMyPlayerData(matchData.match.playerDataB);
      setAdversaryPlayerData(matchData.match.playerDataA);
      setIsCurrentPlayerTurn(!matchData.match.isPlayerATurn);
    }
  }

  const wait = async (delay:number) => {
    return await new Promise(resolve => setTimeout(resolve, delay));
  }

  const getPlayerDataCopy = (playerId:any) : PlayerData => {
    if(myPlayerDataRef.current?.playerId == playerId)
      return { ...myPlayerDataRef.current! };
    else if(adversaryPlayerDataRef.current?.playerId == playerId)
      return { ...adversaryPlayerDataRef.current! };
    throw new Error("PlayerData not found for playerId: " + playerId);
  }

  const updatePlayerData = (playerData:PlayerData) : void => {
    if(myPlayerDataRef.current?.id == playerData.id)
    {
      setMyPlayerData(playerData);
      myPlayerDataRef.current = playerData; // Update the ref as well
    }
    else if(adversaryPlayerDataRef.current?.id == playerData.id)
    {
      setAdversaryPlayerData(playerData);
      adversaryPlayerDataRef.current = playerData; // Update the ref as well
    }
    else
      throw new Error("PlayerData not found for playerData with id: " + playerData.id);
  }


  // La méthode qui passe à travers l'arbre d'évènements reçu par le serveur
  // Utiliser pour mettre les données à jour et jouer les animations
  const applyEvent = async (event:any) => {
    console.log("ApplyingEvent: " + event.eventType);
    switch(event.eventType){
      case "StartMatch": {
        await wait(1000);
        break;
      }

      case "PlayerEndTurn": {
        setIsCurrentPlayerTurn(prevData => !prevData);
        break;
      }

      case "DrawCard": {
        let playerData = getPlayerDataCopy(event.playerId);
        moveCard(playerData.cardsPile, playerData.hand, event.playableCardId);
        await wait(250);
        updatePlayerData(playerData);
        break;
      }

      case "EndMatch": {
        // TODO: Afficher un popup de fin de match avec le résultat qui indique si le joueur a gagné ou perdu
        // Pour l'instant on va simplement arrêter le match
        clearMatch();
        break;
      }
    }
    if(event.events){
      for(let e of event.events){
        await applyEvent(e);
      }
    }
  }

  const clearMatch = () => {
    setMyPlayerData(null);
    setAdversaryPlayerData(null);
    setMatchId(null);
    setIsCurrentPlayerTurn(false);
    setMatchEndResult(null);
  }

  const moveCard = (src:PlayableCard[], dst:PlayableCard[], playableCardId:any) => {
    let playableCard = src.find(c => c.id == playableCardId);

    if(playableCard != undefined){
      let index = src.findIndex(c => c.id == playableCardId);
      // Retire l'élément de l'array
      src.splice(index, 1);
      dst.push(playableCard);
    }
  }

  return (
    <MatchContext.Provider value={{ myPlayerData, adversaryPlayerData, isCurrentPlayerTurn, matchId, setMatchData, applyEvent, matchEndResult, clearMatch }}>
      {children}
    </MatchContext.Provider>
  );
}

// Custom hook for easy consumption
export function useMatch() {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
}
