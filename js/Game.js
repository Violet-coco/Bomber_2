class Game {
    constructor() {
        Game.this = this;
        //地图
        this.map;
        //游戏时间
        this.time;
        //游戏玩家
        this.player;
        //游戏中的敌人
        this.enemy;
        //敌人数组
        this.enemys = [];

        this.that;
        this.paint;

        //放置炸弹
        this.bombs = [];
    }


    init() {
        this.that = this;
        //初始化游戏盒子
        this.initGame();
        //初始化背景地图
        this.initMap();
        //初始化玩家
        this.initPlayer();
        //初始化敌人
        this.initEnemy();
    }


    initGame() {

        //获得游戏的画布
        var myCanvas = document.getElementById('myCanvas');

        //创建一个画笔
        this.paint = myCanvas.getContext("2d");
    }

    initMap() {
        //地图
        this.map = new Map();
        //初始化
        this.map.init();
        //this.setisUpdateListener(this.isUpdateListener);
    }

    initPlayer() {
        //游戏玩家
        this.player = new Player();
        //初始化
        this.player.init(this.paint, this.enemy);
        //设置地图的监听
        this.player.setMapListener(this.mapListener);
        this.player.setBoomListener(this.boomListener);


    }

    mapListener() {
        return Game.this.map.getMap();
    }

    boomListener() {
        Game.this.setBomb();
    }

    initEnemy() {
        //游戏中的敌人
        this.enemy = new Enemy();
        //初始化
        this.enemy.init();

        this.enemys.push(this.enemy);
        //console.log(enemys.length);

        //设置地图的监听
        this.enemy.setMapListener(this.mapListener);
    }

    //键盘事件
    onkeypress(keyCode) {
        this.player.onkeypress(keyCode);
    }

    run() {
        this.map.run(this.paint);
        this.enemy.run(this.paint);

        this.player.run(this.paint);
        this.player.collision(this.enemy);

        for (var i = 0; i < this.bombs.length; i++) {
            //console.log(bombs[i].getX());
            this.bombs[i].run(this.paint, i);
        }
    }

    setBomb() {
        var bomb = new Bomb();

        var cell = this.geCell();
        // cell.cellX=100;
        // cell.cellY=-100;
        bomb.init(cell.cellX, cell.cellY);
        bomb.setBoomListener(this.boomOverListener);
        bomb.setMapDataListener(this.getMap);
        this.bombs.push(bomb);

    }

    getMap() {
        return Game.this.map.getMap();
    }

    geCell() {
        var i = Math.floor(this.player.getX() / this.map.cellWidth);
        var j = Math.floor(this.player.getY() / this.map.cellHight);

        console.log(i);
        console.log(j);
        var cell = this.map.getCell(j, i);
        return cell;
    }


    boomOverListener(index) {

        var bombX = Game.this.bombs[index].getX();
        var bombY = Game.this.bombs[index].getY();

        Game.this.map.resetMap(bombX, bombY);
        Game.this.player.iscollision(bombX, bombY);
        Game.this.enemy.collision(bombX, bombY);
        // if(enemy.collision(bombX,bombY)){
        //     enemy.destroy();
        //     enemy=null;
        // }
        Game.this.bombs.splice(index, 1);
    }
}