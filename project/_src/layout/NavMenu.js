var EventEmitter = require('event-emitter-es6');

export default class NavMenu extends EventEmitter{
    constructor(){
        super();
        let me=this;
        this.$nav=$("#nav");
        $body.on("click","[data-nav-menu-toggle]",function(){
            me.toggle()
        })
    }
    open(){
        $body.addClass("nav-open");
        this.emit("OPEN");
        //films.enabled=false;
    }
    close(){
        $body.removeClass("nav-open");
        this.emit("CLOSE");
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