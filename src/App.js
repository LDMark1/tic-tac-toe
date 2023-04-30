import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicTacToe from './Components/game/game';
import Navbar from './Components/navbar/navbar';
import Home from './Components/Home/home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<><Home/></>}/>
                <Route path="/TicTacToe" element={<><Navbar/><TicTacToe/></>}/>
            </Routes>
        </Router>
    );
}

export default App;
