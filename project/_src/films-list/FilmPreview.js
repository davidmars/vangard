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
        this.debug();
        this.$film.find(".debug").on("mousedown",function(e){
            $(".film .debug").css("display","none");
            e.preventDefault();
            e.stopPropagation();
        });
        setTimeout(function(){
            me.preloadNext();
        },1000);

    }
    debug(){
        let $d=this.$film.find(".debug");
        let $v=this.$videos().first();
        let $$v=$v.get(0);
        let percent=0;
        let duration="???";
        try {
            let buffered=$$v.buffered.end(0);
            duration=$$v.duration;
            percent=Math.floor(100/duration*buffered);
        }catch (e) {

        }

        let t=[];
        t.push($v.attr("src"));
        t.push(`poids ${$v.attr("size")}`);
        t.push(`duree ${duration} sec`);
        t.push(`loaded ${percent}%`);
        t.push("pause:"+$$v.paused);
        $d.html(t.join("<br>"));

    }
    $videos(){
        return this.$film.find("video");
    }
    /**
     * Change de vidéo
     */
    change(){
        this.yetPlayed=false;
        this.pauseAll();
        let $last=this.$film.find(".preview").last();
        this.$previews.prepend($last);
        this.preloadNext();
        this.debug();
    }

    preloadNext(){
        let $lastnext=this.$film.find(".preview").last().find(".lazyload");
        if($lastnext.length){
            lazySizes.loader.unveil($lastnext[0]);
        }

    }


    /**
     * Met tout en pause
     */
    pauseAll(){
        this.$film.addClass("paused");
        this.$videos().each(function(){
            $(this).get(0).pause();
            $(this).get(0).currentTime=0;
        });
        this.debug();
    }

    /**
     * Joue la video courrante (si elle n'est pas déja en lecture)
     */
    playFirst(){
        if(this.$film.is(".paused")){
            this.yetPlayed=true;
            this.pauseAll();
            this.$film.removeClass("paused");
            let $v=this.$videos().first();
            //let $preview=$v.closest(".preview");
            let $$v=$v.get(0);
            $$v.currentTime=0;
            $$v.play();
            this.debug();
        }
    }
}