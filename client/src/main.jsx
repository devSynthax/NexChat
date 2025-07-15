import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import Header from './common/header.jsx';
import Footer from './common/footer.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
      <App />
    <Footer />
  </BrowserRouter>
)
