import { SCIPlayableCard } from "@/components/sci-playable-card";
import { PlayableCard } from "@/lib/models";

export function MatchAdversaryHand(props : {cards : PlayableCard[] }) {
    return (
      <div style={{ display: 'flex', position: 'absolute', width: '100%', top: "-35%" }}>
        <div style={{ position: 'relative', display: 'flex', margin: 'auto', gap: "10px"}}>
          {props.cards.map(
              (pc) => <SCIPlayableCard key={pc.id} pc={pc} show="back"/>
          )}
        </div>
      </div>
    )
}