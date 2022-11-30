

/*左侧栏隐藏-----------------------------------------------------------------------------*/
var navCount = 0;
var showNav = function (){// control the nav bar
    navCount = (navCount + 1) % 2;
    var leftCol = $(".leftCol");
    var rightCol = $(".rightCol");
    var leftList = $(".leftList");
    var navOpener = $(".navButt");
    leftCol.css("transition","0.6s ease-in-out")
    if(navCount === 0){
        leftCol.css("width","20%");
        rightCol.css("width","78%");
        rightCol.css("margin-left","21%");
        leftList.css("opacity","1");
        setTimeout(function (){leftList.css("display","block")},500);

    }else {
        leftCol.css("width","0%");
        rightCol.css("width","98%");
        rightCol.css("margin-left","1%");
        leftList.css("opacity","0");
        setTimeout(function (){leftList.css("display","none")},500);
    }
}
/*用户信息显示---------------------------------------------------------------------*/
var showClientInfo = function (flag){
    var portImg = $(".portImg")
    var clientInfo = $(".clientIfo")
    if(flag === 0){
        portImg.css("margin-left","-200%");
        clientInfo.css("opacity","1");
        clientInfo.css("visibility","visible");
    }
    else {
        portImg.css("margin-left","0");
        clientInfo.css("opacity","0");
        clientInfo.css("visibility","hidden");
    }
}
/*左侧栏固定-----------------------------------------------------------------------*/
window.onscroll = function (){
    var scrollPos = 0
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollPos = document.documentElement.scrollTop;
    }else if(document.body) {
        scrollPos = document.body.scrollTop;
    }
    console.log(scrollPos);
    var leftCol = $(".leftCol");
    if(scrollPos >= 200){
        leftCol.css("transition","0s");
        leftCol.css("position","fixed");
        leftCol.css("margin-top","-120px")
    }
    else {
        leftCol.css("transition","0s");
        leftCol.css("position","absolute");
        leftCol.css("margin-top","0px")
    }
}

/*轮播图-----------------------------------------------------------------------------*/

var items = document.querySelectorAll(".loopItem");
var points = document.querySelectorAll(".loopPoint");
var left = document.getElementById(".leftBtn");
var right = document.getElementById(".rightBtn");
var loop = document.querySelector(".carousel");
var index = 0;
var time = 0;//用于定时换图

var inValidAll = function (){
    for(i = 0;i < items.length;i++){
        items[i].className = "loopItem";
    }
    for(i = 0;i < points.length;i++){
        points[i].className = "loopPoint";
    }
}

var activateIndex = function (){
    inValidAll();
    items[index].className = "loopItem active";
    points[index].className = "loopPoint active";
}

var leftSwitch = function (){
    if(index === 0){
        index = 4;
    }
    else {
        index--;
    }
    activateIndex();
}

var rightSwitch = function (){
    if(index === 4){
        index = 0;
    }
    else {
        index++;
    }
    activateIndex();
}

var timer;

function play(){
    timer = setInterval(() => {
        time++;
        if(time === 20){
            rightSwitch();
            time = 0;
        }
    },100);
}

play();

loop.onmousemove = function (){
    clearInterval(timer);
}

loop.onmouseleave = function (){
    play();
}

