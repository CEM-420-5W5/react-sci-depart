import { OwnedCard } from "@/lib/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFistRaised, faShieldAlt } from "@fortawesome/free-solid-svg-icons";

export function SCICardHeader(props: { name: string, cost: number }) {
    const borderColor = '#94a3b8';

    return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px 6px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderBottom: `2px solid ${borderColor}`,
                    zIndex: 2,
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        color: '#e0f2fe',
                        fontSize: '0.95em',
                        fontWeight: 'bold',
                        flex: 1,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                    }}
                >
                    {props.name}
                </h3>

                {/* Coût en mana */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '50%',
                        border: '2px solid #1e40af',
                        fontSize: '1.1em',
                        fontWeight: 'bold',
                        color: '#fff',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                        boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.3)',
                        marginLeft: '8px',
                    }}
                >
                    {props.cost}
                </div>
            </div>
    );
}