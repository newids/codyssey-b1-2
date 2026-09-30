import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// index.html 의 <div id="root"> 안에 App 컴포넌트를 그린다.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('index.html 에 id가 root인 요소가 없습니다.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
