import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './_app';
import reportWebVitals from './reportWebVitals';

export default function Home() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  reportWebVitals();
}

// if (typeof document !== 'undefined') {
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(<Home />);
// }
reportWebVitals();