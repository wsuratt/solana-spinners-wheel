import React from 'react';
import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core' ;
import './App.css';
import Crate1 from './components/crates/crate1';
import Crate2 from './components/crates/crate2';
import Crate3 from './components/crates/crate3';
import Wheel from './components/wheel';
import Spinner1 from './components/spin/spinner1';
import Spinner2 from './components/spin/spinner2';
import Spinner3 from './components/spin/spinner3';
import ButtonAppBar from './components/ButtonAppBar';
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import placeholderArt from './assets/placeholderArt.jpg';
import MobilePage from './MobilePage';
import useWindowSize from 'react-use/lib/useWindowSize';
import Button from '@mui/material/Button';
import Confetti from 'react-confetti';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './homestyles.css';

const Home = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSpinner1, setShowSpinner1] = useState(false);
  const [showSpinner2, setShowSpinner2] = useState(false);
  const [showSpinner3, setShowSpinner3] = useState(false);

  const places = [
    'SMB', 'Okay', 'Solana', 'SMB', 'Okay', 'Solana',
    'SMB', 'Okay', 'Solana', 'SMB', 'Okay', 'Solana'
  ]
  const { width, height } = useWindowSize()

  const OnWin = () => {
    setShowConfetti(true);
  }

  return(
    <div>
      <ButtonAppBar/>
      <div className='mobilePage'>
        <MobilePage/>
      </div>
      <div>
        <div>
          {showSpinner1 ? (
            <Spinner1 />
          ) : (
            <Crate1/>
          )}
          <div className="content">
            <Typography variant="h1">
              CRATE 1
            </Typography>
            {/* <div className='wallet-button'>
              <WalletMultiButton />
            </div> */}
            <Button 
              color="success"
              variant="contained"
              endIcon={<LockOpenIcon />}
              onClick={() => setShowSpinner1(true)}
            >
              Unlock
            </Button>
          </div>
        </div>
        <div>
          {showSpinner2 ? (
            <Spinner2 />
          ) : (
            <Crate2/>
          )}
          <div className="content">
            <Typography variant="h1">
              CRATE 2
            </Typography>
            <br />
            {/* <div className='wallet-button'>
              <WalletMultiButton />
            </div> */}
            <Button 
              color="success"
              variant="contained"
              endIcon={<LockOpenIcon />}
              onClick={() => setShowSpinner2(true)}
            >
              Unlock
            </Button>
          </div>
        </div>
        <div>
          {showSpinner3 ? (
            <Spinner3 />
          ) : (
            <Crate3/>
          )}
          <div className="content">
            <Typography variant="h1">
              CRATE 3
            </Typography>
            <br />
            {/* <div className='wallet-button'>
              <WalletMultiButton />
            </div> */}
            <Button 
              color="success"
              variant="contained"
              endIcon={<LockOpenIcon />}
              onClick={() => setShowSpinner3(true)}
            >
              Unlock
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;
