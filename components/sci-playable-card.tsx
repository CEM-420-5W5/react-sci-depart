import { PlayableCard } from "@/lib/models";
import { SCICard } from "./sci-card";

export function SCIPlayableCard(props: { pc: PlayableCard, show?: "front" | "back" }) {
    return (
        <SCICard name={props.pc.card.name} imageUrl={props.pc.card.imageUrl} health={props.pc.health} attack={props.pc.card.attack} cost={props.pc.card.cost} show={props.show} />
    );
}