import { SCIPlayableCard } from "@/components/sci-playable-card";
import { PlayerData } from "@/lib/models";
import { MatchAdversaryHand } from "./match-adversary-hand";

export function MatchHalfBattlefield(props: { playerData : PlayerData | null, isAdversary: boolean }) {

    return (
        <div className='flex' style={{height: '45%'}}>
            {props.isAdversary ? <MatchAdversaryHand cards={props.playerData?.hand!} /> : null}
            {props.playerData?.battleField.map(
                (pc) => <SCIPlayableCard key={pc.id} pc={pc}/>
            )}
        </div>

    )
}