var avatorScaler = function (size){
    $(".avator img").css("width", size);
    $(".avator img").css("height", size);
    if(size === "100px")
        appendDropDown();
    else
        deleteDropDown();
}
var deleteDropDown = function (){
    $(".dropDown").css("opacity", "0");
}
var appendDropDown = function (){
    var dropDown = $(".dropDown");
    dropDown.css("opacity", "1");
}
var changeSearch = function (state){
    if(state === 0)
        $(".searchBar img").css("background-color", "#00000024");
    else if(state === 1)
        $(".searchBar img").css("background-color", "#00000000");
    else if(state === 2)
        $(".searchBar").css("background-color", "#0000001a");
    else
        $(".searchBar").css("background-color", "#0000000a");
}

var items = $(".loopItem");
var points = $(".loopPoint");
var left = $("#leftBtn");
var right = $("#rightBtn");
var loop = $(".carousel");
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
    items[getNext()].className = "loopItem next";
    items[getPre()].className = "loopItem pre";
    items[index].className = "loopItem active";
    points[index].className = "loopPoint active";
}

var getNext = function (){
    if(index + 1 >= items.length)
        return 0;
    else return index + 1;
}

var getPre = function (){
    if(index - 1 < 0)
        return items.length - 1;
    else return index - 1;
}

var leftSwitch = function (){
    index = getPre();
    activateIndex();
}

var rightSwitch = function (){
    index = getNext();
    activateIndex();
}

var timer;

function play(){
    timer = setInterval(() => {
        time++;
        if(time === 30){
            rightSwitch();
            time = 0;
        }
    },100);
}

var loopPlay = function (){
    play();
}

var loopStop = function (){
    clearInterval(timer);
}


// /*分类栏运动*/
//
// var cateLeftSide = 0;
// var cateList = $(".cateList:nth-child(1)");
// var cateLeftBtn = $(".leftCateBtn");
// var cateRightBtn = $(".rightCateBtn");
//
// var cateLeftMove = function (){
//     if(cateLeftSide > 0){
//         cateLeftSide--;
//         cateList.css("margin-left",-cateLeftSide * 20 + "%");
//         cateRightBtn.css("opacity","1");
//     }
//     if(cateLeftSide === 0){
//         cateLeftBtn.css("opacity","0");
//     }
// }
//
// var cateRightMove = function (){
//     if(cateLeftSide < 4){
//         cateLeftSide++;
//         cateList.css("margin-left",-cateLeftSide * 20 + "%");
//         cateLeftBtn.css("opacity","1");
//     }
//     if(cateLeftSide === 4){
//         cateRightBtn.css("opacity","0");
//     }
// }
//
// /*商品栏变化----------------------------------------------------------------------------*/
//
// var goodItemChangeStatus = function (flag){
//     var goodItem = $(this);
//     if(flag === 1) {
//         this.css("background-color", "black");
//     } else {
//         this.css("background-color", "darkslateblue");
//     }
// }
//
