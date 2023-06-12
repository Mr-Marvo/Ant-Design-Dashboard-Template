import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContentProvider } from './providers/ContentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContentProvider>
    <App />
  </ContentProvider>
);