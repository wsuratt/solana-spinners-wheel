import React from 'react';
import smbArt from '../assets/smb.png'
import okayArt from '../assets/okay-bears.png'
import solanaArt from '../assets/solana-logo.png'

import './wheel.css';

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    function ShowImage(props) {
      const wheelItem = props.wheelItem;
      console.log(wheelItem)
      if (wheelItem == 'SMB') {
        return <img src={smbArt} alt="smbArt" className='wheel-image'/>;
      }
      else if (wheelItem == 'Okay') {
        return <img src={okayArt} alt="okayArt" className='wheel-image'/>;
      }
      else {
        return <img src={solanaArt} alt="solanaArt" className='wheel-image'/>;
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
