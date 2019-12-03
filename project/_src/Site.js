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
        $body.on(EVENTS.HISTORY_CHANGE_URL_LOADED,function(){
            //console.log("loaded",new Date());
        });
        //changement d'url et HTML injecté
        $body.on(EVENTS.HISTORY_CHANGE_URL_LOADED_INJECTED,function(){
            me.onPageDone();
        });


        $body.on(Pov.events.DOM_CHANGE,function(){
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

    onPageQuit(hidePage=true){
        console.log("onPageQuit",hidePage);
        PovHistory.readyToinject=false;
        return;
        let doIt=function(){
            $body.attr("is-home",false);
            navMenu.close();
            window.scrollTo(0,0);
            PovHistory.readyToinject=true;
        }
        //dit qu'on est prêt à afficher la page (s'assure qu'on reste au moins une seconde sur l'écran de transition)
        //
        if(!hidePage){
            doIt();
        }else{
            pageTransition.hide(function(){
                doIt();
            });
        }

    }
    onPageDone(){
        console.log("onPageDone",new Date());
        //
        let me=this;
        //navMenu.close();
        pageTransition.show();
        me.displayNavAccordingPage();
        //Site.navActive();
        $body.attr("is-home",PovHistory.currentPageInfo.isHome);
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

}