class Enemy{
    constructor(){
        //敌人
        this.enemy;
        //敌人的位置
        this.enemyX=280;
        this.enemyY=40;
        //敌人移动的速度
        this.speed = 2;
        //敌人图片的大小
        this.enemyW=30;
        this.enemyH=30;
        //敌机的类型
        this.type;
        //运动方向的状态值
        this.MOVE_UP=0;
        this.MOVE_DOWN=this.MOVE_UP+1;
        this.MOVE_LEFT=this.MOVE_DOWN+1;
        this.MOVE_RIGHT=this.MOVE_LEFT+1;
        //状态值
        this.state =this.MOVE_DOWN;


    }


    init() {
        //this.setPosition();
        this.enemy = new Image();
        //随机敌人的类型
        this.type = Math.floor(Math.random()*7);


        if(this.type==0){
            this.enemy.src="./img/enemys/enemy1_01.png";
        }else if(this.type==1){
            this.enemy.src="./img/enemys/enemy2_01.png";
        }else if(this.type==1){
            this.enemy.src="./img/enemys/enemy3_01.png";
        }else if(this.type==1){
            this.enemy.src="./img/enemys/enemy4_01.png";
        }else if(this.type==1){
            this.enemy.src="./img/enemys/enemy5_01.png";
        }else if(this.type==1){
            this.enemy.src="./img/enemys/enemy6_01.png";
        }else{
            this.enemy.src="./img/enemys/enemy_01.png";
        }
    }


    //var time=0;



    //移动
    move() {
        switch (this.state) {
            case this.MOVE_UP:
                //向上移动
                if(this.getIsMoveUp()){
                    this.moveUp();
                }else{
                    this.state = this.MOVE_DOWN;
                }
                break;
            case this.MOVE_DOWN:
                //向下移动
                if(this.getIsMoveDown()){
                    this.moveDown();
                }else{
                    this.state = this.MOVE_UP;
                }
                break;
            case this.MOVE_LEFT:
                //向左移动
                if(this.getIsMoveLeft()){
                    this.moveLeft();
                }else{
                    this.state = this.MOVE_RIGHT;
                }
                break;
            case this.MOVE_RIGHT:
                //向右移动
                if(this.getIsMoveRight()){
                    this.moveRight();
                }else{
                    this.state = this.MOVE_LEFT;
                }
                break;
        }
    }

    //向上移动
    moveUp() {
        //处理图片位移
        if(this.enemy!=null){
            this.enemyY = this.enemyY - this.speed;
            if (this.enemyY < 40)
                this.enemyY = 40;
            this.enemy.style.top = this.enemyY + "px";
        }

    }

    //向下移动
    moveDown() {
        if(this.enemy!=null){
            this.enemyY = this.enemyY + this.speed;
            if (this.enemyY > 480 - this.enemyH)
                this.enemyY = 480 - this.enemyH;
            this.enemy.style.top = this.enemyY + "px";
        }

    }

    //向左移动
    moveLeft() {
        if(this.enemy!=null){
            this.enemyX = this.enemyX - this.speed;
            if (this.enemyX < 40)
                this.enemyX = 40;
            this.enemy.style.left = this.enemyX + "px";
        }
    }

    //向右移动
    moveRight() {
        if(this.enemy!=null){
            this.enemyX = this.enemyX + this.speed;
            if (this.enemyX > 640 - this.enemyW)
                this.enemyX = 640 - this.enemyW;
            this. enemy.style.left = this.enemyX + "px";
        }
    }



    setMapListener(call) {
        this.callMap=call;
    }

    //得到当前的横坐标
    getI() {
        var i =Math.floor((this.enemyY+this.enemyH)/40);
        return i;
    }

    //得到当前的纵坐标
    getJ () {
        var j =Math.floor((this.enemyX+this.enemyH)/40);
        return j;
    }

    getX() {
        return this.enemyX;
    }

    getY() {
        return this.enemyY;
    }



    //是否能够向左移动
    getIsMoveLeft() {
        //当前位置的左边
        let j=this.getJ()-1;
        let buffer =
            this.callMap()[this.getI()][j];

        let left=j*40;
        //console.log("当前坐标："+this.enemyX,"左边："+(left+40));
        if(buffer!=1&&this.enemyX<=(left+40)){
            return false;
        }else{
            return true;
        }
    }

    //是否能够向右移动
    getIsMoveRight() {

        //当前位置的右边
        let j=this.getJ()+1;
        let buffer =this.callMap()[this.getI()][j];

        let right=j*40;
        if(buffer!=1&&(this.enemyX+40)>=right){
            return false;
        }else{
            return true;
        }
    }

    //是否能够向上移动
    getIsMoveUp(){
        //当前位置的上边
        let i=this.getI()-1;
        let buffer =this.callMap()[i][this.getJ()];

        let up=i*40;
        if(buffer!=1&&this.enemyY>=(up+40)){
            return false;
        }else{
            return true;
        }
    }

    //是否能够向下移动
    getIsMoveDown(){
        //当前位置的下边
        let i=this.getI()+1;
        let buffer =this.callMap()[i][this.getJ()];

        let down=i*40;
        if(buffer!=1&&(this.enemyY+40)>=down){
            return false;
        }else{
            return true;
        }
    }



    //敌人是否碰撞到炸弹
    collision(x,y) {
        let i = Math.floor(y/40);
        let j = Math.floor(x/40);
        let m = this.getX();
        let n = this.getY();
        console.log("i="+i,"j="+j);
        //console.log("m="+m,"n="+n);
        if(((j-4)*40<=m&&m<=(j+5)*40&&n>=i*40&&n<=(i+1)*40)
            ||((i-4)*40<=m&&m<=(i+5)*40&&n>=j*40&&n<=(j+1)*40)){
            this.resetBoom();
        }
    }

    resetBoom() {
        this.enemy.src= "";
        this.enemy = null;
        if(this.enemy==null){
            alert("游戏结束！");
        }
    }


    run(paint) {

        this.move();
        if(this.enemy!=null){
            paint.drawImage(this.enemy,this.enemyX,this.enemyY,this.enemyW,this.enemyH);
        }


        paint.font="bold 20px Arial";
        paint.fillStyle="#058";

        let buffer = this.callMap()[this.getI()][this.getJ()];
        //paint.fillText(buffer,50,20);

    }


}