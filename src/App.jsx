import { useState, useEffect } from 'react';
import './App.css';

const concepts = [
  { icon: '🌐', term: 'Decentralization', def: 'No single owner — run by thousands of computers.' },
  { icon: '📜', term: 'Smart Contracts', def: 'Code that runs itself when conditions are met.' },
  { icon: '🎨', term: 'NFTs', def: 'Unique tokens proving ownership of digital items.' },
  { icon: '💰', term: 'DeFi', def: 'Banking without banks — powered by code.' },
];

const webEras = {
  Web1: 'Read-only. Static pages, no interaction.',
  Web2: 'Read-write. Apps & social media — but they own your data.',
  Web3: 'Read-write-own. You own your data and assets.',
};

const blocks = [
  { id: 1, data: 'Genesis Block', hash: '0xA1B2', prev: '0000' },
  { id: 2, data: 'Alice → Bob: 5 coins', hash: '0xC3D4', prev: '0xA1B2' },
  { id: 3, data: 'Bob → Charlie: 2 coins', hash: '0xE5F6', prev: '0xC3D4' },
];

const quiz = [
  { q: 'Is Web3 controlled by one company?', options: ['Yes', 'No'], answer: 'No' },
  { q: 'What proves ownership of a digital item?', options: ['NFT', 'Cookie'], answer: 'NFT' },
  { q: 'What runs automatically on-chain?', options: ['Smart Contract', 'Email'], answer: 'Smart Contract' },
];

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / target), 10);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function App() {
  const [activeEra, setActiveEra] = useState('Web3');
  const [flipped, setFlipped] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const members = useCountUp(120);
  const events = useCountUp(15);
  const projects = useCountUp(8);

  function handleQuizAnswer(option) {
    const correct = quiz[quizIndex].answer === option;
    setFeedback(correct ? 'correct' : 'wrong');
    setTimeout(() => {
      setFeedback(null);
      setQuizIndex((prev) => (prev + 1) % quiz.length);
    }, 1000);
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }

  return (
    <div className="app">
      <div className="glow glow-1" />
      <div className="glow glow-2" />

      <nav className="navbar">
        <div className="logo">⛓ Chainova</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollTo('blockchain')}>Blockchain</button>
          <button onClick={() => scrollTo('eras')}>Web Eras</button>
          <button onClick={() => scrollTo('concepts')}>Concepts</button>
          <button onClick={() => scrollTo('quiz')}>Quiz</button>
        </div>
      </nav>

      <header className="hero">
        <h1>What is Web3?</h1>
        <p>The internet — owned by you, not Big Tech.</p>
        <button className="cta" onClick={() => scrollTo('blockchain')}>Explore ↓</button>
      </header>

      <section className="stats">
        <div className="stat"><span>{members}+</span>Members</div>
        <div className="stat"><span>{events}</span>Events</div>
        <div className="stat"><span>{projects}</span>Projects</div>
      </section>

      <section id="blockchain" className="blockchain-demo">
        <h2>🔗 Blockchain 101</h2>
        <p className="subtext">Tap a block to peek inside.</p>
        <div className="chain">
          {blocks.map((block) => (
            <div key={block.id} className="block-wrapper">
              <div
                className={`block ${selectedBlock === block.id ? 'active' : ''}`}
                onClick={() => setSelectedBlock(selectedBlock === block.id ? null : block.id)}
              >
                #{block.id}
              </div>
              {block.id < blocks.length && <div className="link">→</div>}
            </div>
          ))}
        </div>
        {selectedBlock && (
          <div className="block-details">
            <p><strong>Data:</strong> {blocks[selectedBlock - 1].data}</p>
            <p><strong>Hash:</strong> {blocks[selectedBlock - 1].hash}</p>
            <p><strong>Prev:</strong> {blocks[selectedBlock - 1].prev}</p>
          </div>
        )}
      </section>

      <section id="eras" className="era-tabs">
        <h2>🕸 Web1 → Web2 → Web3</h2>
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

      <section id="concepts" className="concepts">
        <h2>🧩 Key Concepts</h2>
        <div className="card-grid">
          {concepts.map((c, i) => (
            <div
              key={i}
              className={`card ${flipped === i ? 'flipped' : ''}`}
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              {flipped === i ? c.def : (
                <>
                  <div className="card-icon">{c.icon}</div>
                  {c.term}
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="quiz" className="quiz">
        <h2>🧠 Quick Quiz</h2>
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
            {feedback === 'correct' ? '✅ Nice!' : '❌ Try again'}
          </p>
        )}
      </section>

      <footer className="footer">
        <p>⛓by Avika </p>
      </footer>
    </div>
  );
}

export default App;
