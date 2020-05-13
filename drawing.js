export default class Drawing{
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
            