import CoinTable from './Components/CoinTable/CoinTable'
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Banner from './Components/Banner/Banner';

function App(){
  const [currency,setCurrency]=useState('usd');
  return (<>
      <Navbar setCurrency={setCurrency}/>
      <Banner/>
      <CoinTable currency={currency}/>
    </>
    )
  
  }

export default App;
