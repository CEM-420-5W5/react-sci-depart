import { OwnedCard } from "@/lib/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFistRaised, faShieldAlt } from "@fortawesome/free-solid-svg-icons";

export function SCICardStats(props: { health: number, attack: number }) {
    const borderColor = '#94a3b8';

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '8px 12px',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                borderTop: `2px solid ${borderColor}`,
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
            }}
        >
            {(
                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Attaque */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #dc2626',
                        }}
                    >
                        <FontAwesomeIcon icon={faFistRaised} style={{ fontSize: '1.5em', color: '#ef4444' }} />
                        <span style={{ color: '#fecaca', fontSize: '1.2em', fontWeight: 'bold' }}>
                            {props.attack}
                        </span>
                    </div>

                    {/* Santé */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #16a34a',
                        }}
                    >
                        <FontAwesomeIcon icon={faShieldAlt} style={{ fontSize: '1.5em', color: '#22c55e' }} />
                        <span style={{ color: '#86efac', fontSize: '1.2em', fontWeight: 'bold' }}>
                            {props.health}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}