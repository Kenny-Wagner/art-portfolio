import ReactDOM from 'react-dom/client';
import "@mantine/core/styles.css"; // Do not remove
import '@mantine/carousel/styles.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
