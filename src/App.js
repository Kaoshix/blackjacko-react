import './App.css';
import { PlayerHand } from './PlayerHand';
import { DealerHand } from './DealerHand';
import { Cards } from './Cards';
import { useEffect, useState } from 'react';

function App() {

  // State
  const [totalDealerScore, setTotalDealerScore] = useState(0);
  const [totalPlayerScore, setTotalPlayerScore] = useState(0);

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  const [isBetVisible, setIsBetVisible] = useState(true);

  const [message, setMessage] = useState('');

  const [playerBank, setPlayerBank] = useState(100);
  const [actualBet, setActualBet] = useState(0);

  const [isPlayingButtonsVisible, setIsPlayingButtonsVisible] = useState(false);
  const [isDesablingPlayingButtons, setIsDesablingPlayingButtons] = useState(true);
  const [isPlayingAgainButtonVisible, setIsPlayingAgainButtonVisible] = useState(false);

  const [isDealerTurn, setIsDealerTurn] = useState(false);

  // Variables
  const bets = [5, 10, 20, 50];

  // Shuffle cards on load
  const shuffleCards = () => {
    Cards.sort(function (a, b) {
      return 0.5 - Math.random();
    });
  }

  // Deal the first cards to the player and the dealer
  const firstCardDeal = () => {
    setDealerCards([...dealerCards, Cards.splice(0, 1)[0]]);
    setPlayerCards([...playerCards, Cards.splice(0, 1)[0], Cards.splice(0, 1)[0]]);
  }

  // Draw a card for the player and calculate the total score
  const drawPlayerCard = () => {
    let card = Cards.splice(0, 1)[0];
    setPlayerCards([...playerCards, card]);

    setTimeout(() => {
      if (card.val === 'Ace' && totalPlayerScore <= 10) {
        setTotalPlayerScore(totalPlayerScore + card.pointBis);
        return;
      }

      setTotalPlayerScore(totalPlayerScore + card.point);
    }, 1500)
  }

  // Calculate the total score of the player and the dealer on the first deal
  useEffect(() => {
    if (playerCards.length === 0) return;

    setTimeout(() => {
      if (dealerCards.length === 1) {
        if (dealerCards[0].val === 'Ace') {
          setTotalDealerScore(11);
        }

        if (dealerCards[0].val !== 'Ace') {
          setTotalDealerScore(dealerCards[0].point);
        }
      }
    }, 1000)

    setTimeout(() => {
      if (playerCards.length === 2) {
        if (playerCards[0].val === 'Ace') {
          setTotalPlayerScore(playerCards[0].pointBis + playerCards[1].point);
        }

        if (playerCards[1].val === 'Ace') {
          setTotalPlayerScore(playerCards[0].point + playerCards[1].pointBis);
        }

        if (playerCards[0].val === 'Ace' && playerCards[1].val === 'Ace') {
          setTotalPlayerScore(12);
        }

        if (playerCards[0].val !== 'Ace' && playerCards[1].val !== 'Ace') {
          setTotalPlayerScore(playerCards[0].point + playerCards[1].point);
        }
      }
    }, 2050)

  }, [playerCards, totalPlayerScore, dealerCards])

  // Check if the player has a blackjack on the first deal
  useEffect(() => {
    if (playerCards.length === 0) return;
    if ((playerCards[0].val === 'Ace' || playerCards[1].val === 'Ace') && totalPlayerScore === 21 && playerCards.length === 2) {
      setMessage('Blackjack !');
      setPlayerBank(pbank => pbank + (actualBet * 3));
      setIsPlayingButtonsVisible(false);
      setIsDesablingPlayingButtons(true);
      setIsPlayingAgainButtonVisible(true);
    }
  }, [playerCards, totalPlayerScore, actualBet])

  // Check if the player is busted
  useEffect(() => {
    if (totalPlayerScore > 21) {
      setMessage('Busted !');
      setIsPlayingButtonsVisible(false);
      setIsDesablingPlayingButtons(true);
      setIsPlayingAgainButtonVisible(true);
    }
  }, [totalPlayerScore])

  // Draw cards for the dealer while the total score is less than 17
  useEffect(() => {
    if (isDealerTurn) {

      setTimeout(() => {
        if (totalDealerScore < 17) {

          const drawDealerCard = () => {

            let card = Cards.splice(0, 1)[0];
            setDealerCards([...dealerCards, card]);

            if (card.val === 'Ace' && totalDealerScore < 11) {
              setTotalDealerScore(totalDealerScore + card.pointBis);
              return;
            }
            setTotalDealerScore(totalDealerScore + card.point);
          }
          drawDealerCard();
        }

        if (totalDealerScore >= 17) {
          setIsDealerTurn(false);

          if (totalDealerScore > 21) {
            setMessage('Dealer busted !');
            setPlayerBank(pbank => pbank + (actualBet * 2));
            setIsPlayingAgainButtonVisible(true);
          }

          if (totalDealerScore <= 21) {
            if (totalDealerScore > totalPlayerScore) {
              setMessage('Dealer wins !');
              setIsPlayingAgainButtonVisible(true);
            }

            if (totalDealerScore === totalPlayerScore) {
              setMessage('It\'s a tie !');
              setPlayerBank(pbank => pbank + actualBet);
              setIsPlayingAgainButtonVisible(true);
            }

            if (totalDealerScore < totalPlayerScore) {
              setMessage('Player wins !');
              setPlayerBank(pbank => pbank + (actualBet * 2));
              setIsPlayingAgainButtonVisible(true);
            }
          }
        }
      }, 1000)

    }
  }, [isDealerTurn, totalDealerScore, dealerCards, actualBet, totalPlayerScore])

  return (
    <>
      {/* Bet choice modal */}
      <div
        style={{
          display: `${isBetVisible ? 'flex' : 'none'}`,
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 100
        }}
      >
        {bets.map((bet, index) => {
          return <button key={index} onClick={() => {

            if (playerBank - bet < 0) {
              alert('You don\'t have enough money');
              return;
            }
            setIsBetVisible(false);
            setPlayerBank(playerBank - bet);
            setActualBet(bet);
            shuffleCards(Cards);
            firstCardDeal();

            setTimeout(() => {
              setIsPlayingButtonsVisible(true);
              setIsDesablingPlayingButtons(false);
            }, 2050)
          }}>{bet}$</button>
        }
        )}
      </div>


      <div
        className='App'
        style={{
          opacity: `${isBetVisible ? '0.8' : ''}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>

        {/* Dealer hand */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px'
          }}
        >
          <DealerHand dealerCards={dealerCards} />
          <p style={{ textAlign: 'center' }}>{totalDealerScore}</p>
        </div>
        {/* Player hand */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          textAlign: 'center',
        }}>
          {/* Buttons */}
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
            <button
              onClick={() => {
                drawPlayerCard();
              }}
              style={{
                opacity: `${isPlayingButtonsVisible ? '1' : '0'}`,
              }}
              disabled={isDesablingPlayingButtons}
            >
              draw card
            </button>
            <button
              style={{
                opacity: `${isPlayingButtonsVisible ? '1' : '0'}`,
              }}
              disabled={isDesablingPlayingButtons}
              onClick={() => {
                setIsPlayingButtonsVisible(false);
                setIsDesablingPlayingButtons(true);
                setIsDealerTurn(true);
              }}
            >
              End turn
            </button>
          </div>

          {/* Player Score */}
          <div>
            {totalPlayerScore}
          </div>

          {/* Player cards */}
          <PlayerHand playerCards={playerCards} />

          {/* Player bank and actual bet */}
          <div style={{
            position: 'absolute',
            bottom: 250,
            left: 30,
          }}>
            <div>Player Bank: {playerBank} $</div>
            <div>Actual bet: {actualBet} $</div>
          </div>
        </div>



        {/* Message and play again button */}
        <div style={{
          position: 'absolute',
          bottom: '50%',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}>
          <p>{message}</p>
          <div>
            <button
              style={{
                opacity: `${isPlayingAgainButtonVisible ? '1' : '0'}`,
              }}
              disabled={!isPlayingAgainButtonVisible}
              onClick={() => {
                setPlayerCards([]);
                setDealerCards([]);
                setTotalPlayerScore(0);
                setTotalDealerScore(0);
                setIsBetVisible(true);
                setIsPlayingAgainButtonVisible(false);
                setMessage('');
                setActualBet(0);
              }}
            >
              Play again
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
