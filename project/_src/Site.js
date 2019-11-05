import Slick from "./organisms/Slick.js";
import OneByOne from "./films-list/OneByOne";
import FilmPreview from "./films-list/FilmPreview";
import NavMenu from "./layout/NavMenu";
import PrevNext from "./components/prev-next/PrevNext";
import TextMotion from "./motion/TextMotion";
import Films from "./films-list/Films";
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
        window.navMenu=new NavMenu();
        window.textMotion=new TextMotion();
        window.films=new Films($("#films"));
        window.pageTransition=new PageTransition();
        textMotion.apparitions();


        this.$mainContent=$("#main-content");

        /*
        setInterval(function(){
            $("#films").find("[tt]").each(function(){
                let r=[];
                while (r.length<8){
                    r.push(randChar())
                }
               $(this).text(r.join(""))
            });
        },20)
        */

        /**
         * La liste des films
         * @type {OneByOne}
         */
        /*
        this.filmsList=window.filmsList=new OneByOne($("#films"),1.5,true);
        this.filmsList.isModeHover=true;


        window.navMenu.on("OPEN",function(){
            //filmsList.speed=1.5;
            filmsList.lockCenter=true;
            filmsList.refresh();
        });
        window.navMenu.on("CLOSE",function(){

            filmsList.speed=1;
            filmsList.lockCenter=true;
            filmsList.refresh();

        });

        this.filmsList.$main.find(".film").each(function(){
            new FilmPreview($(this))
        });


        this.filmsList.on("ACTIVE",function($film){

            console.log("active")
            if($film){
                let o=$film.data("obj");
                o.playFirst();

            }

        });
        this.filmsList.on("INACTIVE",function($film){
            console.log("inactive")
            if($film) {
                let o=$film.data("obj");
                o.pauseAll();
                o.change();
            }
        });
        setInterval(function(){
            filmsList.refresh()
        },1000);
         */
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
        require("./organisms/data-cards-container.js");

        Slick.initFromDom();
        //require("./blocks/FormContact");
        //FormContact.initFromDom();

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
        //this.$mainContent.empty();
        //$body.attr("is-home","true");
        PovHistory.goToHomePage();
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
        Slick       .initFromDom();
        //OneByOne    .initFromDom();
        //ou pas :)
    }
    onPageQuit(){
        $body.attr("data-page-transition-state","start");
        PovHistory.readyToinject=false;
        navMenu.close();
        //dit qu'on est prêt à afficher la page (s'assure qu'on reste au moins une seconde sur l'écran de transition)
        pageTransition.hide(function(){
            $(window).scrollTop(0);
            PovHistory.readyToinject=true;
        })
    }
    onPageDone(){
        let me=this;
        $body.attr("data-page-transition-state","end");
        me.onDomChange();
        //scroll top
        $(window).scrollTop(0);
        pageTransition.show(function(){});
        /*
        if(PovHistory.currentPageInfo.isHome){
            navMenu.burgerBtn.nothing();
        }else{
            navMenu.burgerBtn.menu();
        }
         */




        //Site.navActive();
        $body.attr("is-home",PovHistory.currentPageInfo.isHome);
        if(typeof gtag !== 'undefined' && LayoutVars.googleAnalyticsId){
            //hit google analytics
            gtag('config', LayoutVars.googleAnalyticsId, {'page_path': location.pathname});
        }
        PrevNext.initFromDom();
    }
}