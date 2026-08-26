import { useState } from 'react';
import './App.css';

const notebookSteps = [
  { title: 'Imagine a Notebook', text: 'Everyone in the group has an identical copy of the same notebook.' },
  { title: 'Someone Writes an Entry', text: 'Ram paid Rahul 500 rupees. Everyone adds this to their own copy at the same time.' },
  { title: 'The Page Gets Sealed', text: 'Once written, that page cannot be erased or edited, only new pages can be added.' },
  { title: 'Everyone Agrees', text: 'Before it is accepted, most copies must match. If someone tries to cheat, their copy will not match the rest.' },
  { title: 'Pages Link Together', text: 'Each new page references the one before it, creating an unbreakable chain of history.' },
];

const concepts = [
  { icon: '🌐', term: 'Decentralization', def: 'No single owner, run by thousands of computers.' },
  { icon: '📜', term: 'Smart Contracts', def: 'Code that runs itself when conditions are met.' },
  { icon: '🎨', term: 'NFTs', def: 'Unique tokens proving ownership of digital items.' },
  { icon: '💰', term: 'DeFi', def: 'Banking without banks, powered by code.' },
];

const webEras = {
  Web1: 'Read-only. Static pages, no interaction.',
  Web2: 'Read-write. Apps and social media, but they own your data.',
  Web3: 'Read-write-own. You own your data and assets.',
};

const quiz = [
  { q: 'Is Web3 controlled by one company?', options: ['Yes', 'No'], answer: 'No' },
  { q: 'What proves ownership of a digital item?', options: ['NFT', 'Cookie'], answer: 'NFT' },
  { q: 'What runs automatically on-chain?', options: ['Smart Contract', 'Email'], answer: 'Smart Contract' },
];

function App() {
  const [activeEra, setActiveEra] = useState('Web3');
  const [flipped, setFlipped] = useState(null);
  const [step, setStep] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleQuizAnswer(option) {
    const correct = quiz[quizIndex].answer === option;
    setFeedback(correct ? 'correct' : 'wrong');
    setTimeout(function () {
      setFeedback(null);
      setQuizIndex(function (prev) {
        return (prev + 1) % quiz.length;
      });
    }, 1000);
  }

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }

  return (
    <div className="app">
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>

      <nav className="navbar">
        <div className="logo">Chainova</div>
        <button className="menu-toggle" onClick={function () { setMenuOpen(!menuOpen); }}>
          ☰
        </button>
        <div className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <button onClick={function () { scrollTo('blockchain'); }}>Blockchain</button>
          <button onClick={function () { scrollTo('eras'); }}>Web Eras</button>
          <button onClick={function () { scrollTo('concepts'); }}>Concepts</button>
          <button onClick={function () { scrollTo('quiz'); }}>Quiz</button>
        </div>
      </nav>

      <header className="hero">
        <h1>What is Web3?</h1>
        <p>The internet, owned by you, not Big Tech.</p>
        <button className="cta" onClick={function () { scrollTo('blockchain'); }}>
          Explore
        </button>
      </header>

      <section id="blockchain" className="blockchain-demo">
        <h2>What is a Blockchain?</h2>
        <p className="subtext">Think of it like a notebook everyone shares.</p>

        <div className="notebook-card">
          <h3>{notebookSteps[step].title}</h3>
          <p>{notebookSteps[step].text}</p>
        </div>

        <div className="step-dots">
          {notebookSteps.map(function (item, i) {
            return (
              <span
                key={i}
                className={i === step ? 'dot active' : 'dot'}
                onClick={function () { setStep(i); }}
              ></span>
            );
          })}
        </div>

        <div className="step-buttons">
          <button disabled={step === 0} onClick={function () { setStep(step - 1); }}>
            Back
          </button>
          <button
            disabled={step === notebookSteps.length - 1}
            onClick={function () { setStep(step + 1); }}
          >
            Next
          </button>
        </div>
      </section>

      <section id="eras" className="era-tabs">
        <h2>Web1 → Web2 → Web3</h2>
        <div className="tabs">
          {Object.keys(webEras).map(function (era) {
            return (
              <button
                key={era}
                className={activeEra === era ? 'tab active' : 'tab'}
                onClick={function () { setActiveEra(era); }}
              >
                {era}
              </button>
            );
          })}
        </div>
        <p className="era-text">{webEras[activeEra]}</p>
      </section>

      <section id="concepts" className="concepts">
        <h2>Key Concepts</h2>
        <div className="card-grid">
          {concepts.map(function (c, i) {
            return (
              <div
                key={i}
                className={flipped === i ? 'card flipped' : 'card'}
                onClick={function () { setFlipped(flipped === i ? null : i); }}
              >
                {flipped === i ? (
                  c.def
                ) : (
                  <div>
                    <div className="card-icon">{c.icon}</div>
                    <div>{c.term}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section id="quiz" className="quiz">
        <h2>Quick Quiz</h2>
        <p>{quiz[quizIndex].q}</p>
        <div className="quiz-options">
          {quiz[quizIndex].options.map(function (opt) {
            return (
              <button key={opt} onClick={function () { handleQuizAnswer(opt); }}>
                {opt}
              </button>
            );
          })}
        </div>
        {feedback ? (
          <p className={feedback === 'correct' ? 'feedback correct' : 'feedback wrong'}>
            {feedback === 'correct' ? 'Correct!' : 'Try again'}
          </p>
        ) : null}
      </section>

      <footer className="footer">
        <p>Chainova, Web3 and Blockchain
by Avika</p>
      </footer>
    </div>
  );
}

export default App;
