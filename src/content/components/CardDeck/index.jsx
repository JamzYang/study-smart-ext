import React from 'react';
import './CardDeck.styl';

const CardDeck = ({ onClose }) => {
  return (
    <div className="study-smart-card-deck-sidebar">
      <div className="sidebar-header">
        <h2>闪卡库</h2>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="sidebar-content">
        <p>这里是闪卡库内容。</p>
        <p>（UI将在此处实现）</p>
      </div>
    </div>
  );
};

export default CardDeck; 