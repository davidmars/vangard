var NavMenu={
    $nav:$("#nav"),
    open:function(){
        $body.addClass("nav-open");
        //films.enabled=false;
    },
    close:function(){
        $body.removeClass("nav-open");
        //films.enabled=true;
    },
    toggle:function(){
        $body.toggleClass("nav-open");
        //films.enabled=!$body.hasClass("nav-open")
    },
    __init:function () {
        $body.on("click","[data-nav-menu-toggle]",function(){
            NavMenu.toggle()
        })
    }
};
window.NavMenu=NavMenu;