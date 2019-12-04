import {Power3} from "gsap";

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
        //fake film typo
        this.$transiFilm = $(require("./transi-film.html"));
        $(".film[poster]").each(function () {
            let $img = $("<img>");
            $img.attr("src", $(this).attr("poster"));
            me.$transiFilm.find(".images").append($img);
        });
        $body.find("#main").append(this.$transiFilm);

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
            window.scrollTo(0,0);
            PovHistory.readyToinject=true; //puis appellera show()
        });
    }
    show_FILM_FILM(){
        let me=this;
        me._displayFilmPosterCurrentPage();
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
        me.$transiFilm.addClass("as-poster");
        //fait disparaitre le typo de transition
        me.showPageNormal(
            function(){
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
                if(PovHistory.currentPageInfo.recordType==="film"){
                    me._displayFilmPosterCurrentPage();
                }
        }
    }

    isTransi(transiName){
        return this.runningTransition===transiName;
    }




    //--------------------------------------------------------------------

    _displayFilmPosterCurrentPage(){
        this._defineTransifilmByUid(PovHistory.currentPageInfo.uid)
        this.$transiFilm.addClass("as-poster");
        this.$transiFilm.addClass("auto-size");
    }

    showPageNormal(cb) {
        console.log("show page normal");
        if (cb) {cb();}
    }

    /**
     * Calle le transform origin de films et page par rapport au viewport pour avoir des zooms élégants
     * @private
     */
    _setOriginCenter() {
        let o = ` ${Math.floor(STAGE.width / 2)}px ${Math.floor(STAGE.height / 2 + STAGE.scrollY)}px `;
        this.$page.css("transform-origin", o);
        this.$films.css("transform-origin", o);
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
        $el.attr("transi", inOrOut);
        setTimeout(function () {
                //$el.attr("transi", "");
                if (cb) {cb();}},
            1 * 1000
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
        console.log("show page zoom");
        this._displayFilmPosterCurrentPage();
        this._transiZoom(this.$page,"in",cb);
    }
    hidePageZoom(cb) {
        console.log("hide page zoom");
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

    /**
     * affiche les éléments dans la page
     */
    showPage(){
        console.log("show page");
        let me=this;
        me.restorePage();
        setTimeout(function(){
            me._resetFilmTransition();
        },100);

        TweenMax.set($("#main"),{scale:1,ease: Power2.easeInOut});
        TweenMax.from(me.$textes(),1.5,{y:50*0,opacity:0,ease: Power1.easeInOut});
        TweenMax.from(me.$prevNext(),1.5,{y:80*0,opacity:0,ease: Power2.easeInOut});
        TweenMax.from(me.$titres(),1.5,{y:60*0,opacity:0,ease: Power3.easeInOut});
        TweenMax.from(me.$embeds(),1.5,{y:200*0,opacity:0,ease: Back.easeOut});
        if(this.isTransi(this.TRANSI_HOME_FILM)){
            TweenMax.from(me.$posterTypo(),1.5,{y:50*0,opacity:0,ease: Back.easeIn})
        }
        TweenMax.from(me.$traits(),1.5,{width:0,ease: Expo.easeOut});
        me.$photos().each(function(){
            TweenMax.from($(this),1.5,{y:50*Math.random()-50*0,opacity:0,ease: Power4.easeInOut})
        });
    }
    _defineTransifilmByUid(uid){
        let $film=$(`.film[film-uid='${uid}']`);
        this._defineTransifilm($film);
    }
    _defineTransifilm($film){
        this._resetFilmTransition();
        this.$transiFilm.removeClass("as-poster auto-size");
        let $text=this.$transiFilm.find(".titre span");
        $text.text($film.find(".h0>span").text());
        //la bonne photo
        this.$transiFilm.find("img").removeClass("visible");
        this.$transiFilm.find(`img[src='${$film.attr("poster")}']`).addClass("visible");
    }
    _positionneTransiFilm($element,duration){
        let $text=this.$transiFilm.find(".titre");
        let pos=$element.find(".h0>span")[0].getBoundingClientRect();
        TweenMax.to($text,duration,{x:pos.left,y:pos.top});
    }

    /**
     *
     * @param $film
     */
    clickFilm($film){
        console.log("click film");
        let me=this;
        this.runningTransition=this.TRANSI_HOME_FILM;
        if(navMenu.isOpen()){
            //ça doit se passer autrement...
            navMenu.saveScroll=0;
            navMenu.close();
            return;
        }

        //construit...
        me._defineTransifilm($film);
        //la bonne position
        this._positionneTransiFilm($film,0);
        //zoome typo et apparait
        let sc=1.2;
        let t=0.25;
        let ea=Power4.easeOut;
        TweenMax.fromTo(me.$transiFilm,t,{opacity:0},
            {
                opacity:1,ease:Power0.easeInOut,onComplete:function(){
                    //remet en place les films
                    me.setIsHome(false)
                    TweenMax.set($film,{scale:1,opacity:1});
                    me.$films.css("visibility","hidden");
                    setTimeout(function(){
                        me.$films.css("visibility","visible");
                    },4000)
                }
            }
        );
        let $text=this.$transiFilm.find(".titre");
        TweenMax.fromTo($text,t*3,{scale:1},
            {scale:sc,ease:ea}
        );
        TweenMax.fromTo($film,t*3,
            {scale:1},
            {scale:sc,ease:ea}
        );
        setTimeout(function(){
            PovHistory.readyToinject=true;
            window.scrollTo(0,0);
        },t*3*1000+100)


    }

    _resetFilmTransition(){
        let me=this;
        let $text=me.$transiFilm.find(".titre");
        let $textContainer=$text.parent();
        TweenMax.set(me.$transiFilm,{clearProps:"all"});
        TweenMax.set($text,{clearProps:"all"});
        TweenMax.set($textContainer,{clearProps:"all"});
    }



    hide(cb){
        return;
        console.log("hide");
        let $elements=this.$elements();
        let $invisibles=[];
        $elements.each(function(){
            let $el=$(this);
                TweenMax.set($el, {overflow: 'hidden'});
                if(!isVisible($(this)[0])){
                    $invisibles.push($(this))
                }
        });
        for(let $el of $invisibles){
            TweenMax.set($el, {visibility: 'hidden'});
        }

        this.hidePage();

        setTimeout(function(){
            if(cb) {cb();}
        },1000)

    }

    restorePage(){
        TweenMax.set(this.$page,{clearProps:"all"});
        TweenMax.set(this.$elementsPage(), {clearProps: 'all'});
    }
    restoreAll(){
        this.restorePage();
    }



    $elements() {
        let me = this;
        return me.$elementsFilms()
            .add(me.$filmItemsSmall());
    }

    $elementsPage() {
        let me = this;
        return me.$prevNext()
            .add(me.$traits())
            .add(me.$embeds())
            .add(me.$photos())
            //.add(me.$top())
            .add(me.$posterTypo())
            .add(me.$titres())
            .add(me.$textes());
    }

    $elementsFilms() {
        let me = this;
        return me.$filmItems()
            .add(me.$filmItemsSmall());
    }

    $prevNext() {
        return $body.find("#main-content [data-js='PrevNext']");
    }

    $posterTypo() {
        return $body.find(".transi-film .titre");
    }

    $traits() {
        return $body.find("#main-content hr");
    }

    $embeds() {
        return $body.find("#main-content .embed-responsive");
    }

    $photos() {
        return $body.find("#main-content .photo-item");
    }

    $top() {
        return $body.find("#main-content .top");
    }

    $titres() {
        return $body.find("#main-content h1")
            .add("#main-content h2");
    }

    $textes() {
        return $body.find("#main-content .text-rich");
    }



    /**
     * Cache les éléments dans la page
     */
    hidePage() {
        console.log("hide page")
        let me = this;
        me._setOriginCenter();
        TweenMax.to(me.$page, 1.5, {scale: 0.9, opacity: 0, ease: Power2.easeInOut});
        /*
        TweenMax.to(me.$textes(),1.5,{y:-50*0,opacity:0,ease: Power2.easeInOut})
        TweenMax.to(me.$prevNext(),1.5,{y:-80*0,opacity:0,ease: Power2.easeInOut})
        TweenMax.to(me.$titres(),1.5,{y:-60*0,opacity:0,ease: Power3.easeInOut})
        TweenMax.to(me.$embeds(),1.5,{y:-200*0,opacity:0,ease: Back.easeIn})
        TweenMax.to(me.$posterTypo(),1.5,{y:-100*0,opacity:0,ease: Power2.easeInOut})
        //TweenMax.to(me.$top(),1.3,{y:-220,opacity:0,ease: Power3.easeInOut})
        TweenMax.to(me.$traits(),1.5,{width:0*0,ease: Expo.easeOut})
        me.$photos().each(function(){
            TweenMax.to($(this),1.5,{y:-50*Math.random()-50*0,opacity:0,ease: Power4.easeInOut})
        });
        */
    }
}