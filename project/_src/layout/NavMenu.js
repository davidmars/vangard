import BurgerIcon from "../molecules/burger-icon/BurgerIcon";

var EventEmitter = require('event-emitter-es6');

export default class NavMenu extends EventEmitter{
    constructor(){
        super();
        this.burgerBtn=new BurgerIcon($("[burger-icon]"));
        let me=this;
        this.$nav=$("#nav");
        $body.on("click","[data-nav-menu-toggle]",function(){
            me.toggle()
        })
    }
    open(){
        $body.addClass("nav-open");
        this.burgerBtn.close();
        this.emit("OPEN");
        //films.enabled=false;

        films.scroll.update();
        films.scroll.scrollTo(0,0,1000)
    }
    close(){
        $body.removeClass("nav-open");
        this.burgerBtn.menu();
        this.emit("CLOSE");
        films.scroll.update();
        //films.scroll.scrollTo(0,0,1000)
        //films.enabled=true;
    }
    toggle(){
        if($body.is(".nav-open")){
            this.close();
        }else{
            this.open();
        }
    }
}