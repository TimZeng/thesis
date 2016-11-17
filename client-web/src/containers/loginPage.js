import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginTempUser, enterRoom, leaveRoom, toggleReady } from '../actions/index';
import axios from 'axios';

var name;

export class LoginPage extends Component {
  changeValue(event) {
    name = event.target.value
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.loginTempUser(name);
  }

  enterRoom(room, user) {
    if (room !== this.props.userInfo.room) {
      this.props.enterRoom(room, user, this.props.userInfo.inRoom, this.props.userInfo.room);
    }
  }

  leaveRoom() {
    if(this.props.userInfo.inRoom) {
      this.props.leaveRoom(this.props.userInfo.room, this.props.userInfo.username);
    }
  }

  toggleReady() {
    this.props.toggleReady(this.props.userInfo.room, this.props.userInfo.username);
  }

  componentDidUpdate() {
    if(this.props.allReady) {
      this.props.redirect('gamePlay');
    }
  }

  render() {
    return (
        <div>
          {
            !this.props.userInfo.status ? 
            <div className="row">
            <h2> Welcome</h2>
                <form>
                  <input
                    value={ name }
                    placeholder='enter username'
                    onChange={ this.changeValue.bind(this) } 
                    />
                  <button 
                    className="btn waves-effect waves-light" 
                    type="submit" 
                    name="action"
                    onClick={this.onFormSubmit.bind(this)}
                  > Play as a Guest
                    <i className="material-icons right">send</i>
                   </button>
                </form>
            </div> :

            <div>
              <div className="row">
                <h4>User Info</h4>
                <p>Username: {this.props.userInfo.username}</p>
                <p>TempId:   {this.props.userInfo.tempUniqUserId}</p>
              </div>

              <div>
                <h4>RoomList</h4>
                <table>
                  <tr><th>RoomName</th><th>PlayerCount</th></tr>
                {
                  this.props.roomList.map((room) => 
                    <tr onClick={this.enterRoom.bind(this, room.roomName, this.props.userInfo.username)}><td>{room.roomName}</td><td>{room.numberOfPlayer}</td></tr>
                  )
                }
                </table>
              </div>

              {
                !this.props.userInfo.inRoom ? null : 
                <div>
                  <text>{this.props.userInfo.username} am in {this.props.userInfo.room}</text>
                  <button onClick={this.toggleReady.bind(this)}>{this.props.userInfo.isReady ? 'I need more time!' : 'I am Ready!'}</button>
                  <button onClick={this.leaveRoom.bind(this)}>Exit This Room</button>
                </div>
              }
            </div>
          }
      </div>
    );
  }
};

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    roomList: state.roomList,
    allReady: state.allReady
  };
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginTempUser: loginTempUser,
    enterRoom: enterRoom,
    leaveRoom: leaveRoom,
    toggleReady: toggleReady
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);