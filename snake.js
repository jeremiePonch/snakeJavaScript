export default class Snake {
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

        if(allowedDirection.includes(newDirection)){
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
