class Player {
    constructor(){
        //创建玩家
        this.player;
        //移动速度
        this.speed = 3;
        //玩家的坐标
        this.playerX = 40;
        this.playerY= 40;
        //图片的宽高
        this.playerW = 30;
        this.playerH = 30;

        //向下移动的动画图片
        this.playerDown = ['img/players/down_01.png', 'img/players/down_02.png', 'img/players/down_03.png', 'img/players/down_04.png'];
        //向上移动的动画图片
        this.playerUp = ['img/players/up_01.png', 'img/players/up_02.png', 'img/players/up_03.png', 'img/players/up_04.png'];
        //向左移动的动画图片
        this.playerLeft = ['img/players/left_01.png', 'img/players/left_02.png', 'img/players/left_03.png', 'img/players/left_04.png'];
        //向右移动的位置
        this.playerRight = ['img/players/right_01.png', 'img/players/right_02.png', 'img/players/right_03.png', 'img/players/right_04.png'];

        this.paint;
        //图片的下标
        this.index = 0;
        this.PLAYER_UP = 119;
        this.PLAYER_DOWN = 115;
        this.PLAYER_LEFT = 97;
        this.PLAYER_RIGHT = 100;
        this.PLAYER_FIRE = 32;
        this.setBoom;
        this.MY_NORMAL = 0;
        this.MY_BOOM = this.MY_NORMAL + 1;
        this.state = this.MY_NORMAL;
        this.xiabiao = -1;
        this.booms = ['./img/players/play_01.png','./img/players/play_02.png','./img/players/play_03.png','./img/players/play_04.png','./img/players/play_05.png','./img/players/play_06.png','./img/players/play_07.png'];
        //设置监听
        this.callMap;

    }


    init(paint1) {
        this.paint = paint1;
        this.player = new Image();
        this.player.src = this.playerDown[this.index];
    }


    //键盘事件
    onkeypress(keyCode) {
        switch (keyCode) {
            case this.PLAYER_UP:
                //向上移动
                if(this.getIsMoveUp()){
                    this.moveUp();
                }
                break;
            case this.PLAYER_DOWN:
                //向下移动
                if(this.getIsMoveDown()){
                    this.moveDown();
                }
                break;
            case this.PLAYER_LEFT:
                //向左移动
                if(this.getIsMoveLeft()){
                    this.moveLeft();
                }
                break;
            case this.PLAYER_RIGHT:
                //向右移动
                if(this.getIsMoveRight()){
                    this.moveRight();
                }
                break;
            case this.PLAYER_FIRE:
                //放置炸弹
                this.setBoom();
                break;
        }
    }

    //向上移动
    moveUp() {
        //处理图片位移
        this.playerY = this.playerY - this.speed;
        if (this.playerY < 40)
            this.playerY = 40;
        this.player.style.top = this.playerY + "px";

        //处理图片的动画
        this.index++;
        if(this.index>=4)
            this.index=0;
        this.player.src=this.playerUp[this.index];
    }

    //向下移动
    moveDown() {
        this.playerY = this.playerY + this.speed;
        if (this.playerY > 480 - this.playerH)
            this.playerY = 480 - this.playerH;
        this.player.style.top = this.playerY + "px";

        //处理图片的动画
        this.index++;
        if(this.index>=4)
            this.index=0;
        this.player.src=this.playerDown[this.index];
    }

    //向左移动
    moveLeft() {
        this.playerX = this.playerX - this.speed;
        if (this.playerX < 40)
            this.playerX = 40;
        this.player.style.left = this.playerX + "px";

        //处理图片的动画
        this.index++;
        if(this.index>=4)
            this.index=0;
        this.player.src=this.playerLeft[this.index];
    }

    //向右移动
    moveRight() {
        this.playerX = this.playerX + this.speed;
        if (this.playerX > 640 - this.playerW)
            this.playerX = 640 - this.playerW;
        this.player.style.left = this.playerX + "px";

        //处理图片的动画
        this.index++;
        if(this.index>=4)
            this.index=0;
        this.player.src=this.playerRight[this.index];
    }



    setBoomListener(call) {
        this.setBoom=call;
    }


    collision(enemy) {
        var isCollision = false;
        //console.log(enemy.enemyX,enemy.enemyY);
        //检测敌人是否和玩家有碰撞
        if (this.playerX < (enemy.enemyX + enemy.enemyW) &&
            (this.playerX + this.playerW) > enemy.enemyX &&
            (this.playerY + this.playerH) > enemy.enemyY &&
            (enemy.enemyY + enemy.enemyH) > this.playerY) {
            this.state = this.MY_BOOM;
            isCollision = true;
            return;
        }
        return isCollision;
        //console.log(isCollision);
    }
    explosion() {
        this.xiabiao++;
        if (this.xiabiao >= 7) {
            //state = MY_NORMAL;
            //xiabiao = -1;
            alert("游戏结束！");
        } else {
            this.player.src = this.booms[this.xiabiao];
        }
    }

    //设置炸弹爆炸状态
    setBoom() {
        this.state = this.MY_BOOM;
    }

    setMapListener(call) {
        this.callMap=call;
    }

    //得到当前的横坐标
    getI() {
        var i =Math.floor((this.playerY+this.playerH)/40);
        return i;
    }

    //得到当前的纵坐标
    getJ() {
        var j =Math.floor((this.playerX+this.playerH)/40);
        return j;
    }

    //是否能够向左移动
    getIsMoveLeft() {
        //当前位置的左边
        let j=this.getJ()-1;
        let buffer =this.callMap()[this.getI()][j];

        let left=j*40;
        if(buffer!=1&&this.playerX<=(left+40)){
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
        if(buffer!=1&&(this.playerX+40)>=right){
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
        if(buffer!=1&&this.playerY>=(up+40)){
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
        if(buffer!=1&&(this.playerY+40)>=down){
            return false;
        }else{
            return true;
        }
    }

    run(paint) {

        switch (this.state) {
            case this.MY_NORMAL:
                paint.drawImage(this.player,this.playerX,this.playerY,this.playerW,this.playerH);
                break;
            case this.MY_BOOM:
                this.explosion();
                break;
        }
    }

    getX() {
        return this.playerX;
    }
    getY() {
        return this.playerY;
    }
    getW() {
        return this.playerW;
    }
    getH() {
        return this.playerH;
    }

    //玩家是否碰撞到炸弹
    iscollision(x,y) {
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
        this.player.src = "";
        alert("游戏结束！");
    }

}