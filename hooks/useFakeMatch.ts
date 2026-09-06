'use client';

import { Card, MatchData, PlayableCard, PlayerData } from "@/lib/models";




export function useFakeMatch() {
  const PLAYER_A_ID = 1;
  const PLAYER_B_ID = 2;

  const imageUrls = [
    "https://i.pinimg.com/originals/a8/16/49/a81649bd4b0f032ce633161c5a076b87.jpg",
    "https://i0.wp.com/thediscerningcat.com/wp-content/uploads/2021/02/tabby-cat-wearing-sunglasses.jpg",
    "https://cdn.wallpapersafari.com/27/53/SZ8PO9.jpg",
    "https://wallpapers.com/images/hd/epic-cat-poster-baavft05ylgta4j8.jpg",
    "https://i.etsystatic.com/6230905/r/il/32aa5a/3474618751/il_fullxfull.3474618751_mfvf.jpg",
    "https://store.playstation.com/store/api/chihiro/00_09_000/container/AU/en/99/EP2402-CUSA05624_00-ETH0000000002875/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720",
    "https://images.squarespace-cdn.com/content/51b3dc8ee4b051b96ceb10de/1394662654865-JKOZ7ZFF39247VYDTGG9/hilarious-jedi-cats-fight-video-preview.jpg?content-type=image%2Fjpeg",
    "https://i.ytimg.com/vi/2I7pZlUhZak/maxresdefault.jpg",
  ];

  const createFakeMatchData = () : MatchData => {
    let cards:Card[] = createFakeCards(); 
    let matchData:MatchData = {
      match: {
        id: -1,
        isMatchCompleted: false,
        isPlayerATurn: false,
        playerDataA: createFakePlayerData(1, PLAYER_A_ID, "Adversaire"),
        playerDataB: createFakePlayerData(2, PLAYER_B_ID, "Joueur"),
      },
      playerA: {
        id: PLAYER_A_ID,
        name: "Adversaire"
      },
      playerB: {
        id: PLAYER_B_ID,
        name: "Joueur"
      },
      winningPlayerId: -1
    }

    addCardsToPlayersPiles(matchData, cards);

    return matchData;
  }

  const createFakeCards = () : Card[] => {
    let cards: Card[] = [];
    for (let i = 1; i <= imageUrls.length; i++) {
      cards.push({
        id: i,
        name: `Card ${i}`,
        attack: i,
        health: i * 2,
        cost: i,
        imageUrl: imageUrls[i - 1]
      });
    }
    return cards;
  }

  const createFakePlayerData = (id:number, playerId:number, name:string) : PlayerData => {
    let playerData:PlayerData = {
          id: id,
          health: 20,
          maxHealth: 20,
          mana: 0,
          playerId: playerId,
          player: {name: name, id: playerId},
          cardsPile: [],
          hand: [],
          battleField: [],
          graveyard: []
    }
    return playerData;
  }

  // Ajoute des cartes aux piles des joueurs en générant un playableCardId (Les 2 joueurs ont leur propre copie de chaque carte)
  const addCardsToPlayersPiles = (matchData:MatchData, cards:Card[]) => {
    let playableCardId: number = 1;
    for(let c of cards){
      let playableCardB:PlayableCard = {
        id: playableCardId++,
        card: c,
        health: c.health,
      };
      matchData.match.playerDataB.cardsPile.push(playableCardB);

      let playableCardA:PlayableCard = {
        id: playableCardId++,
        card: c,
        health: c.health,
      };
      matchData.match.playerDataA.cardsPile.push(playableCardA);
    }
  }

  // Au début du match, chaque joueur va piger 2 cartes
  // Ensuite le tour commence et le premier joueur pige une carte de plus et reçoit du mana
  const createFakeStartMatchEvent = () => {
    return {
      eventType: "StartMatch",
      events: [
        {
          eventType: "DrawCard",
          playerId: PLAYER_B_ID,
          playableCardId: 1
        },
        {
          eventType: "DrawCard",
          playerId: PLAYER_A_ID,
          playableCardId: 2
        },
        {
          eventType: "DrawCard",
          playerId: PLAYER_B_ID,
          playableCardId: 3
        },
        {
          eventType: "DrawCard",
          playerId: PLAYER_A_ID,
          playableCardId: 4
        },
        // Début du tour du joueur B
        {
          eventType: "PlayerStartTurn",
          playerId: PLAYER_B_ID,
          events: [
            {
              eventType: "DrawCard",
              playerId: PLAYER_B_ID,
              playableCardId: 5
            },
            {
              eventType: "GainMana",
              playerId: PLAYER_B_ID,
              mana: 3
            }
          ]
        }
      ]
    };
  }

  const createDrawCardEventsForTest = (playerData:PlayerData, nbCards:number) : any[] => {
    let drawCardEvents:any[] = [];
    for(let i = 0; i < nbCards; i++){
      drawCardEvents.push(
        {
          eventType: "DrawCard",
          playerId: playerData.playerId,
          playableCardId: playerData.cardsPile[i].id
        }
      )
    }
    return drawCardEvents;
  }

  const createFakePlayerEndTurnEvent = (currentPlayer:PlayerData, nextPlayer:PlayerData) => {
    let fakeAdversaryStartTurnEvent = createFakeStartTurnEvent(nextPlayer);

    return {
      eventType: "PlayerEndTurn",
      playerId: currentPlayer.playerId,
      events: [fakeAdversaryStartTurnEvent]
    }
  }

  const createFakeStartTurnEvent = (playerData:PlayerData) => {
    // Creation d'un Array de DrawCardEvents
    let events = createDrawCardEventsForTest(playerData, 1);
    // Ajout d'un GainMana event
    events.push({
      eventType: "GainMana",
      mana: 3,
      playerId: playerData.playerId
    });

    return {
      eventType: "PlayerStartTurn",
      playerId: playerData.playerId,
      events: events
    }
  }

  const createFakeEndMatchEvent = (playerData:PlayerData) => {
    return {
      eventType: "EndMatch",
      winningPlayerId: playerData.playerId
    }
  }

  return {
    createFakeMatchData,
    createFakeStartMatchEvent,
    createFakePlayerEndTurnEvent,
    createFakeEndMatchEvent
  }
}
