import Slick from "./organisms/Slick.js";
import OneByOne from "./films-list/OneByOne";
import FilmPreview from "./films-list/FilmPreview";
import NavMenu from "./layout/NavMenu";

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
        /**
         * La liste des films
         * @type {OneByOne}
         */
        this.filmsList=window.filmsList=new OneByOne($("#films"),1.5,false);
        this.filmsList.isModeHover=true;


        window.navMenu.on("OPEN",function(){
            //filmsList.speed=1.5;
            filmsList.lockCenter=false;
            filmsList.refresh();
        });
        window.navMenu.on("CLOSE",function(){
            filmsList.speed=1;
            filmsList.lockCenter=false;
            filmsList.refresh();
        });

        this.filmsList.$main.find(".film").each(function(){
            new FilmPreview($(this))
        });
        this.filmsList.on("ACTIVE",function($film){
            console.log("active")
            if($film){
                /**
                 * @type {FilmPreview}
                 */
                let o=$film.data("obj");
                o.playFirst();

            }

        });
        this.filmsList.on("INACTIVE",function($film){
            console.log("inactive")
            if($film) {
                /**
                 * @type {FilmPreview}
                 */
                let o=$film.data("obj");
                o.pauseAll();
                o.change();
            }
        });
        setInterval(function(){
            filmsList.refresh()
        },1000);
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
            $body.attr("data-page-transition-state","start");
            //stope en attendant que la transition soit finie
            PovHistory.readyToinject=false;
            //dit qu'on est prêt à afficher la page (s'assure qu'on reste au moins une seconde sur l'écran de transition)
            setTimeout(function(){
                PovHistory.readyToinject=true;
            },500);
            navMenu.close();
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
    onPageDone(){
        let me=this;
        $body.attr("data-page-transition-state","end");
        me.onDomChange();
        //scroll top
        $(window).scrollTop(0);
        Site.navActive();
        $body.attr("is-home",PovHistory.currentPageInfo.isHome);
        if(typeof gtag !== 'undefined' && LayoutVars.googleAnalyticsId){
            //hit google analytics
            gtag('config', LayoutVars.googleAnalyticsId, {'page_path': location.pathname});
        }
    }
}