import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import AddContactPage from './pages/AddContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-contact" element={<AddContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;