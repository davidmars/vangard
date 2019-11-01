export default class FilmPreview {
    constructor($film){
        let me =this;
        /**
         * Tant que false ça veut dire que la video courrante n'a pas été jouée
         * @type {boolean}
         */
        this.yetPlayed=false;
        this.$film=$film;
        this.$previews=this.$film.find(".previews");
        $film.data("obj",this);
        this.$text=this.$film.find("span");
        this.text=this.$text.text();
    }
    glitch(){
        let me =this;
        let spl=this.text.split("");
        let shuffle = (array) => array.sort(() => Math.random() - 0.5);
        shuffle(spl);
        me.$text.text(spl.join(""));
        setTimeout(function(){
            me.$text.text(me.text);
        },500);
    }
    $videos(){
        return this.$film.find("video");
    }
    /**
     * Change de vidéo
     */
    change(){
        console.log("change");
        this.yetPlayed=false;
        this.pauseAll();
        let $last=this.$film.find(".preview").last();
        this.$previews.prepend($last);
    }

    /**
     * Met tout en pause
     */
    pauseAll(){
        this.$film.addClass("paused");
        this.$videos().each(function(){
            $(this).get(0).pause();
        })
    }

    /**
     * Joue la video courrante
     */
    playFirst(){
        this.yetPlayed=true;
        this.pauseAll();
        this.$film.removeClass("paused");
        this.$videos().first().get(0).play();
    }
}