function Score() {
    //创建分数
    var score;
    //游戏分数起始值
    var scorestart = 0;
    this.init=function () {
        var box = document.getElementById('box');
        score = document.createElement('h2');
        //设置颜色
        score.style.color="#ffffff";
        //初始化
        score.innerHTML="SCORE:" + scorestart;
        //设置分数的位置
        score.style.position="absolute";
        score.style.left="520px";
        score.style.top="10px";
        box.appendChild(score);
    }
    
    this.run=function () {

    }
}