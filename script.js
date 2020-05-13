window.onload = () => {



    class Game {
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


    class Snake {
        constructor(direction, ...body){
            this.body = body;
            this.direction = direction
            this.ateApple = false;
        }
 

        advance(){
            const nextPosition = this.body[0].slice(); //   fait une copie du premier élement du tableau nextPosition = [6,4]

            switch(this.direction){
                case "left":
                    nextPosition[0] --; 
                    break;                     
                case "right":
                    nextPosition[0] ++;   
                    break;                      
                case "up":
                    nextPosition[1] --;   
                    break;                     
                case "down":
                    nextPosition[1] ++; 
                    break;      
                default:
                    throw("Invalid direction");
            }

            this.body.unshift(nextPosition);         //  ajoute nextposition en tete du tableau body [[nextPosition] [6,4], [5,4] , [4,4]]
            if(!this.ateApple)
                this.body.pop();                     //  supprime le dernier element d'un tableau [[7,4] [6,4], [5,4]]
            else
                this.ateApple = false;

        };

        setDirection(newDirection){
            let allowedDirection;

            switch(this.direction){

                case "left":                   
                case "right":
                    allowedDirection = ["up", "down"];
                    break;   

                case "up":                    
                case "down":
                    allowedDirection = ["left", "right"];
                    break; 

                default:
                    throw("Invalid direction");
            }

            if(allowedDirection.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };

        checkCollision(blockWidth, blockHeight){
            let wallCollision = false;
            let snakeCollision = false;
            // const head = this.body[0];
            // const rest = this.body.slice(1); // corps du serpent [[4,3], [2,3]]
            // const headX = head[0];
            // const headY = head[1];
            const[head, ...rest] = this.body;               //Ajout du destructuring
            const[headX, headY] = head;                     //Ajout du destructuring
            const minX = 0;
            const minY = 0;
            const maxX = blockWidth - 1;
            const maxY = blockHeight - 1;
            const isNotBetweenHorrizontalWalls = headX < minX || headX > maxX;
            const isNotBetweenVerticallWalls = headY < minY || headY > maxY;

            if(isNotBetweenHorrizontalWalls || isNotBetweenVerticallWalls){
                wallCollision = true;
            }



            for(let block of rest){
                if(headX === block[0] && headY === block[1] ){
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;
        };

        isEatingeApple(appleToEat){
           
            const head = this.body[0];
            if( head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
                this.ateApple = true;
                return true;
            }
            else{
                return false;
            }
                
        };
    
    }

    class Apple{
        constructor(position = [10,10]){
            this.position = position; 
        }
        

        setNewPosition(blockWidth, blockHeight){
            const newX = Math.round(Math.random() * blockWidth - 1);
            const newY = Math.round(Math.random() * blockHeight - 1);
            console.log(this.position);
            this.position = [newX, newY];
            console.log(this.position);
        };

        isOnSnake(snakeToCkeck){
            let isOnSnake = false;
            for(let block of snakeToCkeck.body){
                if(this.position[0] === block[0] && this.position[1] === block[1])
                    isOnSnake = true;
            }

            return isOnSnake;
        };
    }

    class Drawing{
        static gameOver(ctx, xCenter, yCenter,  ){
            ctx.save();
            ctx.font = "bold 70px sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline ="middle";
            ctx.strokeStyle = "white"
            ctx.lineWidth = 5;
            ctx.strokeText("Game over", xCenter, yCenter - 180);
            ctx.fillText("Game over", xCenter, yCenter - 180);
    
            ctx.font = "bold 30px sans-serif";
            ctx.strokeText("Appuyer sur la touche Espace pour rejouer ", xCenter, yCenter - 120);
            ctx.fillText("Appuyer sur la touche Espace pour rejouer ", xCenter, yCenter - 120);
            ctx.restore();
        }

        static drawScore(ctx, xCenter, yCenter, score){
            ctx.save();
            ctx.font = "bold 200px sans-serif";
            ctx.fillStyle = "gray";
            ctx.textAlign = "center";
            ctx.textBaseline ="middle";
            ctx.fillText(score.toString(), xCenter, yCenter );
            ctx.restore();
        }
        
        static drawBlock(ctx, position,blockSize){
            // const x = position[0] * blockSize;
            // const y = position[1] * blockSize;
    
            const [x, y] = position;                                        //Ajout du destructuring
            ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize)    //Ajout du destructuring
        }


        static drawSnack(ctx, blockSize, snake){
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(let block of snake.body){
                this.drawBlock(ctx, block,blockSize);
            }
            ctx.restore();
        }

        static drawApple(ctx, blockSize, apple){
            const radius = blockSize/2;
            const x = apple.position[0]*blockSize + radius;
            const y = apple.position[1]*blockSize + radius;
            ctx.save();
            ctx.fillStyle="#33cc33";
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();

        }

    }


    let myGame = new Game();
    myGame.init();
    let myGame2 = new Game();
    myGame2.init();

    document.onkeydown = e =>{
        const key = e.keyCode;
        let newDirection;

        switch(key){
            case 32:
                myGame.launch();
                // myGame2.launch();
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
        // myGame2.snaky.setDirection(newDirection);

    }


}