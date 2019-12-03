import BurgerIcon from "../molecules/burger-icon/BurgerIcon";
import {TweenMax} from "gsap";
import PageTransition from "../motion/PageTransition";

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
    open(){
        if(this.isOpen()){
            return;
        }
        let me=this;
        console.log("open");
        $body.addClass("nav-open");
        if($body.attr("is-home")==="false"){
            films.disable();
            TweenMax.to(window, 0.5, {scrollTo: 0, ease: Power3.easeIn});

            pageTransition.showFilms();
        }
        setTimeout(function(){
            films.enable();
            films.recentre();
            me.displayRight(true); //la croix
            me.showElements();

        },500);
    }
    close(){
        if(!this.isOpen()){
            return;
        }
        let me=this;
        this.hideElements();
        setTimeout(function(){
            //pageTransition.showPage();
            //TweenMax.set($main, {height:"auto",y:0});
            //TweenMax.from($main,1, {height:0,y:STAGE.height,ease: Power4.easeIn});
            //films.recentre();
            if($body.attr("is-home")==="false"){
                //TweenMax.to(window, 0.5, {scrollTo:0,ease:Power3.easeIn});
            }
        },700);

        //films.modeNav(false);
        $body.removeClass("nav-open");
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
        $("#nav-content").addClass("visible");
        me.resetElements();
        this._$els().each(function(){
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

    }
    hideElements(){
        let me=this;
        this._$els().each(function(){
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
    }
    resetElements(){
        TweenMax.set(this._$els(), {clearProps: 'all'});
    }

}
