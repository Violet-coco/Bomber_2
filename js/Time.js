class Time {
    constructor(){
        //创建时间
        this.time;
        //游戏时间长度5分钟
        this.timeW = 300;
    }

    init() {
        var box = document.getElementById('box');
        this.time = document.createElement('h2');
        //设置颜色
        this.time.style.color="#ffffff";
        //初始化
        this.time.innerHTML="TIME:  " +this.timeW + "S";
        //设置分数的位置
        this.time.style.position="absolute";
        this.time.style.left="40px";
        this.time.style.top="10px";
        box.appendChild(this.time);
    }

    setTime() {
        if (this.timeW >0) {

            this.timeW--;
            this.time.innerHTML = "TIME:  " +this.timeW + "S";
        }
        else{
            clearInterval(this.time);
            alert("时间到，游戏结束!");
        }
    }
    run() {
        this.setTime();
    }
}