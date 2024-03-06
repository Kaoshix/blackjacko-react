import { CardSlot } from "./CardSlot"

export const DealerHand = ({ dealerCards }) => {

    const images = require.context('./assets', true);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <CardSlot>
                    {dealerCards[0] &&

                        <div className="flip-card animation-card-dealer">
                            <div className="flip-card-inner animation-card-dealer">
                                <div className="flip-card-front">
                                    <img src={images(`./${dealerCards[0].image}.png`)} alt="card" style={{ width: '100px', height: '150px' }} />
                                </div>

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
                        width: '100%',
                        height: '100%'

                    }}>
                        {dealerCards.length === 1 ? (

                            <div style={{ width: '100%', height: '100%' }} className="animation-second-card-dealer">
                                <img src={images(`./back-card.png`)} alt="card" style={{ width: '100%', height: '100%' }} />
                            </div>

                        ) : dealerCards.map((card, index) => {
                            if (index === 0) return null;
                            let offsetCard = 0;
                            if (index !== 1) {
                                offsetCard = `${(index - 1) * 30}px`;
                            }
                            return (
                                <div key={index} className={`flip-card ${index > 1 ? 'animation-card-dealer' : 'animation-rotate-second-dealer-card'}`} style={{ width: '100%', position: 'absolute', top: '0', left: `${offsetCard}` }}>
                                    <div className={`flip-card-inner ${index > 1 ? 'animation-card-dealer' : 'animation-rotate-second-dealer-card'}`}>
                                        <div className="flip-card-front">
                                            <img alt="card" src={images(`./${card.image}.png`)} className="second-dealer-card" style={{ width: '100px', height: '150px' }} />
                                        </div>

                                        <div className="flip-card-back">
                                            <img src={images(`./back-card.png`)} alt="card" style={{ width: '100px', height: '150px' }} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </CardSlot>
            </div>
        </div>
    )
}