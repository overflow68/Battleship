import { boardFactory } from "./gameboard";
import {shipFactory} from './battleships';

let board = document.getElementById("cont");
let playerBoard = document.createElement("div");
playerBoard.setAttribute("id","playerBoard");
playerBoard.classList.add("board");
board.appendChild(playerBoard);

let cpuBoard = document.createElement("div");
cpuBoard.setAttribute("id","cpuBoard");
cpuBoard.classList.add("board");
board.appendChild(cpuBoard);




const game = ()=>{
let squaress = ["",""];
let currentShip;
let boardList = [];
let shipList = [];
let usedSquaresCPU = [];
let sinkedPlayer;
let sinkedCPU;


    initializeGameBoard("cpu",cpuBoard,0);
    initializeGameBoard("player",playerBoard,1);
     
    
   
    
   
   

    squaress[0].forEach(square =>{
        square.addEventListener("click",function (e){
            if(square.textContent == "" && !square.classList.contains("red")){
                playRound(square)}
                
            sinkedCPU = checkSunken(shipList,0);
            sinkedPlayer = checkSunken(shipList,1);

            if (sinkedCPU == true && sinkedPlayer !=true){
                alert("Player Wins!")
            }else if (sinkedCPU !=false && sinkedPlayer == true){
                alert("CPU wins!")
            }

        });
        
          

           
           
    })
    function populateGrid(squares,board){
        squares.forEach(square=>{
            if (board.usedSquares.includes(parseInt(square.id)) && square.classList.contains("player")){
                square.classList.remove("dodgerblue")
                square.classList.add("blue");
            }
           
        })}
     
     function initializeGameBoard(name,parent,position){
        let newBoard = boardFactory(name);
        newBoard.createShips();
        newBoard.createBoard(parent);
        boardList.push(newBoard);
        shipList.push(newBoard.playerShips);
     
        let squarez = document.querySelectorAll("."+name);
        squaress[position] = squarez;
        
    
        
        
        populateGrid(squaress[position],newBoard);
     
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
    
     function play(boardList,position,square){
         if(sinkedPlayer == undefined && sinkedCPU == undefined){
               if (boardList[position].usedSquares.includes(parseInt(square.id))){
                square.classList.remove("dodgerblue");
                square.classList.add("red");
                currentShip = findClickedShip(shipList,position,parseInt(square.id));
                if (!currentShip.hitSquares.includes(parseInt(square.id))){
                    currentShip.hitSquares.push(parseInt(square.id))}
                
                checkIfSunken(currentShip,position);
                
               
               }else{
                   square.textContent = ".";
               }
               }
        }
    
    function checkIfSunken(ship,position){
        if (ship.hitSquares.length == ship.length+1){
            ship.sunken = true;
        }
        if (ship.sunken){
           sinkShip(ship,position);
            }
            
        }
    
        function sinkShip(ship,position){
            squaress[position].forEach(square=>{
                if (ship.shipCoordinates.includes(parseInt(square.id))){
                    square.textContent = "X";
                }
                
                
            })
             }
    
    function cpuPlay(){
        let realRandNum;
    do{ realRandNum = Math.floor(Math.random() * 100)} while (usedSquaresCPU.includes(realRandNum))
        
    
        play(boardList,1,squaress[1][realRandNum]);
        usedSquaresCPU.push(realRandNum);
    }

    function playRound(square){
        play(boardList,0,square);
        cpuPlay();
    }
    return {usedSquaresCPU}
};

function checkSunken(shipList,position){
    let sunkenShipCounter = 0;
    shipList[position].forEach(ship=>{
        if (ship.sunken == true){
            sunkenShipCounter ++;
        }
        
    })
if (sunkenShipCounter == 5){
            return true;
        }
}

export{game}