import React, { Component } from 'react';

export default class Link extends Component {
  render() {
    return (
      <div className="Link">
        <a href={this.props.URL}>
          <img src={this.props.image} className="App-logo" alt="logo" />
          <h2>{this.props.name}</h2>
        </a>
      </div>
    );
  }
}
