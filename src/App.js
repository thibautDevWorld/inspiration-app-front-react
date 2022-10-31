import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Watchlist from './pages/Watchlist'
import Add from './components/Add'
import Navbar from './components/Navbar';


 
function App() {
  return (

    
    <div className="App">
        <Router>
          <Navbar />

          <Routes>
           <Route exact path="/" element={<Watchlist />} />
           <Route path="/add" element={<Add />} />
          </Routes>

        </Router>
    </div>

  );
}

export default App;
