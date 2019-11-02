import BurgerIcon from "../molecules/burger-icon/BurgerIcon";

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
        $body.addClass("nav-open");
        this.burgerBtn.close();
        this.emit("OPEN");
        films.goTop();
        films.modeNav(true);
        //films.enabled=false;

        //films.scroll.update();
        //films.scroll.scrollTo(0,0,1000)
    }
    close(){
        films.goTop();
        films.modeNav(false);
        $body.removeClass("nav-open");
        if(PovHistory.currentPageInfo.isHome){
            this.burgerBtn.nothing();
        }else{
            this.burgerBtn.menu();
        }
        this.emit("CLOSE");
        //films.scroll.update();
        //films.scroll.scrollTo(0,0,1000)
        //films.enabled=true;
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
}