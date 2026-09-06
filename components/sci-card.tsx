import { SCICardHeader } from "./sci-card-header";
import { SCICardStats } from "./sci-card-stats";

export function SCICard(props: { name: string, imageUrl:string, health: number, attack: number, cost: number, show?: "front" | "back" }, className?: string) {

    const borderColor = '#94a3b8';
    const percentageOfHeight = props.show === "back" ? "100%" : "82%" ;

    const renderCardImage = () => {
        const imageUrl = props.show === "back" ? "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg" : props.imageUrl;
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                    height: percentageOfHeight,
                }}
            />
        );
    }

    const renderCardContent = () => {
        if(props.show === "back"){
            return renderCardImage();
        }

        return (<div>
                {renderCardImage()}
                <SCICardHeader name={props.name} cost={props.cost} />
                <SCICardStats health={props.health} attack={props.attack} />
            </div>);
    }

    return (
        <div
            style={{
                position: 'relative',
                width: '182px',
                height: '210px',
                borderRadius: '12px',
                border: `3px solid ${borderColor}`,
                overflow: 'hidden',
                boxShadow: `0 0 20px ${borderColor}80, inset 0 0 15px ${borderColor}40`,
                backgroundColor: '#1a1a2e',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
               if(props.show === "back")
                    return;
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${borderColor}, inset 0 0 20px ${borderColor}60`;
            }}
            onMouseLeave={(e) => {
                if(props.show === "back")
                    return;
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${borderColor}80, inset 0 0 15px ${borderColor}40`;
            }}
        >
            {/* Fond d'image */}
            
            {renderCardContent()}
            
        </div>
    );
}