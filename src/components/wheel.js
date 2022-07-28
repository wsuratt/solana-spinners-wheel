import React from 'react';
import {
  spin
} from "../utils";

import './wheel.css';
import {
  images,
  prizeArtHashmap,
  prizeNameHashmap
} from './prizeMaps.js'

const prizeMint = "-1"

const imageHashmap = new Map([
  ["prize1", images[Math.floor(Math.random() * images.length)]],
  ["prize2", images[Math.floor(Math.random() * images.length)]],
  ["prize3", images[Math.floor(Math.random() * images.length)]],
  ["prize4", images[Math.floor(Math.random() * images.length)]],
  ["prize5", images[Math.floor(Math.random() * images.length)]],
  ["prize7", images[Math.floor(Math.random() * images.length)]],
  ["prize8", images[Math.floor(Math.random() * images.length)]],
  ["prize9", images[Math.floor(Math.random() * images.length)]],
  ["prize10", images[Math.floor(Math.random() * images.length)]],
  ["prize11", images[Math.floor(Math.random() * images.length)]],
  ["prize12", images[Math.floor(Math.random() * images.length)]]
])

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      prizeImage: images[0],
      canSpin: true,
    };
    this.selectItem = this.selectItem.bind(this);
    this.showConfetti = this.showConfetti.bind(this);
    this.OnClick = this.OnClick.bind(this);
  }

  selectItem() {
    const prizeMint = await spin(this.props.ID)
    if (prizeMint != "-1") {
      const prizeImage = prizeArtHashmap.get(prizeMint);
      if (this.state.selectedItem === null) {
        const selectedItem = 5;
        if (this.props.onSelectItem) {
          this.props.onSelectItem(selectedItem);
        }
        this.setState({ selectedItem, prizeImage });
      } else {
        this.setState({ selectedItem: null, prizeImage: images[0] });
        setTimeout(this.selectItem, 500);
      }
    }
  }

  showConfetti() {
    setTimeout( () => {
      this.props.onWin(prizeNameHashmap.get(prizeMint).toUpperCase())
  }, 4000);
  }

  OnClick() {
    if (this.state.canSpin) {
      this.selectItem();
      this.showConfetti();
      this.setState({ canSpin: false });
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
        return <img src={imageHashmap.get(wheelItem)} alt="solanaArt" className='wheel-image'/>;
      }
    }

    return (
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.OnClick}>
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
