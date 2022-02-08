import React from 'react';
import { ReactComponent as Logo } from '../assets/logo-login.svg';
import './css/NotFound.css';

function NotFound() {
  return (
    <div className="page-not-found" data-testid="page-not-found">
      <Logo />
      <div className="not-found-container">
        <p className="ops">Ops!</p>
        <p className="not-found">A página que você está procurando não foi encontrada.</p>
      </div>
    </div>
  );
}

export default NotFound;
