
export default class Apple{
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