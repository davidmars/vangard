import {Power3} from "gsap";
import TransiFilm from "./TransiFilm";

export default class PageTransition {
    constructor() {
        let me = this;
        this.$page = $("#main");
        this.$films = $("#films");
        this.$filmsContainer = this.$films.find(">.list");
        this.$rect = $("#transition-rect");
        this.rectColor = "#222222";
        this.transparent = "rgba(0,0,0,0)";
        this.runningTransition=null;
        this.TRANSI_FILM_HOME="TRANSI_FILM_HOME";
        this.TRANSI_FILM_FILM="TRANSI_FILM_FILM";
        this.TRANSI_HOME_FILM="TRANSI_HOME_FILM";

        this.$blockScroll=$("<div id='block-scroll'></div>");
        $body.append(this.$blockScroll);


        //fake film typo
        this.transiFilm=new TransiFilm();
        //out only
        $body.on("mousedown",`[page-transition-click]`,function(){
            let transi=$(this).attr("page-transition-click");
            switch (transi) {
                case me.TRANSI_FILM_FILM:
                    me.hide_FILM_FILM();
                    break;
                case me.TRANSI_FILM_HOME:
                    break;
                case me.TRANSI_HOME_FILM:
                    break;
            }
        });

        window.addEventListener('resize', function () {
            me.transiFilm.setAutoSize(true);
        });

    }

    /**
     * Remet le bloqueur de scroll en haut
     */
    resetBlockScroll(){
        console.warn("resetBlockScroll");
        this.$blockScroll.css("top",""+Math.floor(STAGE.height/2)+"px");
    }

    /**
     * Positionne le bloqueur de scroll très bas de manière à laisser de l'amplitude aux animations
     */
    fatBlockScroll(){
        console.warn("fatBlockScroll")
        this.$blockScroll.css("top",""+Math.floor(STAGE.height*30)+"px");
    }

    /**
     * Scrolle à 0 direct
     */
    scrollTop(){
        this.resetBlockScroll();
        window.scrollTo(0,0);
    }

    /**
     * Dit au body si on est sur la home ou pas
     * @param is
     */
    setIsHome(is){
        console.log("is-home",is);
        $body.attr("is-home",is);
    }

    hide_FILM_FILM(){
        let me=this;
        me._resetTransiZoom();
        me.runningTransition=me.TRANSI_FILM_FILM;
        me.hidePageZoom(function(){
            me.scrollTop();
            PovHistory.readyToinject=true; //puis appellera show()
        });
    }
    show_FILM_FILM(){
        let me=this;
        me.transiFilm
            .setContentByUid(PovHistory.currentPageInfo.uid)
            .setAsPoster(true)
            .setAutoSize(true);

        me.showPageZoom(
            function(){
                me.runningTransition=null;
            }
        );
    }

    hide_FILM_HOME(){
        let me=this;
        me._resetTransiZoom();
        me.runningTransition=me.TRANSI_FILM_HOME;
        let filmToSelectUid=PovHistory.currentPageInfo.uid;
        this.hidePageZoom(function(){
            me.setIsHome(true);
            films.disable();
            films.scrollToFilmUid(filmToSelectUid);
            PovHistory.readyToinject=true;
        })

    }
    show_FILM_HOME(){
        let me=this;
        me.showFilmsZoom(function(){
            films.enable();
            films.isMoving=true; //pour relancer la lecture comme si on avait positionné le truc manuellement
            films.recentre();
            me.$films.attr("transi", "");
            me.$page.attr("transi", "");
            me.runningTransition=null;
        });
    }
    show_HOME_FILM(){
        let me=this;
        this.transiFilm.setAsPoster(true);

        //fait disparaitre le typo de transition
        me.showPageNormal(

            function(){
                if(Site.isMobileNavBreakPoint()){
                    me.transiFilm.setAutoSize(true);
                }
                me.runningTransition=null;
            }
        );
    }

    show(){
        console.log("show",this.runningTransition);

        let me=this;
        switch (this.runningTransition) {
            case me.TRANSI_FILM_FILM:
                if(PovHistory.currentPageInfo.recordType!=="film"){
                    console.warn("incohérence show_FILM_FILM",PovHistory.currentPageInfo.recordType)
                }
                me.show_FILM_FILM();
                break;
            case me.TRANSI_FILM_HOME:
                if(PovHistory.currentPageInfo.recordType==="film"){
                    console.warn("incohérence TRANSI_FILM_HOME",PovHistory.currentPageInfo.recordType)
                }
                me.show_FILM_HOME();
                break;
            case me.TRANSI_HOME_FILM:
                if(PovHistory.currentPageInfo.recordType!=="film"){
                    console.warn("incohérence show_HOME_FILM",PovHistory.currentPageInfo.recordType)
                }
                me.show_HOME_FILM();
                break;
            default:
                console.log("show...")
                switch(PovHistory.currentPageInfo.recordType){
                    case 'film':
                        console.log("show...film")
                        me.show_FILM_FILM();
                        me.transiFilm
                            .setContentByUid(PovHistory.currentPageInfo.uid)
                            .setAutoSize(true)
                            .setAsPoster(true);
                        return;
                        break;

                    case 'page':
                        if(PovHistory.currentPageInfo.isHome){
                            console.log("show...home")
                            me.show_FILM_HOME();
                            return;
                        }else{
                            console.log("show...page")
                            me.showPageNormal();
                            me.transiFilm
                                .setContentByUid(PovHistory.currentPageInfo.uid)
                                .setAutoSize(true)
                                .setAsPoster(true);
                            return;
                            break;
                        }


                    default:
                        console.error("show...???")

                }

        }
    }

    isTransi(transiName){
        return this.runningTransition===transiName;
    }




    //--------------------------------------------------------------------


    showPageNormal(cb) {
        console.log("show page normal");
        //TweenMax.fromTo($(".intro-fade"),0.5,{opacity:0},{opacity:1})
        TweenMax.staggerFrom(".intro-fade", 0.5,
            {opacity:0,y:30,onComplete:function(){
                TweenMax.set(".intro-fade",{clearProps:"all"});
                }},
            0.1);

        if (cb) {cb();}
    }

    /**
     * Calle le transform origin de films et page par rapport au viewport pour avoir des zooms centrés
     * @private
     */
    _setOriginCenter() {

        let x, y;
        x=STAGE.width / 2;

        y=ratio(
            STAGE.scrollY,
            document.documentElement.scrollHeight-STAGE.height,
            STAGE.scrollY+STAGE.height/2,
            0,
            STAGE.height/2
        );
        //y=STAGE.scrollY+STAGE.height/2; //logiquement ça devrait être ça tout le temps, mais....
        x=Math.floor(x);
        y=Math.floor(y);
        console.warn("_setOriginCenter")
        this.$blockScroll.css("top",""+(STAGE.scrollY+STAGE.height/2)+"px");
        this.$blockScroll.css("left",""+x+"px");
        let o = ` ${x}px ${y}px `;
        this.$page.css("transform-origin", o);
        this.$films.css("transform-origin", o);

        console.log(o);
    }

    /**
     * Zoom/fade in et out
     * @param $el
     * @param inOrOut
     * @param cb
     * @private
     */
    _transiZoom($el,inOrOut,cb){
        let me = this;
        me._setOriginCenter();
        $el.removeAttr("transi");
        $el.attr("transi", inOrOut);
        setTimeout(function () {
                //$el.attr("transi", "");
                if (cb) {cb();}},
            1 * 600
        );
    }
    _resetTransiZoom(films=true,page=true){
        if(films){
            this.$filmsContainer.attr("transi","");
        }
        if(page){
            this.$page.attr("transi","");
        }


    }
    showPageZoom(cb) {
        let me=this;
        console.log("show page zoom");
        this.setPageVisible(true);
        this._transiZoom(this.$page,"in",function(){
            me._resetTransiZoom(true,true);
        });
        playSound(SOUNDS.subbass)
    }
    hidePageZoom(cb) {
        console.log("hide page zoom");
        playSound(SOUNDS.tap)
        this._transiZoom(this.$page,"out",cb);
    }
    showFilmsZoom(cb) {
        console.log("show films zoom",this.$filmsContainer.attr("transi"));
        this._transiZoom(this.$filmsContainer,"in",cb);
    }
    hideFilmsZoom(cb) {
        console.log("hide films zoom");
        this._transiZoom(this.$filmsContainer,"out",cb);
    }



    //------------------------------------------------------------------------


    _defineTransifilmByUid(uid){
        this.transiFilm.setContentByUid(uid)
    }
    _defineTransifilm($film){
        this.transiFilm.setContentBy$Film($film);
    }
    _positionneTransiFilm($element,duration){
        this.transiFilm.setPositionAndSize($element,duration);
    }

    /**
     *
     * @param $film
     */
    clickFilm($film){
        console.log("click film");
        playSound(SOUNDS.subbass)
        let me=this;

        if(navMenu.isOpen()){
            //ça doit se passer autrement...
            //navMenu.saveScroll=0;
            //navMenu.close();
            navMenu.hideElements();
            //this.transiFilm.set$Film($film);
            pageTransition.hideFilmsZoom(function(){
                me.scrollTop();
                $body.removeClass("nav-open");
                PovHistory.readyToinject=true;
            });
            return;
        }
        //zoome typo et apparait
        this.runningTransition=this.TRANSI_HOME_FILM;
        let baseDuration=0.25;
        me.transiFilm
            .set$Film($film)
            .clone$FilmPosition()
            .setAutoSize(false)
            .setAsPoster(false)
            .fadeIn(baseDuration,
                function(){
                    //remet en place les films
                    me.setIsHome(false);
                    TweenMax.set($film,{scale:1,opacity:1});
                    me.$films.css("visibility","hidden");
                    setTimeout(function(){
                        me.$films.css("visibility","visible");
                    },4000);
                }
            )
            .zoomTexte(baseDuration*3,function(){
                me.scrollTop();
                PovHistory.readyToinject=true;
            })

    }


    setPageVisible(flag){
        if(flag){
            this.$page.css("display","block");
        }else{
            this.$page.css("display","none");
        }
    }

}