import * as React from 'react';
import { Helmet } from "react-helmet";
import './styles.css';
import smbArt from '../../assets/smb.png'
import okayArt from '../../assets/okay-bears.png'
import solanaArt from '../../assets/solana-logo.png'

export default class Spinner2 extends React.Component  {
  render() {
    return (
      <div>
        <div className="container">
          <div className="spinner" id="spinnerContainer">
            <ul className="spinner-items" id="spinnerList">
              <li className="spinner-items__item" id="8">
                <img src={okayArt} alt="okayArt" className='item'/>
              </li>
              <li className="spinner-items__item" id="9">
                <img src={smbArt} alt="smbArt" className='item'/>
              </li>
              <li className="spinner-items__item" id="1">
                <img src={solanaArt} alt="solanaArt" className='item'/>
              </li>
              <li className="spinner-items__item" id="2">
                <img src={okayArt} alt="okayArt" className='item'/>
              </li>
              <li className="spinner-items__item" id="3">
                <img src={smbArt} alt="smbArt" className='item'/>
              </li>
              <li className="spinner-items__item" id="4">
                <img src={solanaArt} alt="solanaArt" className='item'/>
              </li>
              <li className="spinner-items__item" id="5">
                <img src={okayArt} alt="okayArt" className='item'/>
              </li>
              <li className="spinner-items__item" id="6">
                <img src={smbArt} alt="smbArt" className='item'/>
              </li>
              <li className="spinner-items__item" id="7">
                <img src={solanaArt} alt="solanaArt" className='item'/>
              </li>
            </ul>
            <div className="spinner__marker" id="spinnerMarker"> </div>
          </div>
          {/* <div className="spinner__won" id="spinnerWon"></div> */}
          <div className="button" id="startSpinner">Spin Wheel!</div>
          <Helmet>
            <script src="helper.js" type="text/javascript" />
          </Helmet>
        </div>
      </div>
    );
  }
}
