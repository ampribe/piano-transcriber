import React, { Component } from 'react';
import ABCJS from 'abcjs';

class NotationDisplay extends Component {
  componentDidMount() {
    ABCJS.renderAbc("paper", );
  }

  render() {
    return (
      <div>
        <div id="paper" />
      </div>
    );
  }
}

export default NotationDisplay;
