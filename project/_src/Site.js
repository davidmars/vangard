import NavMenu from "./layout/NavMenu";
import PrevNext from "./components/prev-next/PrevNext";
import TextMotion from "./motion/TextMotion";
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
        me.resizeStage();
        me.onDomChange();
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

        //window.textMotion=new TextMotion();
        //textMotion.apparitions();

        this.$mainContent=$("#main-content");
        Site.navActive();
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

        //ferme le menu quand on change d'url
        $body.on(EVENTS.HISTORY_CHANGE_URL,function(){
            me.onPageQuit();
        });
        //changement d'url et HTML injecté
        $body.on(EVENTS.HISTORY_CHANGE_URL_LOADED_INJECTED,function(){
            me.onPageDone();
        });

        STAGE.on(EVENTS.RESIZE,function(){
            me.resizeStage();
        });
        $body.on(Pov.events.DOM_CHANGE,function(){
            me.onDomChange();
        });
    }

    goHome(){
        PovHistory.goUrl(LayoutVars.homeUrl);
    }

    /**
     * Selectionne / déselectionne l'item de nav de la page en cours
     */
    static navActive(){
        $("[data-href-uid]").removeClass("active");
        $("[data-href-uid='"+PovHistory.currentPageInfo.uid+"']").addClass("active");
    }

    /**
     * Adapte des élements à l'écran
     */
    resizeStage(){
        //ou pas :)
    }

    /**
     * Initialisations d'objets dom
     */
    onDomChange(){
        //ou pas :)
    }
    onPageQuit(){
        $body.attr("data-page-transition-state","start");
        PovHistory.readyToinject=false;
        //dit qu'on est prêt à afficher la page (s'assure qu'on reste au moins une seconde sur l'écran de transition)
        $body.attr("is-home",false);
        pageTransition.hide(function(){
            setTimeout(function(){

                navMenu.close();
                window.scrollTo(0,0);
                PovHistory.readyToinject=true;
            },0)

        });
    }
    onPageDone(){
        let me=this;
        $body.attr("data-page-transition-state","end");
        navMenu.close();
        pageTransition.show();
        me.onDomChange();
        me.displayNavAccordingPage();
        //Site.navActive();
        $body.attr("is-home",PovHistory.currentPageInfo.isHome);
        if(typeof gtag !== 'undefined' && LayoutVars.googleAnalyticsId){
            //hit google analytics
            gtag('config', LayoutVars.googleAnalyticsId, {'page_path': location.pathname});
        }
        PrevNext.initFromDom();
    }

    displayNavAccordingPage(){
        navMenu.displayRight(! PovHistory.currentPageInfo.isHome);
    }

}