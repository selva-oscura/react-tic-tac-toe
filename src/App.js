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
    console.log('userPick', i)
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
      </div>
    );
  }
});

export default App;
