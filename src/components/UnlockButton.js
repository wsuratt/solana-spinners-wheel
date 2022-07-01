import React,{useState} from 'react'
import styled from 'styled-components'
import Typography from '@mui/material/Typography';



const Btn = styled.button`
display: inline-block;
background-color: black;
color: white;
outline: none;
border: none;
margin-top: 100px;

font-size: ${props => props.theme.fontsm};
padding: 0.9rem 2.3rem;
border-radius: 50px;
cursor: pointer;
transition: all 0.2s ease;
position: relative;
&:hover{
    transform: scale(0.9);
}

&::after{
    content: ' ';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    border: 2px solid gray;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: all 0.2s ease;
}

&:hover::after{
    transform: translate(-50%, -50%) scale(1);
    padding: 0.3rem;
}
`

const UnlockButton = ({text, onClick}) => {
  return (
<a aria-label={text} rel="noreferrer" onClick={onClick}>
<Btn>
<Typography variant="h1" sx={{ fontFamily: "Sora", fontWeight: "bold" }}>
  {text}
</Typography>
</Btn>
</a>
    
  )
}

export default UnlockButton
