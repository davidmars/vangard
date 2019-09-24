export default class FilmPreview {
    constructor($film){
        let me =this;
        this.$film=$film;
        this.$previews=this.$film.find(".previews");
        $film.data("obj",this);
        this.$text=this.$film.find("span")
        this.text=this.$text.text();
        /*
        setInterval(function(){
            if(Math.random()>0.9){
                me.glitch()
            }

        },1000)

        */
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
    change(){
        this.pauseAll();
        let $last=this.$film.find(".preview").last();
        this.$previews.prepend($last);
    }
    pauseAll(){
        this.$film.addClass("paused");
        this.$videos().each(function(){
            $(this).get(0).pause();
        })
    }
    playFirst(){
        this.pauseAll();
        this.$film.removeClass("paused");
        this.$videos().first().get(0).play();
    }
}