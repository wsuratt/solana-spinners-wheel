import React,{useState} from 'react'
import styled from 'styled-components'
import smbArt from '../assets/smb.png'
import okayArt from '../assets/okay-bears.png'
import solanaArt from '../assets/solana-logo.png'

import './gallery.css';


const Gallery = () => {
  return (
    <div>
      <img src={okayArt} alt="okayArt" className='prize'/>
      <img src={smbArt} alt="smbArt" className='prize'/>
      <img src={solanaArt} alt="solanaArt" className='prize'/>
    </div>
  )
}

export default Gallery
