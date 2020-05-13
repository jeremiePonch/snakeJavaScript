


import Snake from "./snake.js";
import Apple from "./apple.js";
import Drawing from "./drawing.js";

export default class Game {
    constructor(canvasWidth = 900, canvasHeight = 600){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.blockSize = 30;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.blockWidth = this.canvasWidth/this.blockSize;
        this.blockHeight = this.canvasHeight/this.blockSize;
        this.xCenter = this.canvasWidth/2;
        this.yCenter = this.canvasHeight/2;
    
        this.delay;
        this.snaky;
        this.apple;
        this.score;
        this.timeOut;
    }

    init(){
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "30px solid grey";
        this.canvas.style.margin = "50px auto";
        this.canvas. style.display = "block";
        this.canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(this.canvas);

        this.launch();
        //refreshCanvas();
    }


    launch(){
        this.snaky = new Snake('right', [5,4] , [4,4], [3,4], [2,4]);
        this.apple = new Apple();
        this.score = 0;
        this.delay = 100; 
        clearTimeout(this.timeOut); // fonction qui remet setTimeout à 0
        this.refreshCanvas();
    }

    refreshCanvas(){

        this.snaky.advance();
        if(this.snaky.checkCollision(this.blockWidth, this.blockHeight)){
            Drawing.gameOver(this.ctx, this.xCenter, this.yCenter);
        }else{
    
            if(this.snaky.isEatingeApple(this.apple)){
                this.score++;
                do{
                    this.apple.setNewPosition(this.blockWidth, this.blockHeight);
                    
                }while( this.apple.isOnSnake(this.snaky));

                if(this.score%5 === 0 &&  this.score !=0) this.delay /= 2;
            }

            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            Drawing.drawScore(this.ctx, this.xCenter, this.yCenter, this.score);
            Drawing.drawSnack(this.ctx, this.blockSize, this.snaky);
            Drawing.drawApple(this.ctx, this.blockSize, this.apple)
            this.timeOut = setTimeout(this.refreshCanvas.bind(this), this.delay);    // setTimeout fonction qui permet de relancer une fonction 
                                                                                // j'utilise le bind car je veux garder les proprieté de mon objet pas celui de l'objet Window
        }

    }

}



