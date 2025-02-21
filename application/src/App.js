import logo from './logo.svg';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';

function App() {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#222" : "#fff";
    document.body.style.color = isDarkMode ? "#fff" : "#000";
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.style.backgroundColor = isDarkMode ? "white" : "#fff";
      input.style.input = isDarkMode ? "white" : "#000";
      input.style.border = isDarkMode ? "none" : "#000";
    });
  }, [isDarkMode]);

    return (
      <div className="app-container">
        <div className="main-content">
          <Dashboard />
        </div>
        <Footer />
      </div>
    );
}

export default App;
