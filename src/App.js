import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import SinglePokemonPage from './pages/singlePokemonPage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path=":name" element={<SinglePokemonPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
