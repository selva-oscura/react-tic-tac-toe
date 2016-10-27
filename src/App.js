import React from 'react';
import './App.css';
import Board from './Board';

const App = React.createClass ({
  getInitialState(){
    return {
      userScore: 0,
      computerScore: 0,
      userIcon: undefined,
      board: [0,0,0,0,0,0,0,0,0]
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
    let state = this.state;
    state.board[i]=1;
    this.setState({ 
      state
    });
  },
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tic-Tac-Toe</h2>
        </div>
        <Board board={this.state.board} />
      </div>
    );
  }
});

export default App;
