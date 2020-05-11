window.onload = () => {

    const canvasWidth = 900;
    const canvasHeight = 600;
    const blockSize = 30;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const blockWidth = canvasWidth/blockSize;
    const blockHeight = canvasHeight/blockSize;
    const xCenter = canvasWidth/2;
    const yCenter = canvasHeight/2;

    let delay;
    let snaky;
    let apple;
    let score;
    let timeOut;


    const init = () => {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid grey";
        canvas.style.margin = "50px auto";
        canvas. style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);

        launch();
        //refreshCanvas();
    }

    

    const launch = () =>{
        snaky = new Snake('right', [5,4] , [4,4], [3,4], [2,4]);
        apple = new Apple();
        score = 0;
        delay = 100; 
        clearTimeout(timeOut); // fonction qui remet setTimeout à 0
        refreshCanvas();
    }

    const refreshCanvas = () => {

        snaky.advance();
        if(snaky.checkCollision()){
            gameOver();
        }else{
    
            if(snaky.isEatingeApple(apple)){
                score++;
                do{
                    apple.setNewPosition();
                    
                }while( apple.isOnSnake(snaky));

                if(score%5 === 0 &&  score !=0) delay /= 2;
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snaky.draw();
            apple.draw();
            timeOut = setTimeout(refreshCanvas, delay); // setTimeout fonction qui permet de relancer une fonction
        }

    }

    const gameOver = () => {
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


    const drawScore = () => {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline ="middle";
        ctx.fillText(score.toString(), xCenter, yCenter );
        ctx.restore();
    }

    const drawBlock = (ctx, position ) => {
        // const x = position[0] * blockSize;
        // const y = position[1] * blockSize;

        const [x, y] = position;                                        //Ajout du destructuring
        ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize)    //Ajout du destructuring
    }

    class Snake {
        constructor(direction, ...body){
            this.body = body;
            this.direction = direction
            this.ateApple = false;
        }
 
        draw(){
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(let block of this.body){
                drawBlock(ctx, block);
            }
            ctx.restore();
        };

       

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

        checkCollision(){
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
        
        draw(){
            const radius = blockSize/2;
            const x = this.position[0]*blockSize + radius;
            const y = this.position[1]*blockSize + radius;
            ctx.save();
            ctx.fillStyle="#33cc33";
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        };

        setNewPosition(){
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

    document.onkeydown = e =>{
        const key = e.keyCode;
        let newDirection;

        switch(key){
            case 32:
                launch();
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
        snaky.setDirection(newDirection);

    }

    init();

}