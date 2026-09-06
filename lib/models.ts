export interface Card {
    id: number;
    name: string;
    attack: number;
    health: number;
    cost: number;
    imageUrl: string;
}

export interface OwnedCard {
    id: number;
    card: Card;
}

export interface MatchData {
    match:Match;
    playerA: Player;
    playerB: Player;
    winningPlayerId:number;
}

export interface Match {
    id: number;
    isMatchCompleted: boolean;
    isPlayerATurn: boolean;
    playerDataA: PlayerData;
    playerDataB: PlayerData;
}

export interface PlayableCard {
    id: number;
    card: Card;
    health: number;
}

export interface PlayerData {
    id:number;
	health: number;
    maxHealth: number;
    mana: number;
    playerId: number;
    player: Player;
    cardsPile: PlayableCard[];
    battleField: PlayableCard[];
    hand: PlayableCard[];
    graveyard: PlayableCard[];
}

export interface Player {
    id:number;
	  name: string;
}

export interface OwnedCard {
  id: number,
  card: Card;
}

