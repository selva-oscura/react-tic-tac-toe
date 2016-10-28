import React from 'react';
import './App.css';
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
      message: 0,
      errorMessage: undefined,
    }
  },
  updateScore(winner){
    if(winner==="user"){

    }else{

    }
  },
  updateUserIcon(icon){

  },
  userPick(i){
    // console.log('userPick', i)
    let state = this.state;
    if(state.board[i]!==0){
      state.errorMessage = "That square already taken!"
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
