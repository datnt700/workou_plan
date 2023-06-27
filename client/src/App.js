import { Routes, Route } from 'react-router-dom';
import Workout from './components/workout/index';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './components/home/index';
import Footer from './Layouts/Footer/index';
import Header from './Layouts/Header';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="workout" element={<Workout />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
