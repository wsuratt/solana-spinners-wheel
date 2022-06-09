import React from 'react';

import './crate2.css';

export default class Crate extends React.Component {

  render() {
    return (
      <div class="cubeWrapper2">
        <div class="tnt2 front crate2"></div>
        <div class="tnt2 back crate2"></div>
        <div class="tnt2 right crate2"></div>
        <div class="tnt2 left crate2"></div>
        <div class="tnt2 top crate2"></div>
        <div class="tnt2 bottom crate2"></div>
      </div>
    );
  }
}
