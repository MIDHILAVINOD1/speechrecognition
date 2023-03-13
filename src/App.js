import './App.css';
import Home from './Component/Home' 
import Castingcalldescription from './Component/castingcall_description';
import Crewdescription from './Component/crew_description';
import Dictaphone from './Component/speech';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
    
      <Routes>
        <Route exact path="/"  element={<Home/>} />
        <Route exact path="/castingcall"  element={<Castingcalldescription/>} />
        <Route exact path="/crew" element={<Crewdescription/>} />
        <Route exact path="/speech" element={<Dictaphone/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
