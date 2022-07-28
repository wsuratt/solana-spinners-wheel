import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Snackbar,
  makeStyles,
  Button,
  Box,
  Typography,
} from '@material-ui/core';

const Maintenance = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Typography className={classes.title}>Solana Spinners</Typography>
      <Typography className={classes.text2}>currently under maintenance... will be back up soon...</Typography>
    </main>
  )
};
const useStyles = makeStyles({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  game: {
    color: "white",
    marginTop: "25px",
    fontSize: "50px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Verdana",
  },
  main: {
    textAlign: "center",
    background: "black",
  },
  text: {
    color: "white",
    fontSize: "25px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Verdana",
  },
  text2: {
    color: "white",
    marginTop: "25px",
    fontSize: "15px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Verdana",
  },
  title: {
    color: "#EDB257",
    display: "inline",
    marginTop: "25px",
    fontSize: "25px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Verdana",
  },
  title2: {
    color: "white",
    display: "inline",
    marginTop: "25px",
    fontSize: "25px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Verdana",
  },
}, { index: 1 });
export default Maintenance;
