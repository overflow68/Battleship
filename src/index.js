import style from './style.css';
import {game} from './game.js';



let playerBoard = document.getElementById("playerBoard");
let cpuBoard = document.getElementById("cpuBoard");
let restart = document.getElementById("restart");

let gameobject = game();
restart.addEventListener("click",()=>{
    playerBoard.innerHTML = '';
    cpuBoard.innerHTML = '';
    gameobject = game();
})


