import NavMenu from "./layout/NavMenu";
import PrevNext from "./components/prev-next/PrevNext";
//import Films from "./films-list/Films";
import Films from "./films-list/Films2";
import PageTransition from "./motion/PageTransition";
require("./utils");

export default class Site{
    constructor() {
        /**
         *
         * @type {Site}
         */
        let me = this;
        me._initListeners();
        //---------------------go------------------------------------------
        window.isWysiwyg=LayoutVars.isWysiwyg;
        window.navMenu=new NavMenu();
        navMenu.on("OPEN",function(){
            navMenu.displayRight(true);
        });
        navMenu.on("CLOSE",function(){
            me.displayNavAccordingPage();
        });
        window.films=new Films($("#films"));
        window.pageTransition=new PageTransition();
        me.onPageDone();

    }





    /**
     *
     * @private
     */
    _initListeners() {

        let me=this;
        require("./components/data-zoom-img");
        require("./components/data-is-lang");

        //gestion du back bouton...
        history.scrollRestoration="manual"; //enpeche de scroller automatiquement
        $body.on(EVENTS.HISTORY_CHANGE_URL_BACK,function(){
            let fn="hidePageZoom";
            if(PovHistory.currentPageInfo.isHome){
                fn="hideFilmsZoom";
            }
           pageTransition[fn](
               function(){
                   window.scrollTo(0,0);
                   PovHistory.readyToinject=true;
               }
           );
        });
        $body.on(EVENTS.HISTORY_CHANGE_URL,function(){
            console.log("change url");
            if(PovHistory.readyToinject!==false){
                console.error("PovHistory.readyToinject!==false");
            }
            PovHistory.readyToinject=false;
        });
        $body.on(EVENTS.HISTORY_CHANGE_URL_LOADED,function(){
            console.log("loaded");
        });
        //changement d'url et HTML injecté
        $body.on(EVENTS.HISTORY_CHANGE_URL_LOADED_INJECTED,function(){
            console.log("will call onPageDone");
            me.onPageDone();
        });
    }

    onPageDone(){
        console.log("onPageDone",new Date());
        PovHistory.readyToinject=false;
        //
        let me=this;
        //navMenu.close();
        pageTransition.show();
        me.displayNavAccordingPage();
        //Site.navActive();
        pageTransition.setIsHome(PovHistory.currentPageInfo.isHome);
        if(typeof gtag !== 'undefined' && LayoutVars.googleAnalyticsId){
            //hit google analytics
            gtag('config', LayoutVars.googleAnalyticsId, {'page_path': location.pathname});
        }
        PrevNext.initFromDom();
    }

    /**
     * Affiche ou pas la croix et le menu de langue selon la page ou on est
     */
    displayNavAccordingPage(){
        navMenu.displayRight(! PovHistory.currentPageInfo.isHome);
    }

    goHome(){
        PovHistory.goUrl(LayoutVars.homeUrl);
    }

}