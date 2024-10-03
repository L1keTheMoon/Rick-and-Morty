import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './components/app/App';
import './style/style.scss';
// /Rick-and-Morty
createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/'>
    <App />
  </BrowserRouter>
);

