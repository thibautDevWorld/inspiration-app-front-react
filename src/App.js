import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Watchlist from './pages/Watchlist'
import Add from './components/Add'
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';


 
function App() {
  const { user } = useAuthContext()

  return (

    
    <div className="App">
        <Router>
          
          <Navbar />

          <Routes>
           <Route exact path="/" element={user ? <Watchlist /> : <Navigate to="/login" /> } />
           <Route path="/add" element={ user ? <Add /> : <Navigate to="/login" /> } />
           <Route path='/login' element={ !user ? <Login /> : <Navigate to="/" /> } />
           <Route path='/signup' element={ !user ? <Signup /> : <Navigate to="/" />  } />
          </Routes>

        </Router>
    </div>

  );
}

export default App;
