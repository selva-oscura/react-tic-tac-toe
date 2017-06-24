import React, { Component } from 'react';
import './App.css';
import Message from './Message';
import Scores from './Scores';
import Board from './Board';
import ErrorMessage from './ErrorMessage';

class App extends Component{
  constructor(props){
    super(props);
    let ticTacToeData = localStorage.ticTacToeData;
    if(ticTacToeData){
      ticTacToeData = JSON.parse(ticTacToeData);
      ticTacToeData.errorMessage = undefined;
    }else{    
      ticTacToeData = {
        scores: {      
          userWins: 0,
          computerWins: 0,
          ties: 0,
        },
        userIcon: undefined,
        playerTurn: undefined,
        board: [0,0,0,0,0,0,0,0,0],
        messageShorthand: "XorO",
        errorMessage: undefined,
      }
      localStorage.ticTacToeData = JSON.stringify(ticTacToeData);
    }
    this.state = ticTacToeData;
    this.playAgain = this.playAgain.bind(this);
    this.updateUserIcon = this.updateUserIcon.bind(this);
    this.userPick = this.userPick.bind(this);

  }
  winningSolutions(){
    return [
      // rows
      [0,1,2],
      [3,4,5],
      [6,7,8],
      // columns
      [0,3,6],
      [1,4,7],
      [2,5,8],
      // diagonals
      [0,4,8],
      [2,4,6]
    ];
  }
  playAgain(){
    let state = this.state;
    state.userIcon = undefined;
    state.playerTurn = undefined;
    state.board = [0,0,0,0,0,0,0,0,0];
    state.messageShorthand = "XorO";
    state.errorMessage = undefined;
    localStorage.ticTacToeData = JSON.stringify(state);
    this.setState(state);
  }
  concludeGame(winner){
    let state = this.state;
    if(winner==="user"){
      state.scores.userWins += 1;
      state.messageShorthand = "userWin";
    }else if(winner==="comp"){
      state.scores.computerWins += 1;
      state.messageShorthand = "compWin";
    }else{
      state.scores.ties += 1;
      state.messageShorthand = "tie";
    }
    state.playerTurn = undefined;
    localStorage.ticTacToeData = JSON.stringify(state);
    this.setState(state);
  }
  checkGameWon(){
    const winningSolutions = this.winningSolutions();
    const board = this.state.board;
    // check for computer or user win
    let winner = false;
    for(let i = 0; i<winningSolutions.length; i++){
      let sum = 0;
      let possibleSolution = winningSolutions[i];
      for(let j=0; j<possibleSolution.length; j++){
        sum += board[possibleSolution[j]];
      }
      // check for user win
      if(sum === 3){
        winner = "user";
        break;  
      // check for computer win
      }else if(sum === -3){
        winner = "comp";
        break;
      }
    }
    if(!winner && board.indexOf(0)===-1){
      winner = "tie";
    }
    return winner;
  }
  checkPotentialWin(){
    const winningSolutions = this.winningSolutions();
    const board = this.state.board;
    // check for player potential win
    let targetSquares = {
      squareToWin: null,
      squareToBlock: null,
    }
    for (let i = 0; i<winningSolutions.length; i++){
      let sum = 0; 
      let emptySquare;
      let possibleSolution = winningSolutions[i];
      for(let j = 0; j<possibleSolution.length; j++){
        sum += board[possibleSolution[j]];
        if(board[possibleSolution[j]]===0){
          emptySquare = possibleSolution[j];
        }
      }
      if(sum === -2){
        targetSquares.squareToWin = emptySquare;
      }
      if(sum === 2){
        targetSquares.squareToBlock = emptySquare;
      }
    }
    return targetSquares;
  }
  getSideSquare(){
    let sideSquares = [1, 3, 5, 7];
    const board = this.state.board;
    let rand = Math.floor(Math.random()*8);
    if(rand%2===0){
      sideSquares = sideSquares.reverse();
    }
    sideSquares = sideSquares.slice(rand%4).concat(sideSquares.slice(0, rand%4));
    for(let i = 0; i<sideSquares.length; i++){
      if(board[sideSquares[i]]===0){
        return sideSquares[i];
      }
    }
    return null;
  }
  getCornerSquare(){
    let cornerSquares = [0, 2, 6, 8];
    let rand = Math.floor(Math.random()*8);
    if(rand%2===0){
      cornerSquares = cornerSquares.reverse();
    }
    cornerSquares = cornerSquares.slice(rand%4).concat(cornerSquares.slice(0, rand%4));
    const board = this.state.board;
    for(let i =0; i<cornerSquares.length; i++){
      if(board[cornerSquares[i]]===0){
        return cornerSquares[i];
      }
    }
    return null;
  }
  updateUserIcon(icon){
    let {errorMessage, userIcon, playerTurn, messageShorthand} = this.state;
    errorMessage = undefined;
    if(icon === "X"){
      userIcon = "X";
      playerTurn = "userTurn";
      messageShorthand = "userTurn";
      this.setState({errorMessage, userIcon, playerTurn, messageShorthand});
      localStorage.ticTacToeData = JSON.stringify(this.state);
    }
    if(icon === "O"){
      userIcon = "O";
      playerTurn = "compTurn";
      messageShorthand = "compTurn";
      this.setState({errorMessage, userIcon, playerTurn, messageShorthand});
      localStorage.ticTacToeData = JSON.stringify(this.state);
      this.computerPick();
    }
  }
  userPick(i){
    let {errorMessage, messageShorthand, board, userIcon, playerTurn} = this.state;
    if(userIcon===undefined){
      errorMessage = "Please select X or O first.";
    }else if(messageShorthand==="userWin"){
      errorMessage = "Game Already Over. (You won!)";
    }else if(messageShorthand === "compWin"){
      errorMessage = "Game Already Over. (Computer won.)";
    }else if(messageShorthand==="tie"){
      errorMessage = "Game Over. (It was a tie.)";
    }else if(playerTurn==="compTurn"){
      errorMessage = "It is the computer's turn. Please wait.";
    }else if(board[i]!==0){
      errorMessage = "That square already is taken!";
    }else{
      board[i]=1;
    }
    this.setState({errorMessage, board});
    localStorage.ticTacToeData = JSON.stringify(this.state);
    if(!errorMessage){
      let winner = this.checkGameWon();
      if(winner){
        this.concludeGame(winner);
      }else{
        playerTurn = "compTurn";
        messageShorthand = "compTurn";
        errorMessage = undefined;
        this.setState({playerTurn, messageShorthand, errorMessage});
        localStorage.ticTacToeData = JSON.stringify(this.state);
        this.computerPick();
      }
    }
  }
  computerPick(){
    let {board, playerTurn, messageShorthand} = this.state;
    let targetSquare;
    let targetSquares = this.checkPotentialWin();
    // check for square needed for immediate Win
    if(targetSquares.squareToWin!==null){
      targetSquare = targetSquares.squareToWin;
    // check for square needed to preven immediate loss
    }else if(targetSquares.squareToBlock!==null){
      targetSquare = targetSquares.squareToBlock;
    // pick center square if not already picked
    }else if(board[4]===0){
      targetSquare = 4;
    // prevent opposite corners picked by opponent with adjacent corner as next pick leading to automatic win by opponent
    }else if((board[0]===1 && board[8]===1) || (board[2]===1 && board[6]===1)){
      targetSquare = this.getSideSquare();
      if(targetSquare === null){
        targetSquare = this.getCornerSquare();
      }
    }else{
      // pick corner if available
      targetSquare = this.getCornerSquare();
      if(targetSquare===null){
        // else pick side
        targetSquare = this.getSideSquare();
      }
    }
    const timeout = Math.random()*500+250;
    setTimeout(() => {
      board[targetSquare] = -1;
      this.setState({board});
      localStorage.ticTacToeData = JSON.stringify(this.state);
      let winner = this.checkGameWon();
      if(winner){
        this.concludeGame(winner);
      }else{
        playerTurn = "userTurn";
        messageShorthand = "userTurn";
        this.setState({board, playerTurn, messageShorthand});
        localStorage.ticTacToeData = JSON.stringify(this.state);
      }
    }, timeout);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tic-Tac-Toe</h2>
        </div>
        <Scores
          scores={this.state.scores}
        />
        <Message 
          messageShorthand={this.state.messageShorthand}
          updateUserIcon={this.updateUserIcon}
          playAgain={this.playAgain}
        />
        <Board 
          board={this.state.board} 
          userIcon={this.state.userIcon}
          userPick={this.userPick} 
        />
        <ErrorMessage 
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }
};

export default App;