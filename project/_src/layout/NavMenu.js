import BurgerIcon from "../molecules/burger-icon/BurgerIcon";
import {TweenMax} from "gsap";

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
    displayRight(show=true,direct=false){
        let t=0.5;
        if(direct){
            t=0;
        }
        if(show){
            this._burgerBtn.close();
            TweenMax.to(this.$right,t,{top:0,opacity:1})
        }else{
            this._burgerBtn.nothing();
            TweenMax.to(this.$right,t,{top:-200,opacity:0})
        }
    }
    open(){
        if(this.isOpen()){
            return;
        }
        let me=this;
        let $main=$("#main-content");
        this.displayRight(true);
        this.emit("OPEN");
        pageTransition.hidePage();

        setTimeout(function(){
            me.showElements();
            TweenMax.to($main,1,{height:0,ease: Power4.easeOut});
            $body.addClass("nav-open");
        },2000);



        films.goTop();
    }
    close(){
        if(!this.isOpen()){
            return;
        }
        let me=this;
        let $main=$("#main-content");
        this.hideElements();
        setTimeout(function(){
            pageTransition.showPage();
            TweenMax.set($main, {height:"auto",y:0});
            TweenMax.from($main,1, {height:0,y:STAGE.height,ease: Power4.easeIn});
            me.resetElements();
        },700);

        films.goTop();
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
        TweenMax.from(this._$els(),0.5,{y:50,opacity:0,ease: Power1.easeInOut});
    }
    hideElements(){
        TweenMax.to(this._$els(),0.5,{y:-50,opacity:0,ease: Power1.easeInOut});
    }
    resetElements(){
        TweenMax.set(this._$els(), {clearProps: 'all'});
    }

}
