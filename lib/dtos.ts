export interface RegisterDTO {
    userName?: string | null,
    email?: string | null,
    password?: string | null,
    passwordConfirm?: string | null,
}

export interface LoginDTO {
    userName?: string | null,
    password?: string | null,
}

export interface LoginSuccessDTO {
  token: string,
  playerId: number,
  playerName: string,
  playerMoney: number,
  playerElo: number
}
