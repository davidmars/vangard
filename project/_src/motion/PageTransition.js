import {TimelineMax} from "gsap";

export default class PageTransition{
    constructor(){
        this.$rect=$("#transition-rect");
        this.rectColor="#222222";
        this.transparent="rgba(0,0,0,0)";
        this.$films=$("#films");
        this.$page=$("#main-content");
        /*
        $body.on("mousedown","[page-transition-click]",function(){
            pageTransition.rectToElement($(this));
        });
        */
    }

    $elements(){
        let $elements=$body
            .find("#films .film")
            .add("#main-content .top")
            .add("#main-content h1")
            .add("#main-content h2")
            .add("#main-content .photo-item")
            .add("#main-content .text-rich")
            .add("#main-content hr")
            .add("#main-content .embed-responsive")
            .add("#main-content [data-js='PrevNext'] a")
            .add("#main-content [data-js='PrevNext'] svg")
        ;
        return $elements;
    }
    hide(cb){
        let tl=new TimelineMax();
        let me=this;
        films.enabled=false;
        let $elements=this.$elements();
        let $visibles=[];
        let $invisibles=[];
        $elements.each(function(){
            let $el=$(this);
                TweenMax.set($el, {overflow: 'hidden'});
                if(isVisible($(this)[0])){
                    $visibles.push($(this));
                } else{
                    $invisibles.push($(this))
                }
        });
        for(let $el of $invisibles){
            TweenMax.set($el, {visibility: 'hidden'});
        }
        for(let $el of $visibles){
            let t=2.5;
            //tl.to($el,t,{y:-300,opacity:0,scaleY:1.1,filter:"blur(8px)"},"-=2.0");
            tl.to($el,t,{y:-300,opacity:0,scaleY:1.1,ease: Power2.easeOut},"-=2.0");
        }
        tl.eventCallback("onComplete",
            function(){
                if(cb) {cb();}
            } ,[]
        );
    }
    show(cb){
        let tl=new TimelineMax();
        let me=this;
        let $elements=this.$elements();
        TweenMax.set($elements, {clearProps: 'all'});
        $elements.each(function(){
            let $el=$(this);
            let t=0;
            if(isVisible($el[0])){
                t=0.2;
            }
            tl.from($el,t,{y:30,opacity:0});
        });

        tl.eventCallback("onComplete",
            function(){
                if(cb) {cb();}
                films.enabled=true;
                TweenMax.set($elements, {clearProps: 'all'});
            } ,[]
        );

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