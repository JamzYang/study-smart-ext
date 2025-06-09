import React from 'react';
import './Toolbar.styl';

const Toolbar = ({ position, selectedText }) => {
  if (!selectedText) {
    return null;
  }

  return (
    <div className="study-smart-toolbar" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      <button>Generate Flashcards</button>
      <button>Explain Concept</button>
      <button>Translate</button>
      <button>...</button>
    </div>
  );
};

export default Toolbar; 