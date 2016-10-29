import React from 'react';
import './App.css';
import Message from './Message';
import Board from './Board';
import ErrorMessage from './ErrorMessage';

const App = React.createClass ({
  getInitialState(){
    return {
      userScore: 0,
      computerScore: 0,
      userIcon: undefined,
      playerTurn: undefined,
      board: [0,0,0,0,0,0,0,0,0],
      messageShorthand: "XorO",
      errorMessage: undefined,
    }
  },
  updateScore(winner){
    if(winner==="user"){

    }else{

    }
  },
  updateUserIcon(icon){
    console.log('updating user icon to', icon);
    let state = this.state;
    if(icon === "X"){
      state.userIcon = "X";
    }
    if(icon === "O"){
      state.userIcon = "O";
    }
    this.setState(state);
  },
  userPick(i){
    // console.log('userPick', i)
    let state = this.state;
    if(state.board[i]!==0){
      state.errorMessage = "That square already taken!"
    }else if(state.userIcon===undefined){
      state.errorMessage = "Please select X or O first"
    }else{
      state.board[i]=1;
      state.errorMessage = undefined;
    }
    this.setState(state);
  },
  render() {
    console.log('this.state', this.state)
    console.log('this.props', this.props)
    console.log('this', this)
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tic-Tac-Toe</h2>
        </div>
        <Message 
          messageShorthand={this.state.messageShorthand}
          updateUserIcon={this.updateUserIcon}
        />
        <Board 
          board={this.state.board} 
          userPick={this.userPick} 
        />
        <ErrorMessage 
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }
});

export default App;
