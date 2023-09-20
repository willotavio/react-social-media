import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Profile } from './pages/profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
