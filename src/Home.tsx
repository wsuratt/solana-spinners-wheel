import React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  CircularProgress,
  makeStyles,
  Box,
  Snackbar
} from "@material-ui/core";
import './App.css';
import Crate from './components/crates/crate';
import Wheel from './components/wheel';
import Spinner from './components/spin/spinner';
import ButtonAppBar from './components/ButtonAppBar';
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import {Token, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {Transaction, PublicKey} from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import placeholderArt from './assets/placeholderArt.jpg';
import MobilePage from './MobilePage';
import useWindowSize from 'react-use/lib/useWindowSize';
import Button from '@mui/material/Button';
import Confetti from 'react-confetti';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './homestyles.css';
import UnlockButton from './components/UnlockButton'
import Gallery from './components/Gallery'
import NftGrid from "./NFTgrid";
import Alert from "@material-ui/lab/Alert";
import * as anchor from "@project-serum/anchor";
import { UserData, LoadImage } from "./LoadImage";
import styled from 'styled-components';
import {
  getKeyMints,
  getTokenWallet,
  BET_NFT_WALLET,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
} from "./unlock";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  createUser,
  getSpins,
  checkTX
} from "./utils";

export interface HomeProps {
  connection: anchor.web3.Connection;
}

const Home = (props: HomeProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showWon, setShowWon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [prizeName, setPrizeName] = useState("");
  const [mintImages, setMintImages] = useState<[]>();
  const [currentKeyMints, setCurrentKeyMints] = useState<UserData[]>();
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const classes = useStyles();

  const places = [
    'prize1', 'prize2', 'prize3', 'prize4', 'prize5', 'prize6',
    'prize7', 'prize8', 'prize9', 'prize10', 'prize11', 'prize12'
  ]
  const { width, height } = useWindowSize()
  const wallet = useAnchorWallet()
  const { sendTransaction } = useWallet();
  let transactionLoading = false;

  const onWin = (name: string) => {
    setShowConfetti(true);
    setShowWon(true);
    setPrizeName(name);
  }

  const checkSpins = async () => {
    if (!wallet)
        return;
    let hasSpins = await getSpins(wallet.publicKey.toString());
    setShowSpinner(hasSpins);
    if(transactionLoading) {
      transactionLoading = !hasSpins;
      setShowLoading(!hasSpins);
    }
  }

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const loadTransaction = async () => {
    transactionLoading = true;
    while (transactionLoading) {
      checkSpins()
      await sleep(3000);
    }
  }

  const loadAndSetImages = async () => {
    if (!wallet || !currentKeyMints) {
      return;
    }
    let myimageArr = await LoadImage(currentKeyMints, setIsLoading);

    if (!myimageArr || myimageArr.length === 0) {
      setAlertState({
        open: true,
        message: "You don't have valid keys",
        severity: "error",
      });
      setIsLoading(false);
      return;
    }
    //@ts-ignore
    setMintImages(myimageArr);
  };

  const onBet = async (mint: string) => {
    try {
      if (!wallet) {
        return;
      }

      let mintAddress = new anchor.web3.PublicKey(mint);
      // setIsMinting(true);

      let uri = "";
      currentKeyMints?.forEach((userdata) => {
        if (userdata.mint === mint) {
          uri = userdata.uri;
        }
      });

      let instructions = [];

      let fromTokenAccount = await Token.getAssociatedTokenAddress(
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
        TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
        mintAddress, // mint
        wallet.publicKey // owner
      );

      let toTokenAccount = await Token.getAssociatedTokenAddress(
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
        TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
        mintAddress, // mint
        BET_NFT_WALLET // owner
      );

      let toTokenAccountInfo = await props.connection.getAccountInfo(toTokenAccount);
      if (toTokenAccountInfo == null) {
        console.log('Create new account')
        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
            TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
            mintAddress, // mint
            toTokenAccount, // ata
            BET_NFT_WALLET, // owner of token account
            wallet.publicKey // fee payer
          ),
        )
      } else {
        console.log('Use existing account')
      }

      instructions.push(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          fromTokenAccount,
          toTokenAccount,
          wallet.publicKey,
          [],
          1,
        ),
      )
      const transaction = new Transaction();
      instructions.forEach(instruction => transaction.add(instruction));
    
      if(serverDown)
      {
        let message = "Transaction failed! Server is down.";

        setAlertState({
          open: true,
          message,
          severity: "error",
        });
      }
      else
      {
        const mintTxId = await sendTransaction(transaction, props.connection);

        await props.connection.confirmTransaction(mintTxId, 'processed');

        checkTX(wallet.publicKey, mintTxId, props.connection);

        setShowLoading(true);
        transactionLoading = true;
        //start timer
        loadTransaction();

        setAlertState({
          open: true,
          message:
            "Transaction initialized! Please wait for page to reload.",
          severity: "success",
        });
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Transaction failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to bet. Please fund your wallet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      // setIsMinting(false);
    }
  };

  useEffect(() => {
    loadAndSetImages();
  }, [currentKeyMints]);

  useEffect(() => {
    if (!wallet) {
      return;
    }
    createUser(wallet.publicKey.toString());
    checkSpins();
  }, [wallet, props.connection]);

  useEffect(() => {
    if (!wallet) {
      return;
    }
    try {
      getKeyMints(wallet).then((allMints: UserData[]) => {
        if (allMints.length === 0) {
          setAlertState({
            open: true,
            message: "You don't own any keys",
            severity: "error",
          });
          setIsLoading(false);
          return <div> You don't own any keys </div>;
        }
        setCurrentKeyMints(allMints);
      });
    } catch {
      setAlertState({
        open: true,
        message: "Error loading NFT's please refresh page",
        severity: "error",
      });
      return;
    }
  }, [wallet, props.connection]);

  return(
    <main>
      <ButtonAppBar/>
      <div className="mobilePage">
        <MobilePage/>
      </div>
      <div className="regular">
        { showConfetti ? (
          <Confetti />
        ) : 
          null
        }
        <div>
          {showLoading ? (
            <div className="loading">
              <CircularProgress/>
            </div>
          ) : showSpinner && wallet ? (
            <Wheel items={places} onWin={onWin} ID={wallet.publicKey.toString()}/>
          ) : (
            <Crate/>
          )}
          <div className="content">
            { !showSpinner ? (
              <div>
                <Typography variant="h3" sx={{ fontFamily: "Sora", fontWeight: "bold", color: "black" }}>
                  SELECT WALLET AND KEY
                </Typography>
              </div>
            ) : null }
            {showSpinner && !showWon ? (
              <div className="wheelCover">
                <Typography variant="h3" sx={{ fontFamily: "Sora", fontWeight: "bold", color: "black" }}>
                  CLICK WHEEL TO SPIN
                </Typography>
                <Typography variant="h1" sx={{ fontFamily: "Sora", fontWeight: "bold", color: "black", marginTop: "50px" }}>
                  PRIZES
                </Typography>
                <Gallery />
                <Typography variant="h6" sx={{ marginTop: "50px", fontFamily: "Sora", color: "black" }}>
                  These prizes are all available to be won from spinning the wheel.
                </Typography>
              </div>
            ) : showWon ? (
              <div className="wheelCover">
                <Typography variant="h3" sx={{ fontFamily: "Sora", fontWeight: "bold", color: "black" }}>
                  YOU WON {prizeName}!
                </Typography>
                <Typography variant="h6" sx={{ marginTop: "50px", fontFamily: "Sora", color: "black" }}>
                  Your prize should appear in your wallet within the next few minutes.
                </Typography>
                <Button sx={{
                          color: "white",
                          backgroundColor: "black",
                          marginTop: "50px",
                          height: "75px",
                          width: "200px",
                          fontSize: "30px",
                          "&:hover": {
                            backgroundColor: '#242424'
                          },
                        }} onClick={() => window.location.reload()}>
                  Home
                </Button>
              </div>
            ) : mintImages ? (
              <NftGrid
                props={mintImages}
                onBet={onBet}
              />
            ) : null }
            { !showSpinner ? (
              <div>
                <WalletMultiButton className={classes.connectButton}/>
              </div>
            ) : null }
          </div>
        </div>
      </div>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  )
}

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const useStyles = makeStyles({
  connectButton: {
    fontFamily: "Sora",
    fontWeight: "bold",
    display: "inline-block",
    backgroundColor: "black",
    color: "white",
    outline: "none",
    border: "none",
    fontSize: "20px",
    padding: "0.9rem 2.3rem",
    borderRadius: "50px",
    marginTop: "50px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
    "&:hover": {
      transform: "scale(0.9)"
    },
    "&:after": {
      content: "' '",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0)",
      border: "2px solid gray",
      width: "100%",
      height: "100%",
      borderRadius: "50px",
      transition: "all 0.2s ease"
    },
    "&:hover::after": {
      transform: "translate(-50%, -50%) scale(1)",
      padding: "0.3rem"
    },
  },
}, {index: 1});

export default Home;
