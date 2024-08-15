import { Outlet } from 'react-router-dom';
import './App.css';
import { NavBar,Footer, Aside } from './components';
import { useState } from 'react';
import { UserContext } from './UserContext';
function App() {
  const [Mode, setMode] = useState(true);
  // localStorage.clear()
  return (
    <div className="App">
      <UserContext.Provider value = {{Mode,setMode}}>
        <div className='d-flex'>
          <Aside/>
          <div className='main'>
            <NavBar/>
            <Outlet/>
          </div>
        </div>
        <Footer/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
