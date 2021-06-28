import { boardFactory } from "./gameboard";
import {shipFactory} from './battleships';

let board = document.getElementById("gameBoardContainer");
let playerBoard = document.createElement("div");
playerBoard.setAttribute("id","playerBoard");
playerBoard.classList.add("board");
board.appendChild(playerBoard);

let cpuBoard = document.createElement("div");
cpuBoard.setAttribute("id","cpuBoard");
cpuBoard.classList.add("board");
board.appendChild(cpuBoard);



let squares;
let currentShip;
let boardList = [];
let shipList = [];
const game = ()=>{
    
    initializeGameBoard("cpu",playerBoard);
    
   
   

    squares.forEach(square =>{
        square.addEventListener("click",()=>{
           play(boardList,0,square.id,square);
           
    })})
    
    return {squares}
};

function populateGrid(squares,board){
    squares.forEach(square=>{
        if (board.usedSquares.includes(parseInt(square.id))){
            square.classList.add("blue");/* style.background = "#6666ff" */
        }
       
    })}
 
 function initializeGameBoard(name,parent){
    let newBoard = boardFactory(name);
    newBoard.createShips();
    newBoard.createBoard(parent);
    boardList.push(newBoard);
    shipList.push(newBoard.playerShips);
 
    let squarez = document.querySelectorAll("."+name);
    squares = squarez;

    
    
    populateGrid(squares,newBoard);
 
 }


 function findClickedShip(shipList,position,squareID){
     let wantedShip;
   shipList[position].forEach(ship=>{
       if (ship.shipCoordinates.includes(squareID)){
           wantedShip = ship;
       }
   })
   return wantedShip;
 }

 function play(boardList,position,squareID,square){
           if (boardList[position].usedSquares.includes(parseInt(squareID))){
            square.classList.add("red");
            currentShip = findClickedShip(shipList,0,parseInt(square.id));
            currentShip.hitSquares.push(parseInt(square.id))
            checkIfSunken(currentShip,squares);
            console.log(currentShip.hitSquares.length)
            console.log(currentShip.shipCoordinates.length)
            console.log(currentShip);
           }else{
               square.textContent = ".";
           }
           
    }

function checkIfSunken(ship,squares){
    if (ship.hitSquares.length == ship.length+1){
        ship.sunken = true;
    }
    if (ship.sunken){
       sinkShip(ship,squares);
        }
    }

    function sinkShip(ship,squares){
        squares.forEach(square=>{
            if (ship.shipCoordinates.includes(parseInt(square.id))){
                square.textContent = "X";
            }
        
            
        })
         }
export{game,initializeGameBoard,play}