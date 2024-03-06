import { CardSlot } from "./CardSlot"

export const PlayerHand = ({ playerCards }) => {
    const images = require.context('./assets', true);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <CardSlot>
                    {playerCards[0] && <img src={images(`./${playerCards[0].image}.png`)} alt="card" style={{ width: '100%' }} />}
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
                            return <img key={index} alt="card" src={images(`./${card.image}.png`)} style={{ width: '100%', position: 'absolute', top: '0', left: `${offsetCard}` }} />
                        })}
                    </div>
                </CardSlot>
            </div>
        </div>
    )
}