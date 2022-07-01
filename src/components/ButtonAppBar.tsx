import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png'
import "@fontsource/sora";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "white" }}>
        <Toolbar>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black", fontFamily: "Sora", fontSize: "2em", fontWeight: "bold" }}>
            Solana Spinners
          </Typography>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
          <img src={logo} alt="logo"/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
