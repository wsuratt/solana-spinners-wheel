import React from 'react';
import logo from './logo.svg';
import { Typography } from '@material-ui/core' 
import './App.css';
import Wheel from './components/wheel';
import ButtonAppBar from './components/ButtonAppBar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import placeholderArt from './assets/placeholderArt.jpg';
import MobilePage from './MobilePage'

function App() {
  const places = [
    'Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas',
    'Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas'
  ]

  return (
    <div className="App">
      <div className='mobilePage'>
        <MobilePage/>
      </div>
      <div className='placeholder'>
        <ButtonAppBar/>
        <div className="content">
          <Typography variant="h1">
            NFT WHEEL
          </Typography>
          <img src={placeholderArt} alt="placeholderArt"/>
        </div>
        <Wheel items={places} />
      </div>
    </div>
  );
}

export default App;
