class Map {
    constructor(){
        //地图数据
        this.mapData=[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,2,1,2,2,2,1,2,2,2,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,2,1,1,1,1,1,1,1,1,1,2,1,1,1,2,0],
            [0,1,0,1,0,1,0,1,0,1,0,2,0,1,0,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0],
            [0,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0],
            [0,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,0],
            [0,1,0,2,0,1,0,1,0,1,0,1,0,1,0,2,0],
            [0,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];
        this.cellWidth=40;
        this.cellHight=40;
        this.cells=[];

        this.rowNum=this.mapData.length;
        this.colNum = this.mapData[0].label;
    }


    init() {
        //创建二维数组绘制地图
        let length = this.rowNum;
        for(let i=0;i<length;i++){
            this.cells[i]= [];
            let buffer=this.mapData[i];
            for(let j=0;j<buffer.length;j++){
                let cell = new Cell();
                cell.init(buffer[j],j*this.cellWidth,i*this.cellHight);
                this.cells[i][j]=cell;
            }
        }
    }


    getCell(i,j){

        return this.cells[i][j];
    }

    getMap() {
        return this.mapData;
    }


    run(paint) {

        this.cells.forEach(function (cell2) {
            cell2.forEach(function (cell) {
                cell.run(paint);
            });
        })
    }


    //得到当前的横坐标
    getI(y) {
        var i =Math.floor(y/40);
        return i;
    }

    //得到当前的纵坐标
    getJ(x) {
        var j =Math.floor(x/40);
        return j;
    }

    //重置地图
    resetMap(x,y) {
        let i = this.getI(y);
        let j = this.getJ(x);
        //console.log("被销毁K"+i+"j="+j);
        for(let m=1;m<=4;m++){
            this.checkVertical(i-m,j);
            this.checkHorizontal(i,j-m);
        }

        for(let m=1;m<=4;m++){
            this.checkVertical(i+m,j)
            this.checkVertical(i,j+m);
        }
        
    }

    //爆炸的水平方向
    checkVertical(i,j) {
        if(i<0||i>=this.rowNum)
            return;
        if(this.mapData[i][j]==2){
            this.mapData[i][j]=1;
            //console.log("k="+i+";j="+j);
            //console.log("被销毁2");
            this.cells[i][j].reset();
        }
    }

    //爆炸的垂直方向
    checkHorizontal(i,j) {
        if(j<0||j>=this.colNum)
            return;
        if(this.mapData[i][j]==2){
            this.mapData[i][j]=1;
            //console.log("k="+i+";j="+j);
            //console.log("被销毁2");
            this.cells[i][j].reset();
        }
    }

}