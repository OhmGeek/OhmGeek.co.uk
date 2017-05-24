import React, { Component } from 'react';
import GrommetApp from 'grommet/components/App';
import MainPage from './Components/MainPage.js'

import '../node_modules/grommet-css'


class App extends Component {
  render() {
    return (
      <GrommetApp centered={false}>
        <MainPage/>
      </GrommetApp>
    );
  }
}

export default App;
