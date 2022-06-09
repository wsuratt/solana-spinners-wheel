import React from 'react';

import './crate3.css';

export default class Crate extends React.Component {

  render() {
    return (
      <div class="cubeWrapper3">
        <div class="tnt3 front crate3"></div>
        <div class="tnt3 back crate3"></div>
        <div class="tnt3 right crate3"></div>
        <div class="tnt3 left crate3"></div>
        <div class="tnt3 top crate3"></div>
        <div class="tnt3 bottom crate3"></div>
      </div>
    );
  }
}
