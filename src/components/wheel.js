import React from 'react';
import smbArt from '../assets/smb.png'
import okayArt from '../assets/okay-bears.png'
import solanaArt from '../assets/solana-logo.png'
import {
  spin
} from "../utils";

import './wheel.css';

const images = [smbArt, okayArt, solanaArt];

const prizeHashmap = new Map([
  ["A9tNwrcznAaNRN99Uz86J6vgcLQJMBRpdcpL6dDmirV1", smbArt]
])

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      prizeImage: solanaArt,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    spin(this.props.ID)
    const prizeImage = prizeHashmap.get("A9tNwrcznAaNRN99Uz86J6vgcLQJMBRpdcpL6dDmirV1");
    if (this.state.selectedItem === null) {
      const selectedItem = 5;
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem, prizeImage });
    } else {
      this.setState({ selectedItem: null, prizeImage: solanaArt });
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { prizeImage } = this.state;
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    function ShowImage(props) {
      const wheelItem = props.wheelItem;

      if (wheelItem === 'prize6') {
        return <img src={prizeImage} alt="solanaArt" className='wheel-image'/>;
      }
      else {
        return <img src={images[Math.floor(Math.random() * images.length)]} alt="solanaArt" className='wheel-image'/>;
      }
    }

    return (
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
          {items.map((item, index) => (
            <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
              <ShowImage wheelItem={item}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
