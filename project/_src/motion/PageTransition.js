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
        let me=this;
        let $elements=
            this.$prevNext()
            .add(me.$traits())
            .add(me.$embeds())
            .add(me.$photos())
            .add(me.$top())
            .add(me.$titres())
            .add(me.$textes())
            .add(me.$filmItems())
            .add(me.$filmItemsSmall());
        return $elements;
    }

    $prevNext(){
        let $elements=$body.find("#main-content [data-js='PrevNext']");
        return $elements;
    }
    $traits(){
        let $elements=$body.find("#main-content hr");
        return $elements;
    }
    $embeds(){
        let $elements=$body.find("#main-content .embed-responsive");
        return $elements;
    }
    $photos(){
        let $elements=$body.find("#main-content .photo-item");
        return $elements;
    }
    $top(){
        let $elements=$body.find("#main-content .top");
        return $elements;
    }
    $titres(){
        let $elements=$body.find("#main-content h1")
                            .add("#main-content h2");
        return $elements;
    }
    $textes(){
        let $elements=$body.find("#main-content .text-rich");
        return $elements;
    }
    $filmItems(){
        let $elements=$body.find("#films .film span");
        return $elements;
    }
    $filmItemsSmall(){
        let $elements=$body.find("#films .film i");
        return $elements;
    }

    hide(cb){

        let me=this;
        films.disable()
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


        TweenMax.to(me.$textes(),1.5,{y:-50,opacity:0,ease: Power2.easeInOut})
        TweenMax.to(me.$prevNext(),1.5,{y:-80,opacity:0,ease: Power2.easeInOut})
        TweenMax.to(me.$titres(),1.5,{y:-60,opacity:0,ease: Power3.easeInOut})
        TweenMax.to(me.$embeds(),1.5,{y:-200,opacity:0,ease: Back.easeIn})
        TweenMax.to(me.$top(),1.8,{y:-120,opacity:0,ease: Back.easeIn})
        TweenMax.to(me.$traits(),1.5,{width:0,ease: Expo.easeOut})

        //TweenMax.to(me.$photos(),1.5,{y:-100,opacity:0,ease: Power4.easeInOut})
        me.$photos().each(function(){
            TweenMax.to($(this),1.5,{y:-50*Math.random()-50,opacity:0,ease: Power4.easeInOut})
        });

        //TweenMax.to(me.$filmItems(),1.5,{y:-30,opacity:0,ease: Power1.easeInOut})
        me.$filmItems().each(function(){
            //TweenMax.to($(this),Math.random()+0.5,{y:-50*Math.random()-50,opacity:0,ease: Back.easeIn})
            TweenMax.to($(this),0.5,{y:-500,ease: Power2.easeInOut})
        });
        me.$filmItemsSmall().each(function(){
            //TweenMax.to($(this),Math.random()+0.5,{y:-50*Math.random()-50,opacity:0,ease: Back.easeIn})
            TweenMax.to($(this),0.7,{y:-500,delay:0.4,ease:Power2.easeInOut})
        });

        setTimeout(function(){
            if(cb) {cb();}
        },1000)

        /*
        //timeline
        let tl=new TimelineMax();
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
        */
    }
    show(cb){
        let me=this;
        let $elements=this.$elements();
        TweenMax.set($elements, {clearProps: 'all'});

        TweenMax.from(me.$textes(),1.5,{y:50,opacity:0,ease: Power1.easeInOut})
        TweenMax.from(me.$prevNext(),1.5,{y:80,opacity:0,ease: Power2.easeInOut})
        TweenMax.from(me.$titres(),1.5,{y:60,opacity:0,ease: Power3.easeInOut})
        TweenMax.from(me.$embeds(),1.5,{y:200,opacity:0,ease: Back.easeOut})
        TweenMax.from(me.$top(),1.8,{y:120,opacity:0,ease: Expo.easeOut})
        TweenMax.from(me.$traits(),1.5,{width:0,ease: Expo.easeOut})

        //TweenMax.to(me.$photos(),1.5,{y:-100,opacity:0,ease: Power4.easeInOut})
        me.$photos().each(function(){
            TweenMax.from($(this),1.5,{y:50*Math.random()-50,opacity:0,ease: Power4.easeInOut})
        });

        //TweenMax.to(me.$filmItems(),1.5,{y:-30,opacity:0,ease: Power1.easeInOut})
        me.$filmItems().each(function(){
            //TweenMax.to($(this),Math.random()+0.5,{y:-50*Math.random()-50,opacity:0,ease: Back.easeIn})
            TweenMax.from($(this),0.5,{y:500,ease: Power2.easeInOut})
        });
        me.$filmItemsSmall().each(function(){
            //TweenMax.to($(this),Math.random()+0.5,{y:-50*Math.random()-50,opacity:0,ease: Back.easeIn})
            TweenMax.from($(this),0.7,{y:500,ease: Power2.easeInOut})
        });

        setTimeout(function(){
            if(cb) {cb();}
            films.enable();
            TweenMax.set($elements, {clearProps: 'all'});
        },2000)

        return;


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
                films.enable();
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