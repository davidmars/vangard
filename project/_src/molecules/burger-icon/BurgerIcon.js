export default class BurgerIcon{
    constructor($el){
        this.$el=$el;
        let me=this;
        if(!$el || $el.length===0 ){
            alert("BurgerIcon pas bueno")
        }
        let svg=require("./burger.svg.html");
        let $svg=$(svg);
        $el.append($svg);


        this.h=$el.find(".haut")[0];
        this.m=$el.find(".milieu")[0];
        this.b=$el.find(".bas")[0];
        this.time=0.15;
        this.mouseIn=false;
        this.nothing();

        $el.on("mouseenter",function(){
            me.mouseenter();
        });
        $el.on("mouseleave",function(){
            me.mouseleave();
        });

    }
    kill(){
        TweenMax.killTweensOf(this.h);
        TweenMax.killTweensOf(this.m);
        TweenMax.killTweensOf(this.b);
        TweenMax.to(this.h, 0.1, {rotation:0,ease:Linear.easeNone});
        TweenMax.to(this.b, 0.1, {rotation:0,ease:Linear.easeNone});
        TweenMax.to(this.m, 0.1, {rotation:0,ease:Linear.easeNone});
    }
    nothing(){
        console.log("burger nothing");
        this.kill();
        this.state="nothing";
        let tl=new TimelineMax();
        this.smooth(true);
        tl.to(this.m, this.time*2, {attr:{x1:-30,y1:50,  x2:0,y2:50},                     ease:Back.easeIn});
        tl.to(this.h, this.time, {attr:{x1:66,y1:33,  x2:66,y2:33},                     ease:Power4.easeOut});
        tl.to(this.b, this.time, {attr:{x1:66,y1:66,  x2:66,y2:66},                     ease:Power4.easeOut});
    }
    close(){
        console.log("burger close");
        this.kill();
        this.state="close";
        let tl=new TimelineMax();
        this.smooth(true);
        if(this.mouseIn){
            tl.to(this.h, 0.1, {attr:{x1:33,y1:33,  x2:66,y2:33},                     ease: Elastic.easeOut.config(1, 0.3)});
            tl.to(this.b, 0.1, {attr:{x1:33,y1:66,  x2:66+5,y2:66},                     ease: Elastic.easeOut.config(1, 0.3)});
            tl.to(this.m, 0.1, {attr:{x1:33,y1:50,  x2:66+5,y2:50},                     ease: Elastic.easeOut.config(1, 0.3)});
        }
        tl.to(this.m, this.time*2, {attr:{x1:-30,y1:50,  x2:0,y2:50},                     ease:Back.easeIn});
        tl.to(this.h, this.time, {attr:{x1:66,y1:33,  x2:66,y2:33},                     ease:Power4.easeOut});
        tl.to(this.b, this.time, {attr:{x1:66,y1:66,  x2:66,y2:66},                     ease:Power4.easeOut});
        tl.to(this.h, this.time, {attr:{x1:33,y1:66,  x2:66,y2:33},                     ease:Power4.easeOut});
        tl.to(this.b, this.time, {attr:{x1:33,y1:33,  x2:66,y2:66},                     ease:Power4.easeOut});
    }
    menu(){
        console.log("burger menu");
        this.kill();
        let tl=new TimelineMax();
        this.state="menu";
        this.smooth(false);
        tl.to(this.h, this.time, {attr:{x1:33,y1:33,  x2:66,y2:33},                     ease:Power4.easeOut});
        tl.to(this.b, this.time, {attr:{x1:33,y1:66,  x2:66,y2:66},                     ease:Power4.easeOut});
        tl.to(this.m, this.time*2, {attr:{x1:33,y1:50,  x2:66,y2:50},                     ease:Bounce.easeOut});
    }
    /*
    arrow(){
        this.kill();
        let tl=new TimelineMax();
        tl.to(this.m, this.time*0.2, {attr:{x1:0,y1:0,  x2:0,y2:0},                     ease:Power4.easeOut});


        tl.to(this.h, this.time*0.2, {attr:{x1:33+20+10,y1:66+20,  x2:66+20,y2:66+20},                     ease:Power4.easeOut});
        tl.to(this.b, this.time*0.2, {attr:{x1:66+20,y1:33+20+10,  x2:66+20,y2:66+20},                     ease:Power4.easeOut});
        tl.to(this.m, this.time*0.2, {attr:{x1:33+20,y1:33+20,  x2:66+20,y2:66+20},                     ease:Power4.easeOut});

    }
    */
    mouseleave(){
        console.log("burger mouse leave");
        this.mouseIn=false;
        let me=this;
        me.kill();
        if(this.state==="menu"){
            TweenMax.to(this.h, 0.5, {attr:{x1:33,y1:33,  x2:66,y2:33},                     ease: Elastic.easeOut.config(1, 0.3)});
            TweenMax.to(this.b, 0.5, {attr:{x1:33,y1:66,  x2:66,y2:66},                     ease: Elastic.easeOut.config(1, 0.3)});
            TweenMax.to(this.m, 0.5, {attr:{x1:33,y1:50,  x2:66,y2:50},                     ease: Elastic.easeOut.config(1, 0.3),onComplete:function(){ me.smooth(false)}});
        }else if(this.state==="close"){
            me.smooth(true);
            TweenMax.to(this.m, this.time, {attr:{x1:-30,y1:50,  x2:0,y2:50},                             ease:Elastic.easeOut.config(1, 0.3)});
            TweenMax.to(this.h, this.time*3, {attr:{x1:33,y1:66,  x2:66,y2:33},                     ease:Elastic.easeOut.config(1, 0.1)});
            TweenMax.to(this.b, this.time*5, {attr:{x1:33,y1:33,  x2:66,y2:66},                     ease:Elastic.easeOut.config(1, 0.1)});
        }else if(this.state==="nothing"){
            me.smooth(true);
            me.nothing();
        }
        TweenMax.to(this.h, 0, {css:{"stroke-width":1}});
        TweenMax.to(this.b, 0, {css:{"stroke-width":1}});
        TweenMax.to(this.m, 0, {css:{"stroke-width":1}});
    }

    mouseenter(){
        console.log("burger mouse enter");
        let me=this;
        this.kill();
        this.mouseIn=true;
        this.smooth(true);
        TweenMax.to(this.h, 0, {css:{"stroke-width":3}});
        TweenMax.to(this.b, 0, {css:{"stroke-width":3}});
        TweenMax.to(this.m, 0, {css:{"stroke-width":3}});
        if(this.state==="menu"){
            TweenMax.to(this.h, 0.5, {attr:{x1:33-5,y1:33-5,  x2:66+5,y2:33+5},                     ease: Elastic.easeOut.config(1, 0.3)});
            TweenMax.to(this.b, 0.5, {attr:{x1:33-5,y1:66-5,  x2:66+5,y2:66+5},                     ease: Elastic.easeOut.config(1, 0.3)});
            TweenMax.to(this.m, 0.5, {attr:{x1:33-5,y1:50-5,  x2:66+5,y2:50+5},                     ease: Elastic.easeOut.config(1, 0.3)});
        }else if(this.state==="close"){
            TweenMax.to(this.m, this.time, {attr:{x1:-30,y1:50,  x2:0,y2:50},                             ease:Elastic.easeOut.config(1, 0.3)});
            TweenMax.to(this.h, this.time, {attr:{x1:33+5,y1:66-5,  x2:66-5,y2:33+5},                     ease:Elastic.easeOut.config(1, 0.3)});
            TweenMax.to(this.b, this.time, {attr:{x1:33+5,y1:33+5,  x2:66-5,y2:66-5},                     ease:Elastic.easeOut.config(1, 0.3)});
        }else if(this.state==="nothing"){
            me.nothing();
        }

    }
    smooth(smooth){
        let prop="crispEdges";
        if(smooth){
            prop="geometricprecision"
        }
        TweenMax.to(this.h, 0, {css:{"shape-rendering":prop, transformOrigin:"50% 50%"}});
        TweenMax.to(this.b, 0, {css:{"shape-rendering":prop, transformOrigin:"50% 50%"}});
        TweenMax.to(this.m, 0, {css:{"shape-rendering":prop, transformOrigin:"50% 50%"}});
    }
}