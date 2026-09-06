import { OwnedCard, PlayerData } from "@/lib/models";
import { MatchHalfBattlefield } from "./match-half-battlefield";

export function MatchBattlefield(props: { myPlayerData : PlayerData, adversaryPlayerData : PlayerData}) {
    
    return (
        <div className="board" style={{height: '100%', width: '80%', backgroundImage: "url('/images/nouveauBoard.png')", backgroundSize: 'cover'}}>
            <MatchHalfBattlefield playerData={props.adversaryPlayerData} isAdversary={true} />
            <MatchHalfBattlefield playerData={props.myPlayerData} isAdversary={false} />
        </div>
    )
}