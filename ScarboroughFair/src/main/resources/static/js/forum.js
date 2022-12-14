/*回到页头--------------*/


window.onscroll = function (){
    var scrollPos = getScrollPos();
    if(scrollPos > 100){
        $(".returnTopBtn").css("margin-top","0%");
    } else {
        $(".returnTopBtn").css("margin-top","10%");
    }
}

var getScrollPos = function (){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

var returnTop = function (){
    var timer = setInterval(() => {
        var base = getScrollPos();
        if(base <= 1){
            clearInterval(timer);
        }
        document.documentElement.scrollTop = base - Math.pow(base,3/5);
    },10);
}

/*图片放大---------------------------*/

var clickCount = 0;

var picRespond = function (obj){
    clickCount = (clickCount + 1) % 2;
    switch (clickCount){
        case 0:
            obj.className = "itemMain_body_IMG_singleIMG";
            isActive = false;
            break;
        case 1:
            obj.className = "itemMain_body_IMG_singleIMG active";
            isActive = true;
            break;
        default:
            break;
    }
}


/*举报栏的添加------------------------------------------------*/
var inCount = 0;
var outCount = 0;

var appendReport = function (obj){
    if(inCount === 1){
        return;
    }
    inCount++;
    var appendItem = $(obj);
    setTimeout(function (){
        // todo: add report info to database
        appendItem.append("<button class='reportBtn' onmouseleave='removeReport()'>举报</button>");
    },300);
}

var removeReport = function (){
    outCount = (outCount + 1) % 2;
    if(inCount === 0){
        return;
    }
    if(outCount === 0) {
        inCount--;
        $(".reportBtn").remove();
    }
}


// renew forumList here
var renewCount = 0;
var forumList = $(".forumList");
var alreadyUploadIndex = 0;
var renewLock = 0;



var uploadCritic = function(){
    $.ajax({
        type:"post",
        url: server + "/GoodService/findAll",
        async: false,
        data:{
        },
        success: function(data) {
            var start = alreadyUploadIndex;
            for(i = start;i < start + 1;i++){
                console.log("####");
                forumList.append(
                    "<div class=\"forumItem\" id=\"forumItem" + i + "\"> \
    <div class=\"itemMain\"> \
        <div class=\"itemMain_header\"> \
            <div class=\"itemMain_header_IMG\"> \
                <!--todo: add link to personal page here--> \
                <a href=\"#\" target=\"_blank\"><img src=\""+ ("       imgsrc       ") + "\" style=\"width: 50px;height: 50px; border-radius: 50%;\"></a> \
            </div> \
            <div class=\"itemMain_header_details\"> \
                <div class=\"itemMain_header_details_name\">"+ ( "             userName              "  )  +"</div> \
                <div class=\"itemMain_header_details_date\">Published On "+  ("     date    ")  +"</div> \
            </div> \
            <div class=\"itemMain_header_report\" onmouseover=\"appendReport(this)\" onmouseleave=\"removeReport()\"> \
                <img src=\"/img/ellipsisVertical.png\" style=\"width: 30px;height: 30px;margin-top: 10px;\"> \
            </div> \
        </div> \
        <div class=\"itemMain_body\"> \
            <div class=\"itemMain_body_content\">"+ ("             infoContent                ") +"</div> \
            <div class=\"itemMain_body_IMG\"> \
                <!--todo:add an index to every item to ease the clearAll function--> \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\" > \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\"> \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\"> \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\"> \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\"> \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\"> \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\"> \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\"> \
                <img class=\"itemMain_body_IMG_singleIMG\" src=\""+ ("           imgSrc             ") +"\" onclick=\"picRespond(this)\"> \
            </div> \
        </div> \
        <div class=\"itemMainFooter\"> \
            <!--todo:This place should link with actual data--> \
            <div class=\"itemMainFooter_share\"> \
                <img src=\"/img/shareInForum.png\" style=\"width: 30px; height: 30px;\"> \
                <div class=\"itemMainFooter_share_data\">1</div> \
            </div> \
            <div class=\"itemMainFooter_comment\"> \
                <img src=\"/img/commentInForum.png\" style=\"width: 30px; height: 30px;\"> \
                <div class=\"itemMainFooter_comment_data\">"+ ("             criticNumber             ") +"</div> \
            </div> \
            <div class=\"itemMainFooter_like\"> \
                <img src=\"/img/likeInForum.png\" style=\"width: 30px; height: 30px;\"> \
                <div class=\"itemMainFooter_like_data\">"+ ("             likeNumber             ") +"</div> \
            </div> \
        </div> \
        <hr style=\"width: 80%; margin-left: 10%;\"> \
    </div> \
    <div class=\"itemCritics\"> \
        <form class=\"itemCritics_Form\" action=\"#\" method=\"post\"> \
            <div class=\"itemCritics_Form_user\"><img src=\"/img/defaultUser.png\" style=\"width:50px;height: 50px\"></div> \
            <!--todo:add an index to every item to ease the clearAll function--> \
            <textarea name=\"itemCriticsForm\" id=\"itemCriticsForm\"  rows=\"4\" placeholder=\"灌下你的水\" minlength=\"1\" maxlength=\"80\" ></textarea> \
            <button class=\"commentSubmit\" type=\"submit\">灌水</button> \
        </form> \
        <div class=\"itemCritics_critics\"> \
            <hr style=\"width: 72%;margin-left: 18%;\"> \
            <!--todo:grab latest remarks--> \
            <div class=\"itemCritics_criticsList\"> \
                <div class=\"itemCritics_criticsList_item\"> \
                    <div class=\"itemCritics_criticsList_item_user\"> \
                        <a href=\"#\" target=\"_blank\"><img src=\""+ ("           imgSrc             ") +"\" style=\"width: 40px;height: 40px;\"></a> \
                    </div> \
                    <div class=\"itemCritics_criticsList_item_details\"> \
                        <div class=\"itemCritics_criticsList_item_name\">DefaultUser</div> \
                        <div class=\"itemCritics_criticsList_item_content\">"+ ("           criticContent            ") +"</div> \
                        <div class=\"itemCritics_criticsList_item_foot\"> \
                            <div class=\"itemCritics_criticsList_item_foot_time\">Published on "+ ("       date         ") +"</div> \
                            <div class=\"itemCritics_criticsList_item_foot_like\"> \
                                <img src=\"/img/likeInCritic.png\" style=\"width: 15px; height: 15px; margin-right: 15px;margin-top: 5px\"> \
                                <div class=\"itemCritics_criticsList_item_foot_like_data\">"+ ("             likeNumber             ") +"</div> \
                            </div> \
                            <div class=\"itemCritics_criticsList_item_foot_dislike\"> \
                                <img src=\"/img/dislikeInCritic.png\" style=\"width: 15px; height: 15px; margin-right: 15px;margin-top: 5px\"> \
                                <div class=\"itemCritics_criticsList_item_foot_dislike_data\">"+ ("             dislikeNumber             ") +"</div> \
                            </div> \
                            <div class=\"itemCritics_criticsList_item_foot_report\" onmouseover=\"appendReport(this)\" > \
                                <img src=\"/img/ellipsisVertical.png\" style=\"width: 20px; height: 20px; margin-top: 5px\"> \
                            </div> \
                        </div> \
                        <hr style=\"width: 90%; margin-left: -2%;\"> \
                    </div> \
                </div> \
            </div> \
        </div> \
    </div> \
</div>");
                alreadyUploadIndex++;
            }
        }
    });
    renewLock = 0;
    $(".renewIcon").remove();
    return 0;
}

if(renewCount === 0){
    if($.cookie("userID") === undefined)
        window.location.replace(server + "/login");
    else{
        renewLock = 1;
        console.log("!!!");
        setTimeout(uploadCritic,3000);
        forumList.append("<div class='renewIcon'><img src='/img/renewIcon.png' width='50px' height='50px' style='margin-top: 30px; '></div>");
    }
    renewCount++;
}

window.onscroll = function (){
    var scrollPos = getScrollPos();
    var scrollHeight = getScrollHeight();
    var windowHeight = getWindowHeight();
    if(scrollPos + windowHeight >= scrollHeight && renewLock === 0){
        console.log("@@@@");
        renewLock = 1;
        // this would invoke the renew function
        setTimeout(uploadCritic,3000);
        forumList.append("<div class='renewIcon'><img src='/img/renewIcon.png' width='50px' height='50px' style='margin-top: 30px;'></div>");
    }
}

var getScrollPos = function (){
    var scrollTop = 0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop = document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

var getScrollHeight = function(){
    var scrollHeight = 0;
    if(document.documentElement&&document.documentElement.scrollHeight){
        scrollHeight = document.documentElement.scrollHeight;
    }else if(document.body){
        scrollHeight = document.body.scrollHeight;
    }
    return scrollHeight;
}

var getWindowHeight = function(){
    var windowHeight = 0;
    if(document.compatMode === "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }
    else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
