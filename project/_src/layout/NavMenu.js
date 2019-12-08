import BurgerIcon from "../molecules/burger-icon/BurgerIcon";
import {TweenMax} from "gsap";
import VideoWrap from "../components/VideoWrap";
window.lottie=require("lottie-web");


var EventEmitter = require('event-emitter-es6');

export default class NavMenu extends EventEmitter{
    constructor(){
        super();
        let me=this;
        this.$nav=$("#nav");
        this.$right=this.$nav.find(".right");
        /**
         *
         * @type {BurgerIcon}
         * @private
         */
        this._burgerBtn=new BurgerIcon($("[burger-icon]"));
        //this._burgerBtn.nothing(true);
        this.displayRight(false,true);

        this.logo=lottie.loadAnimation({
            container: $("[hello-logo]")[0], // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: LayoutVars.helloLogoUrl // the path to the animation json
        });


        $body.on("click","[data-nav-menu-toggle]",function(e){
            e.preventDefault();
            me.toggle()
        });
        $body.on("click","[burger-icon]",function(e){
            e.preventDefault();
            if(PovHistory.currentPageInfo.isHome){
                me.close();
            }else{
                if(me.isOpen()){
                    me.close();
                }else{
                    Site.goHome();
                    pageTransition.hide_FILM_HOME();
                }
            }
        });

    }

    /**
     * Affiche ou non la croix
     * @param show
     * @param direct
     */
    displayRight(show=true,direct=false){
        let t=0.5;
        if(direct){
            t=0;
        }
        if(show){
            this._burgerBtn.close();
            if(!isWysiwyg) {
                TweenMax.to(this.$right, t, {top: 0, opacity: 1})
            }
        }else{
            this._burgerBtn.nothing();
            if(!isWysiwyg) {
                TweenMax.to(this.$right, t, {top: -200, opacity: 0})
            }
        }
    }

    showLogo(show,cb){
        if(show){
            console.error("show logo")
            this.logo.setSpeed(2);
            this.logo.setDirection(1);
            this.logo.play();
        }else{
            console.error("hide logo")
            this.logo.setSpeed(4);
            this.logo.setDirection(-1);
            this.logo.play();
        }
        this.logo.removeEventListener("complete");
        this.logo.addEventListener('complete', () => {
            console.error('complete');
            if(cb){
                cb();
            }
        });
    }

    open(){
        if(this.isOpen()){
            return;
        }
        let me=this;
        console.log("open");
        VideoWrap.pauseAll();
        this.saveScroll=window.scrollY;
        if(PovHistory.currentPageInfo.isHome){
            $body.addClass("nav-open");
            films.scrollKeepActiveOneLoop();
        }else{
            pageTransition.hidePageZoom(function(){
                $body.addClass("nav-open");
                pageTransition._resetTransiZoom(true,false);
                TweenMax.to(window, 0, {scrollTo:0});
                pageTransition.setPageVisible(false);
                pageTransition.showFilmsZoom(function(){
                    pageTransition._resetTransiZoom(true,true);
                });
            })

        }


        if($body.attr("is-home")==="false"){
            films.disable();
            //TweenMax.to(window, 0.5, {scrollTo: 0, ease: Power3.easeIn});
        }

        setTimeout(function(){
            films.enable();
            films.recentre();
            me.displayRight(true); //la croix
            me.showElements();

        },500);
    }
    close(cb){
        if(!this.isOpen()){
            return;
        }
        let me=this;
        this.hideElements();
        if(PovHistory.currentPageInfo.isHome){
            films.scrollKeepActiveOneLoop();
            $body.removeClass("nav-open");
        }else{
            pageTransition.hideFilmsZoom(function(){
                $body.removeClass("nav-open");
                pageTransition._resetTransiZoom(false,true);
                pageTransition.setPageVisible(true);
                TweenMax.to(window, 0, {scrollTo:me.saveScroll,ease:Power3.easeOut});
                pageTransition.showPageZoom(function(){
                    pageTransition._resetTransiZoom(true,true);
                });
            })

        }

        this.emit("CLOSE");
    }
    toggle(){
        if(this.isOpen()){
            this.close();
        }else{
            this.open();
        }
    }
    isOpen(){
        return $body.is(".nav-open");
    }

    _$els(){
        return $("#nav-content .text-rich").find("h2,p,h5");
    }
    showElements(){
        let me=this;
        me.showLogo(true,function(){
            $("#nav-content").addClass("visible");
            me.resetElements();
            me._$els().each(function(){
                let $el=$(this);
                let t=0.5;
                let y=50;
                switch (true) {
                    case $el.is("h2"):
                        t=0.5;
                        y=50;
                        break;

                    case $el.is("p"):
                    case $el.is("h5"):
                        t=1.5;
                        y=10;
                        break;

                }
                if(!isWysiwyg) {
                    TweenMax.fromTo($(this), t,
                        {y: y, opacity: 0},
                        {y: 0, opacity: 1, ease: Power1.easeInOut}
                    );
                }
            })
        });


    }
    hideElements(){
        let me=this;
        me.showLogo(false,function(){
            me._$els().each(function(){
                let $el=$(this);
                let t=0.5;
                let x=50;
                switch (true) {
                    case $el.is("h2"):
                        t=0.5;
                        x=50;
                        break;

                    case $el.is("p"):
                    case $el.is("h5"):
                        t=0.75;
                        x=60;
                        break;

                }

                if($el.closest(".left").length){
                    x=-x;
                }
                if(!isWysiwyg){
                    TweenMax.fromTo($(this),t,
                        {x:0,opacity:1},
                        {x:x,opacity:0,ease: Power1.easeInOut}
                    );
                }

            });
            setTimeout(function(){
                $("#nav-content").removeClass("visible");
                me.resetElements();
            },1000);
        });

    }
    resetElements(){
        TweenMax.set(this._$els(), {clearProps: 'all'});
    }

}
