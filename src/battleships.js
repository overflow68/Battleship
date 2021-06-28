const shipFactory = (length,startSquare)=>{
    let trueFalse = [false,true];
    let shipCoordinates = [];
    let hitSquares = [];
    let horizontal = trueFalse[Math.floor(Math.random() * 2)];
    let sunken = false;

    function hit(number){
        if (shipCoordinates.includes(number)){
            hitSquares.push(number)
        }
    }

    function generateSquares(){
        let currentPosition = startSquare;

        if (horizontal == false){
             for(let i = 0;i<=length;i++){
                 shipCoordinates.push(currentPosition);
                 currentPosition = currentPosition -10;

        }
        }else{
            for(let i = 0;i<=length;i++){
                shipCoordinates.push(currentPosition);
                currentPosition = currentPosition -1;


        }
       

    }}
    generateSquares();



    return {length,startSquare,horizontal,hitSquares,sunken,shipCoordinates,hit,generateSquares}
    };

    export {shipFactory};