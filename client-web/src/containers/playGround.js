import React, { Component } from 'react';
import { connect } from 'react-redux';

import { movePlayer, openSpace, dropFlag, createNewPlayer } from '../actions/index';
import { bindActionCreators } from 'redux';
import Player from '../components/player';

const playerId = Date.now().toString(36);

class PlayGround extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('playerGround username =>', this.props)
    this.props.createNewPlayer(this.props.username);
  }

  keyDown(e) {
    if ( e.key.slice(0, 5) === 'Arrow'  ) {
      this.props.movePlayer(playerId, e.key, this.props.playerLocation, this.props.board);
    }

    if ( e.key === ' ' ) {
      this.props.openSpace(playerId, this.props.playerLocation[playerId]);
    }

    if ( e.key === 'f' || e.key === 'F') {
      this.props.dropFlag(playerId, this.props.playerLocation[playerId]);
    }

  }

  renderPlayers() {
    var playersArr = Object.keys(this.props.playerLocation);

    return playersArr.map( (player) =>
      <Player key={player} playerLocation={this.props.playerLocation[player]} />
    );
  }

  render() {
    return (
      <div
        className='playGround'
        id='playGround'
        tabIndex='0'
        onKeyDown={ this.keyDown.bind(this) }>
          { this.renderPlayers() }
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    board: state.board,
    playerLocation: state.playerLocation
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    movePlayer: movePlayer,
    openSpace: openSpace,
    dropFlag: dropFlag,
    createNewPlayer: createNewPlayer
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);