import "@babel/polyfill";
import Game from "./game.js";


window.onload = () => {

    let myGame = new Game();
    myGame.init();

    document.onkeydown = e =>{
        const key = e.keyCode;
        let newDirection;

        switch(key){
            case 32:
                myGame.launch();
                return; 
            case 37:
                newDirection = "left";
                break; 
            case 38:
                newDirection = "up";
                break; 
            case 39:
                newDirection = "right";
                break;         
            case 40:
                newDirection = "down";
                break; 
            default:
                return;
        }

        console.log("newDirection : " + newDirection);
        myGame.snaky.setDirection(newDirection);

    }


}