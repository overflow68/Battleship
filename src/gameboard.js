import { shipFactory } from "./battleships";
import { checkHorizontalRow } from "./utility";
let board = ["", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", "",
                "", "", "", "", "", "", "", "", "", ""];

const boardFactory = (player)=>{
   let playerShips = [];
   let missedAttacks = [];
   let usedSquares = [];

   

    function createShips(){
       let shipLengths = [4,3,2,2,1];
       let shipHolder;

       shipLengths.forEach(shipLength=>{
          do{let newShip = shipFactory(shipLength,Math.floor(Math.random() * 100));
            shipHolder = newShip;
          }while(checkValidSquares(shipHolder) !=true)
          playerShips.push(shipHolder);
          usedSquares.push.apply(usedSquares,shipHolder.shipCoordinates);
          
       })
       
    }

function checkValidSquares(newShip){
  let hasNegatives = newShip.shipCoordinates.some(coordinate => coordinate < 0);

   var commonElements = usedSquares.filter(function(e) {
      return newShip.shipCoordinates.indexOf(e) > -1;
    });
    if (commonElements.length == 0 && hasNegatives == false && checkHorizontalRow(newShip)){
   
       return true
       
    }else{
       return false
       
    }
   }
function createBoard(container){
   
   let i=0;
   board.forEach(item =>{
      let square = document.createElement("div");
      square.setAttribute("id",i.toLocaleString('en-US',{minimumIntegerDigits: 2,useGrouping: false})); 
      i++;
      square.classList.add("square");
      square.classList.add("dodgerblue");
      square.classList.add(player);
      container.appendChild(square);
      });
}


    return {createShips,playerShips,checkValidSquares,usedSquares,createBoard}
    };

    export {boardFactory}

