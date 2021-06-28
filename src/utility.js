function lastDigit(number){

return number % 10;
}
function checkHorizontalRow(newShip){
    let number = lastDigit(newShip.startSquare) - newShip.length-1;
    if (newShip.horizontal === true && number < 1){
        return false;
    }else{
        return true;
    }
}






export {lastDigit,checkHorizontalRow};


