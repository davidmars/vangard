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
        //fake film typo
        this.$transiFilm = $(require("./transi-film.html"));
        $(".film[poster]").each(function () {
            let $img = $("<img>");
            $img.attr("src", $(this).attr("poster"));
            me.$transiFilm.find(".images").append($img);
        });
        $body.find("#root").append(this.$transiFilm);
        /*
        $body.on("mousedown","[page-transition-click]",function(){
            pageTransition.rectToElement($(this));
        });
        */
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


    //--------------------------------------------------------------------


    showPageNormal() {
        console.log("show page normal");
    }

    _setOriginCenter() {
        let o = ` ${Math.floor(STAGE.width / 2)}px ${Math.floor(STAGE.height / 2 + STAGE.scrollY)}px `;
        console.log(o);
        this.$page.css("transform-origin", o);
        this.$films.css("transform-origin", o);
    }


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

    showPageZoom(cb) {
        console.log("show page zoom");
        this._transiZoom(this.$page,"in",cb);
    }

    hidePageZoom(cb) {
        console.log("hide page zoom");
        this._transiZoom(this.$page,"out",cb);
    }

    showFilmsZoom(cb) {
        console.log("show films zoom");
        this._transiZoom(this.$filmsContainer,"in",cb);
    }

    hideFilmsZoom(cb) {
        console.log("hide films zoom");
        this._transiZoom(this.$filmsContainer,"out",cb);
    }

    hidePageAndShowFilms() {
        let me=this;
        let pageUid=PovHistory.currentPageInfo.uid;
        this.hidePageZoom(function(){
            $body.attr("is-home",true);
            films.disable();
            films.scrollToFilmUid(pageUid);
            me.showFilmsZoom(function(){
                films.enable();
                me.$films.attr("transi", "");
            });
        })
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
        if(pageTransition.isFilmTransition){
            TweenMax.from(me.$posterTypo(),1.5,{y:50*0,opacity:0,ease: Back.easeIn})
        }
        TweenMax.from(me.$traits(),1.5,{width:0,ease: Expo.easeOut});
        me.$photos().each(function(){
            TweenMax.from($(this),1.5,{y:50*Math.random()-50*0,opacity:0,ease: Power4.easeInOut})
        });

    }



    /**
     *
     * @param $film
     */
    clickFilm($film){
        console.log("click film")
        let me=this;
        me.isFilmTransition=true;
        //construit...
        //le bon texte
        let $text=me.$transiFilm.find(".titre");

        $text.text($film.find(".h0>span").text());
        let pos=$film.find(".h0>span")[0].getBoundingClientRect();
        //la bonne photo
        me.$transiFilm.find("img").removeClass("visible");
        me.$transiFilm.find(`img[src='${$film.attr("poster")}']`).addClass("visible");
        //la bonne position
        TweenMax.set($text,{x:pos.left,y:pos.top});
        //zoome typo et apparait
        let sc=1.2;
        let t=0.25;
        let ea=Power4.easeOut;

        TweenMax.fromTo(me.$transiFilm,t,{opacity:0},
            {
                opacity:1,ease:Power0.easeInOut,onComplete:function(){
                    //remet en place les films
                    $body.attr("is-home",false);
                    TweenMax.set($film,{scale:1,opacity:1});
                }
            }
        );
        TweenMax.fromTo($text,t*3,{scale:1},
            {scale:sc,ease:ea}
        );
        TweenMax.fromTo($film,t*3,{scale:1},
            {
                scale:sc,
                ease:ea,
                onComplete:function(){
                    //dit qu'on peut afficher la page
                    //me.isFilmTransition=false;
                    Site.onPageQuit(false);
                    //remetra en place la transition à l'apparition de la page

                }
            }
        );
        setTimeout(function(){
            //me.isFilmTransition=false;
        },t*3*1000)


    }

    _resetFilmTransition(){
        //return;
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
    show(cb){

        //alert("show");
        let me=this;
        return;
        me.restoreAll();

        if(pageTransition.isFilmTransition){
            me.showPage();
        }else{
            me.showPageZoom();
        }
        //me.showFilms();
        setTimeout(function(){
            if(cb) {cb();}
            me.restoreAll();
        },2000)

    }
    restorePage(){
        TweenMax.set(this.$page,{clearProps:"all"});
        TweenMax.set(this.$elementsPage(), {clearProps: 'all'});
    }
    restoreAll(){
        this.restorePage();
    }

}