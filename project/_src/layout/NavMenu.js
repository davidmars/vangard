import BurgerIcon from "../molecules/burger-icon/BurgerIcon";
import {TweenMax} from "gsap";

var EventEmitter = require('event-emitter-es6');

export default class NavMenu extends EventEmitter{
    constructor(){
        super();
        this.burgerBtn=new BurgerIcon($("[burger-icon]"));
        let me=this;
        this.$nav=$("#nav");
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
        })
    }
    open(){

        if(this.isOpen()){
            return;
        }
        let me=this;
        let $main=$("#main-content");

        this.burgerBtn.close();
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
            TweenMax.from($main,1, {height:0,y:STAGE.height,ease: Power4.easeIn})
            me.resetElements();
        },700)

        films.goTop();
        //films.modeNav(false);
        $body.removeClass("nav-open");
        //if(PovHistory.currentPageInfo.isHome){
            this.burgerBtn.nothing();
        //}else{
            //this.burgerBtn.menu();
        //}
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
