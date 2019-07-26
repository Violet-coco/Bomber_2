class Cell{
constructor(){
    //方块的类型
    this.type;

    //坐标
    this.cellX;
    this.cellY;

    //方块
    this.cell;
}


    init (type1,cellX1,cellY1) {
        this.cellX=cellX1;
        this.cellY=cellY1;
        this.type= type1;
        //console.log(type);
        //console.log(cellX,cellY);
        this.cell =  new Image();
        switch(this.type){
            case 0:
                this.cell.src="./img/wall.png";
                break;
            case 1:
                this.cell.src="./img/floor.png";
                break;
            case 2:
                this.cell.src="./img/obstacle.png";
                break;
        }
    }

    run(paint) {
        paint.drawImage(this.cell,this.cellX,this.cellY,40,40);
    }

    reset() {
        this.cell.src="./img/floor.png";
        //console.log("被销毁3");
    }

}
