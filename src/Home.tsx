import React from 'react';
import { Typography } from '@material-ui/core' 
import './App.css';
import Wheel from './components/wheel';
import ButtonAppBar from './components/ButtonAppBar';
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import placeholderArt from './assets/placeholderArt.jpg';
import MobilePage from './MobilePage';
import './homestyles.css';

const Home = () => {
  const places = [
    'Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas',
    'Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas'
  ]
  return(
    <div>
      <div className='mobilePage'>
        <MobilePage/>
      </div>
      <div className='placeholder'>
        <ButtonAppBar/>
        <div className="content">
          <Typography variant="h1">
            NFT WHEEL
          </Typography>
          <div className='wallet-button'>
            <WalletMultiButton />
          </div>
          <Typography variant="h6">
            CLICK TO SPIN
          </Typography>
          <img src={placeholderArt} alt="placeholderArt"/>
        </div>
        <Wheel items={places} />
      </div>
    </div>
  )
}
export default Home;
