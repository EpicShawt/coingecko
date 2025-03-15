
import { useContext, useState } from 'react';
import './App.css';
import { currencyContext } from './context/currencyContext';
import Home from './pages/home';

function App(){
  const [currency,setCurrency]=useState('usd');
  return (<>
    <currencyContext.Provider value={{currency,setCurrency}}>
<Home />
</currencyContext.Provider>
    </>
    )
  
  }

export default App;
