import {TimelineMax} from "gsap";

export default class PageTransition{
    constructor(){
        this.$rect=$("#transition-rect");
        this.rectColor="#222222";
        this.transparent="rgba(0,0,0,0)";
        /*
        $body.on("mousedown","[page-transition-click]",function(){
            pageTransition.rectToElement($(this));
        });
        */
    }

    rectToElement($el,cb){
        if(cb){
            tl.eventCallback("onComplete", cb, []);
        }
        let tl=new TimelineMax();
        let me=this;
        let w=$el.width();
        let h=$el.height();
        let r=$el.offset();
        let left=r.left;
        let top=r.top;
        tl.to(me.$rect,0,{width:w,left:left,opacity:1});
        tl.to(me.$rect,0,{height:h,top:top});
        tl.to(me.$rect,0,{backgroundColor:me.transparent});
        tl.to(me.$rect,0.4,{opacity:1,backgroundColor:me.rectColor});
    }

    rectCenter(cb){
        let me=this;
        let tl=new TimelineMax();
        if(cb){
            tl.eventCallback("onComplete", cb, []);
        }
        let w=STAGE.width*0.5;
        let h=w/16*9;
        let left=STAGE.width/2-w/2;
        let top=STAGE.height/2-h/2;
        tl.to(me.$rect,0.2,{width:w,left:left,opacity:1});
        tl.to(me.$rect,0.2,{height:h,top:top});
        tl.to(me.$rect,0.2,{backgroundColor:me.rectColor});
    }

    homeShow(cb){
        let me = this;
        let tl=new TimelineMax();
        if(cb){
            tl.eventCallback("onComplete", cb, []);
        }
        let w=STAGE.width;
        let h=STAGE.height;
        let left=0;
        let top=0;
        tl.to(me.$rect,0.2,{width:w,left:left,height:h,top:top,opacity:0.1});
    }



    filmShow(cb){
        let me = this;
        let tl=new TimelineMax();
        if(cb){
            tl.eventCallback("onComplete", cb, []);
        }
        let $page=$(".film-page");
        let $afterVideo=$page.find(".js-after-video");
        let $els=$afterVideo.find("h1,h2,hr");
        let $video=$page.find(".js-video");
        let $videoWrap=$page.find(".js-video-wrap");
        let videoRect=$video.offset();
        console.log($video.attr("src"));
        setTimeout(function(){
            console.log($video.offset(),$video.width());
        },100)
        console.log(videoRect,$video.width());
        //tl.set({}, {}, 2);

        //video cachée par le masque mais avec les bonnes prop
        tl.to($videoWrap,0,{backgroundColor:me.rectColor,opacity:0});
        tl.to($video,0,{opacity:0});

        //rectangle
        tl.to(me.$rect,0.2,{width:$video.width(),left:videoRect.left});
        tl.to(me.$rect,0.2,{height:$video.height(),top:videoRect.top});

        //petits éléments
        $els.each(function(){
            let $el=$(this);

            switch (true) {
                case $el.is("hr"):
                    tl.from($el,0.2,{width:0});
                    break;

                case $el.is("h1,h2"):
                    tl.from($el,0.2,{opacity:0,y:20});
                    break;
            }
        });
        //affiche la vidéo
        tl.to($videoWrap,0,{opacity:1});
        tl.to(me.$rect,0.2,{opacity:0,backgroundColor:me.transparent});
        tl.to($video,0.4,{opacity:1});
        tl.to($videoWrap,3,{backgroundColor:me.transparent});


    }


}