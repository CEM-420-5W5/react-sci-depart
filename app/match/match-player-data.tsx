import { PlayerData } from "@/lib/models";
import { faGem, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MatchPlayerData(props: { playerData: PlayerData | null, position: "top" | "bottom" }) {
    const { playerData, position } = props;

    if (!playerData) {
        return null;
    }

    const isTop = position === "top";
    const healthPercentage = (playerData.health / playerData.maxHealth) * 100;
    const healthColor = healthPercentage > 50 ? '#22c55e' : healthPercentage > 25 ? '#eab308' : '#ef4444';

    return (
        <div
            style={{
                position: 'fixed',
                [isTop ? 'top' : 'bottom']: [isTop ? '50px' : '20px'],
                left: '20px',
                zIndex: 50,
                backgroundColor: 'rgba(20, 20, 30, 0.95)',
                border: '2px solid #7c3aed',
                borderRadius: '8px',
                padding: '12px 16px',
                width: '200px',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.6), inset 0 0 15px rgba(124, 58, 237, 0.2)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Nom du joueur */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <h3 style={{ margin: 0, color: '#60a5fa', fontSize: '1.1em', fontWeight: 'bold' }}>
                    {playerData.player.name}
                </h3>

                {/* Mana */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #3b82f6',
                    }}
                >
                    <FontAwesomeIcon icon={faGem} style={{ fontSize: '0.9em', color: '#ffffff' }} />
                    <span style={{ color: '#e0f2fe', fontSize: '0.9em', fontWeight: 'bold' }}>
                        {playerData.mana}
                    </span>
                </div>
            </div>

            {/* Barre de santé */}
            <div>
                {/* Barre de progression */}
                <div
                    style={{
                        width: '100%',
                        height: '24px',
                        backgroundColor: 'rgba(30, 30, 40, 0.8)',
                        border: '1px solid #7c3aed',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '6px',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: `${healthPercentage}%`,
                            backgroundColor: healthColor,
                            transition: 'width 0.3s ease-out',
                            boxShadow: `0 0 12px ${healthColor}, inset 0 0 8px rgba(255, 255, 255, 0.2)`,
                            position: 'absolute',
                            left: 0,
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            position: 'relative',
                            zIndex: 10,
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} style={{ fontSize: '0.85em', color: '#ffffff' }} />
                        <span style={{ color: '#e0f2fe', fontSize: '0.8em', fontWeight: 'bold' }}>
                            {playerData.health} / {playerData.maxHealth}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}