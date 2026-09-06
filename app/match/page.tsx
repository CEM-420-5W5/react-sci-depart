"use client";

import { useFakeSignalR } from '@/lib/fake-signalr-context';
import { useEffect } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Button } from '@/components/ui/button';
import { MatchPlayerHand } from './match-player-hand';
import { MatchBattlefield } from './match-battlefield';
import { MatchPlayerData } from './match-player-data';
import { useMatch } from '@/lib/match-context';

export default function MatchPage() {
  useProtectedRoute();
  const {   isConnected, 
            waitForMatch, cancelJoinMatch, isJoiningMatch,
            endTurn, surrender,
            simulateConnection } = useFakeSignalR();
  const {   myPlayerData, adversaryPlayerData, isCurrentPlayerTurn } = useMatch();
  
  useEffect(() => {
    if (!isConnected) {
      simulateConnection();
    }
  }, [isConnected]);

  const handleJoinMatch = () => {
    waitForMatch(null);
  };

  const handleCancelJoinMatch = () => {
    cancelJoinMatch();
  }

  function renderHandAndControls(){
    if(!myPlayerData || !adversaryPlayerData){
        return null;
    }
    else{
        return(
        <div>
            <MatchPlayerHand cards={myPlayerData.hand} />
            <Button disabled={!isCurrentPlayerTurn} className="endturn" color="accent" style={{ marginRight: '20px' }} onClick={() => endTurn()}>Terminer</Button>
            <Button className="surrender" color="warn" style={{ marginRight: '20px' }} onClick={() => surrender()}>Abandonner</Button>
            <MatchPlayerData playerData={adversaryPlayerData} position="top" />
            <MatchPlayerData playerData={myPlayerData} position="bottom" />
        </div>
    );
    }
  }

  function renderPage(){
    if(!isConnected){
        return (
            <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                Connecting to Hub...
            </div>
        );
    }

    if(myPlayerData && adversaryPlayerData){ 
      return (
        <div style={{width: '100%'}}>
          <MatchBattlefield myPlayerData={myPlayerData} adversaryPlayerData={adversaryPlayerData}/>
          {myPlayerData != null && renderHandAndControls()}
        </div>
      );
    }

    if(!isJoiningMatch){
        return (
            <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                <Button onClick={handleJoinMatch}>Joindre une partie</Button>
            </div>  
        );
    }

    if(isJoiningMatch){
        return (
            <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Recherche d'une partie...
                <Button style={{marginLeft: '10px'}} onClick={handleCancelJoinMatch}>Cancel</Button>
            </div>
        );
    }
  }

  return (
    <div style={{height: '95%', display: 'flex', justifyContent: 'center'}}>{renderPage()}</div>
  );
}