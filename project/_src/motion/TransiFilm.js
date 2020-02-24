export default class TransiFilm{
    constructor(){
        let me =this;
        this.$main=$(require("./transi-film.html"));
        this.$text=this.$main.find(".titre");
        $(".film[poster]").each(function () {
            let $img = $("<img>");
            $img.attr("src", $(this).attr("poster"));
            me.$main.find(".images").append($img);
        });
        $body.find("#main").append(this.$main);
    }

    /**
     *
     * @param flag
     * @returns {TransiFilm}
     */
    setAsPoster(flag){
        if(flag){
            this.$main.addClass("as-poster");
        }else{
            this.$main.removeClass("as-poster");
        }
        return this;
    }

    /**
     *
     * @param flag
     * @returns {TransiFilm}
     */
    setAutoSize(flag){
        if(flag){
            TweenMax.set(this.$text,{clearProps:"all"});
            this.$main.addClass("auto-size");
        }else{
            this.$main.removeClass("auto-size");
        }
        return this;
    }
    /**
     *
     * @param flag
     * @returns {TransiFilm}
     */
    blink(flag){
        if(flag){
            this.$main.addClass("blink");
        }else{
            this.$main.removeClass("blink");
        }
        return this;
    }

    /**
     * Définit le $film mirroir
     * @param $film
     * @returns {TransiFilm}
     */
    set$Film($film){
        this.blink(false);
        this.$film=$film;
        //le bon texte
        this.text(this.$film.find(".h0>span").text());
        //la bonne photo
        this.$main.find("img").removeClass("visible");
        this.$main.find(`img[src='${this.$film.attr("poster")}']`).addClass("visible");
        return this;
    }

    text(string){
        this.$text.text(string);
        return this;
    }

    setFromCurrentPage(){
        return this;
    }

    /**
     *
     * @param uid
     * @returns {TransiFilm}
     */
    setContentByUid(uid){
        let $film=$(`.film[film-uid='${uid}']`);
        this.set$Film($film);
        return this;
    }

    /**
     * Copie la position et taille du $film référent
     * @param duration
     * @returns {TransiFilm}
     */
    clone$FilmPosition(duration=0){
        let $text=this.$main.find(".titre");
        let pos=this.$film.find(".h0>span")[0].getBoundingClientRect();
        TweenMax.to($text,duration,{x:pos.left,y:pos.top});
        return this;
    }

    /**
     * Fait un fade in de 0 à 1
     * @param duration
     * @param cb
     * @returns {TransiFilm}
     */
    fadeIn(duration,cb){
        console.log('page transition FADE IN')
        $("#main").css("opacity","0.5");
        TweenMax.fromTo(
            this.$main,
            duration,
            {opacity:0},
            {
                opacity:1,
                ease:Power0.easeInOut,
                onComplete:function(){
                    console.log('page transition FADE IN COMPLETE')
                    $("#main").css("opacity","");
                    cb();

                }
            }
        );
        return this;
    }

    /**
     * Fait zoomer le texte ET le texte du clone dans le même temps
     * @param {number} seconds
     * @param {function} cb
     * @returns {TransiFilm}
     */
    zoomTexte(seconds,cb){
        let $texts=this.$text.add(this.$film);
        TweenMax.fromTo(
            $texts,
            seconds,
            {
                scale:1
            },
            {
                scale:1.2,
                ease:Power4.easeOut,
                onComplete:function(){
                    cb();
                }
            }
        );
        return this;
    }

}