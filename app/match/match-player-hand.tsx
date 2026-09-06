import { SCIPlayableCard } from "@/components/sci-playable-card";
import { PlayableCard } from "@/lib/models";

export function MatchPlayerHand(props : {cards : PlayableCard[], onCardClick?: (playableCardId: number) => void}) {
    return (
        <div style={{ display: 'flex', position: 'absolute', width: '100%', top: "68%" }}>
          <div style={{ position: 'relative', display: 'flex', margin: 'auto', gap: "10px"}}>
            {props.cards.map(
                (pc) => <div key={pc.id} onClick={() => props.onCardClick?.(pc.id)} style={{ cursor: 'pointer' }}>
                        <SCIPlayableCard pc={pc}/>
                      </div>
            )}
          </div>
        </div>        
    )
}