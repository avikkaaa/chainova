import { useState } from 'react';
import './App.css';

const notebookSteps = [
  { title: '📖 Imagine a Notebook', text: 'Everyone in the group has an identical copy of the same notebook.' },
  { title: '✍️ Someone Writes an Entry', text: '"Ram paid Rahul ₹500." Everyone adds this to their own copy at the same time.' },
  { title: '🔒 The Page Gets Sealed', text: "Once written, that page can't be erased or edited — only new pages can be added." },
  { title: '🤝 Everyone Agrees', text: "Before it's accepted, most copies must match. If someone tries to cheat, their copy won't match the rest." },
  { title: '⛓ Pages Link Together', text: 'Each new page references the one before it — creating an unbreakable chain of history.' },
];

const concepts = [
  { icon: '🌐', term: 'Decentralization', def: 'No single owner — run by thousands of computers.' },
  { icon: '📜', term: 'Smart Contracts', def: 'Code that runs itself when conditions are met.' },
  { icon: '🎨', term: 'NFTs', def: 'Unique tokens proving ownership of digital items.' },
  { icon: '💰', term: 'DeFi', def: 'Banking without banks — powered by code.' },
];

const webEras = {
  Web1: 'Read-only. Static pages, no interaction.',
  Web2: 'Read-write. Apps & social media — but they own your data.',
  Web3: 'R
