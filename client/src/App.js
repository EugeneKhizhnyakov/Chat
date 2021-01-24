import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router} from 'react-router-dom';
import {SignContext} from './context/SignContext';
import {useSign} from './hooks/sign.hook';

import {useRoutes} from './routes';

function App() {

    
  const {token,login,logout,userId,ready,userName} = useSign();
  const isSigned = !!token;
  const routes = useRoutes(isSigned);

  return (
    <SignContext.Provider value={{token,login,logout,userId,isSigned,userName}}>
      <Router>
        {routes}
      </Router>
    </SignContext.Provider>
  );
}

export default App;