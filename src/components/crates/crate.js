import React from 'react';

import './crate.css';

export default class Crate extends React.Component {

  render() {
    return (
      <div class="cubeWrapper">
        <div class="tnt front crate"></div>
        <div class="tnt back crate"></div>
        <div class="tnt right crate"></div>
        <div class="tnt left crate"></div>
        <div class="tnt top crate"></div>
        <div class="tnt bottom crate"></div>
      </div>
    );
  }
}
