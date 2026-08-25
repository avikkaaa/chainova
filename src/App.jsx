import { useState } from 'react';
import './App.css';

const concepts = [
  { term: 'Decentralization', def: 'No single company or person controls the network — it runs on thousands of computers worldwide.' },
  { term: 'Smart Contracts', def: 'Self-executing code on the blockchain that runs automatically when conditions are met.' },
  { term: 'NFTs', def: 'Unique digital tokens that prove ownership of a specific item, like art or collectibles.' },
  { term: 'DeFi', def: 'Decentralized Finance — banking services (loans, trading) without a bank, run by code instead.' },
];

const webEras = {
  Web1: 'Read-only. Static pages, no interaction — like an online brochure.',
  Web2: 'Read-write. Social media, apps — but companies own your data.',
  Web3: 'Read-write-own. Built on blockchain — users own their data and assets.',
};

const blocks = [
  { id: 1, data: 'Genesis Block', hash: '0xA1B2', prev: '0000' },
  { id: 2, data: 'Alice sends 5 coins to Bob', hash: '0xC3D4', prev: '0xA1B2' },
  { id: 3, data: 'Bob sends 2 coins to Charlie', hash: '0xE5F6', prev: '0xC3D4' },
];

const quiz = [
  { q: 'Is Web3 controlled by one company?', options: ['Yes', 'No'], answer: 'No' },
  { q: 'What proves ownership of a digital item?', options: ['NFT', 'Cookie'], answer: 'NFT' },
  { q: 'What runs automatically on the blockchain?', options: ['Smart Contract', 'Email'], answer: 'Smart Contract' },
];

function App() {
  const [activeEra, setActiveEra] = useState('Web3');
  const [flipped, setFlipped] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  function handleQuizAnswer(option) {
    const correct = quiz[quizIndex].answer === option;
    setFeedback(correct ? 'correct' : 'wrong');
    setTimeout(() => {
      setFeedback(null);
      setQuizIndex((prev) => (prev + 1) % quiz.length);
    }, 1000);
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>What is Web3?</h1>
        <p>An interactive intro to blockchain, decentralization, and the next internet.</p>
      </header>

      <section className="blockchain-demo">
        <h2>Blockchain 101</h2>
        <p>Click a block to see what's inside it.</p>
        <div className="chain">
          {blocks.map((block) => (
            <div key={block.id} className="block-wrapper">
              <div
                className={`block ${selectedBlock === block.id ? 'active' : ''}`}
                onClick={() => setSelectedBlock(selectedBlock === block.id ? null : block.id)}
              >
                Block {block.id}
              </div>
              {block.id < blocks.length && <div className="link">→</div>}
            </div>
          ))}
        </div>
        {selectedBlock && (
          <div className="block-details">
            <p><strong>Data:</strong> {blocks[selectedBlock - 1].data}</p>
            <p><strong>Hash:</strong> {blocks[selectedBlock - 1].hash}</p>
            <p><strong>Previous Hash:</strong> {blocks[selectedBlock - 1].prev}</p>
          </div>
        )}
      </section>

      <section className="era-tabs">
        <h2>Web1 vs Web2 vs Web3</h2>
        <div className="tabs">
          {Object.keys(webEras).map((era) => (
            <button
              key={era}
              className={activeEra === era ? 'tab active' : 'tab'}
              onClick={() => setActiveEra(era)}
            >
              {era}
            </button>
          ))}
        </div>
        <p className="era-text">{webEras[activeEra]}</p>
      </section>

      <section className="concepts">
        <h2>Key Concepts</h2>
        <div className="card-grid">
          {concepts.map((c, i) => (
            <div
              key={i}
              className={`card ${flipped === i ? 'flipped' : ''}`}
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              {flipped === i ? c.def : c.term}
            </div>
          ))}
        </div>
      </section>

      <section className="quiz">
        <h2>Quick Quiz</h2>
        <p>{quiz[quizIndex].q}</p>
        <div className="quiz-options">
          {quiz[quizIndex].options.map((opt) => (
            <button key={opt} onClick={() => handleQuizAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
        {feedback && (
          <p className={feedback === 'correct' ? 'feedback correct' : 'feedback wrong'}>
            {feedback === 'correct' ? '✅ Correct!' : '❌ Try again next time'}
          </p>
        )}
      </section>

      <footer className="footer">
        <p>Built by the Web3 & Blockchain Society</p>
      </footer>
    </div>
  );
}

export default App;