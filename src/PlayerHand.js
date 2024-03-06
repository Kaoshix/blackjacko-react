import { CardSlot } from "./CardSlot"

export const PlayerHand = ({ playerCards }) => {
    const images = require.context('./assets', true);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <CardSlot>
                    {playerCards[0] &&
                        <div className="flip-card animation-card-player">
                            <div className="flip-card-inner animation-card-player">
                                <div className="flip-card-front">
                                    <img src={images(`./${playerCards[0].image}.png`)} alt="card" className="first-player-card" style={{ width: '100%' }} />                                </div>

                                <div className="flip-card-back">
                                    <img src={images(`./back-card.png`)} alt="card" style={{ width: '100px', height: '150px' }} />
                                </div>
                            </div>
                        </div>
                    }
                </CardSlot>

                <CardSlot>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        position: 'relative',

                    }}>
                        {playerCards.length > 0 && playerCards.map((card, index) => {
                            if (index === 0) return null;
                            let offsetCard = 0;
                            if (index !== 1) {
                                offsetCard = `${(index - 1) * 30}px`;
                            }
                            return (
                                <div key={index} className={`flip-card ${index === 1 ? 'animation-second-card-player' : 'animation-third-card-player'}`} style={{ width: '100%', position: 'absolute', top: '0', left: `${offsetCard}` }}>
                                    <div className={`flip-card-inner ${index === 1 ? 'animation-second-card-player' : 'animation-third-card-player'}`}>
                                        <div className="flip-card-front">
                                            <img key={index} alt="card" src={images(`./${card.image}.png`)} className="second-player-card" style={{ width: '100px', height: '150px' }} />
                                        </div>
                                        <div className="flip-card-back">
                                            <img src={images(`./back-card.png`)} alt="card" style={{ width: '100px', height: '150px' }} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardSlot>
            </div>
        </div>
    )
}