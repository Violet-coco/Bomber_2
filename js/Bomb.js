class Bomb {
    constructor() {
        //创建炸弹
        this.bomb;
        //炸弹大小
        this.width = 40;
        this.height = 40;
        //炸弹的位置
        this.bombX;
        this.bombY;

        this.num = 4;

        this.numTop = 4;
        this.numBottom = 4;
        this.numLeft = 4;
        this.numRight = 4;

        //爆炸数组
        this.blasts = [];


        this.BOOM_NORMAL = 0;
        this.BOOM_RUN = this.BOOM_NORMAL + 1;
        this.state = this.BOOM_NORMAL;

        this.time = 0;

        this.index = 0;

        this.blastUp = [];
        this.blastVertical = [];
        this.blastMiddle = [];
        this.blastDown = [];
        this.blastLeft = [];
        this.blastLevel = [];
        this.blastRight = [];
    }


    init(x, y) {
        this.initBoom(x, y);
        this.initblasts(x, y);
    }

    initBoom(x, y) {

        this.bombX = x;
        this.bombY = y;
        // console.log(this.bombX);
        this.bomb = new Image();
        this.bomb.src = "./img/bomb_01.png";
    }

    getX() {

        return this.bombX;
    }

    getY() {
        return this.bombY;
    }


    setBoomListener(call) {
        this.callBack = call;
    }

    setMapDataListener(call) {
        this.mapDataCall = call;
    }

    initblasts(x, y) {

        //最上面的图片
        for (let i = 4; i >= 1; i--) {
            let img = new Image();
            img.src = "img/Booms/up_0" + i + ".png";
            this.blastUp.push(img);
        }

        //最上面到中间之间的图
        for (let i = 4; i >= 1; i--) {
            var img = new Image();
            img.src = "img/Booms/vertical_0" + i + ".png";
            this.blastVertical.push(img);
        }

        //中间的图
        for (let i = 4; i >= 1; i--) {
            var img = new Image();
            img.src = "img/Booms/middle_0" + i + ".png";
            this.blastMiddle.push(img);
        }

        //最下面到中间之间的图
        for (let i = 4; i >= 1; i--) {
            var img = new Image();
            img.src = "img/Booms/down_0" + i + ".png";
            this.blastDown.push(img);
        }

        //最左边的图片
        for (let i = 4; i >= 1; i--) {
            var img = new Image();
            img.src = "img/Booms/left_0" + i + ".png";
            this.blastLeft.push(img);
        }

        //水平的图片
        for (let i = 4; i >= 1; i--) {
            var img = new Image();
            img.src = "img/Booms/level_0" + i + ".png";
            this.blastLevel.push(img);
        }

        //最右边的图片
        for (let i = 4; i >= 1; i--) {
            var img = new Image();
            img.src = "img/Booms/right_0" + i + ".png";
            this.blastRight.push(img);
        }
    }


    calculate() {
        var i = this.bombX / this.width;
        var j = this.bombY / this.height;

        var mapData=this.mapDataCall();

        //1,计算左边爆炸的范围
        this.calculateTop(i,j,mapData);
        this.calculateBottom(i,j,mapData);
        this.calculateHorizontalLeft(i,j,mapData);
        this.calculateHorizontalRight(i,j,mapData);
        // console.log(i);//横向
        // console.log(j);//纵向

        console.log(this.numTop)
        console.log(this.numBottom)
        console.log(this.numLeft)
        console.log(this.numRight)
    }


    calculateHorizontalRight(i,j,mapData) {
        this.numRight=0;
        for(var index=1;index<=4;index++){
            if(mapData[i+index][j]==0){
                break;
            }
            this.numRight++;
        }
    }

    calculateHorizontalLeft(i,j,mapData) {
        this.numLeft=0;
        for(var index=1;index<=4;index++){
            if(mapData[i-index][j]==0){
                break;
            }
            this.numLeft++;
        }
    }

    calculateTop(i,j,mapData) {
        this.numTop=0;
        for(var index=1;index<=4;index++){
            //console.log(mapData[i][j-index]);
            if(mapData[i][j-index]==0){
                break;
            }
            this.numTop++;
        }
    }

    calculateBottom(i,j,mapData) {
        this.numBottom=0;
        for(var index=1;index<=4;index++){
            if(mapData[i][j+index]==0){
                break;
            }
            this.numBottom++;
        }
    }



    run(paint, k) {

        switch (this.state) {
            case this.BOOM_NORMAL:
                this.time++;
                if (this.time > 32) {
                    this.time = 0;
                    this.calculate();
                    this.state = this.BOOM_RUN;
                }
                paint.drawImage(this.bomb, this.bombX, this.bombY, this.width, this.height);
                break;
            case this.BOOM_RUN:
                this.index++;
                if (this.index >= 4) {
                    //console.log("销毁炸弹1");
                    this.callBack(k);
                    this.state = -1;
                    break;
                }

                if (this.numTop > 0) {

                    if (this.numTop == 1) {
                        //最上面火焰的动画
                        paint.drawImage(this.blastUp[this.index], this.bombX, this.bombY - this.numTop  * this.height, this.width, this.height);

                    } else {
                        //最上面火焰的动画
                        paint.drawImage(this.blastUp[this.index], this.bombX, this.bombY - this.numTop  * this.height, this.width, this.height);

                        //最上面火焰到中心点之间竖直的火焰
                        for (var i = 0; i < this.numTop-1; i++) {
                            paint.drawImage(this.blastVertical[this.index], this.bombX, this.bombY - (i + 1) * this.height, this.width, this.height);
                        }
                    }
                }

                //中心的火焰
                paint.drawImage(this.blastMiddle[this.index], this.bombX, this.bombY, this.width, this.height);

                if(this.numBottom>0){

                    if(this.numBottom==1){
                        //最下面的火焰
                        paint.drawImage(this.blastDown[this.index], this.bombX, this.bombY + this.numBottom  * this.height, this.width, this.height);

                    }else{
                        //最下面的火焰
                        paint.drawImage(this.blastDown[this.index], this.bombX, this.bombY + this.numBottom * this.height, this.width, this.height);

                        //中心到下面的火焰
                        for (var i = 0; i < this.numBottom-1; i++) {
                            paint.drawImage(this.blastVertical[this.index], this.bombX, this.bombY + (i + 1) * this.height, this.width, this.height);
                        }
                    }
                }



                if(this.numLeft>0){
                    if(this.numLeft==1){
                        //最左边的火焰
                        paint.drawImage(this.blastLeft[this.index], this.bombX - this.numLeft  * this.width, this.bombY, this.width, this.height);

                    }else{
                        //最左边的火焰
                        paint.drawImage(this.blastLeft[this.index], this.bombX - this.numLeft * this.width, this.bombY, this.width, this.height);
                        //中心到最左边的火焰
                        for (var i = 0; i < this.numLeft-1; i++) {
                            paint.drawImage(this.blastLevel[this.index], this.bombX - (i + 1) * this.width, this.bombY, this.width, this.height);
                        }
                    }
                }



                if (this.numRight > 0) {
                    if (this.numRight == 1) {
                        //最右边的火焰
                        paint.drawImage(this.blastRight[this.index], this.bombX + (this.num + 1) * this.width, this.bombY, this.width, this.height);

                    } else {
                        //最右边的火焰
                        paint.drawImage(this.blastRight[this.index], this.bombX + this.numRight * this.width, this.bombY, this.width, this.height);
                        //中心到最右边的火焰
                        for (var i = 0; i < this.numRight - 1; i++) {
                            paint.drawImage(this.blastLevel[this.index], this.bombX + (i + 1) * this.width, this.bombY, this.width, this.height);
                        }
                    }
                }

                break;
        }


    }
}
