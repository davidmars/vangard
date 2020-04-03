import Player from "@vimeo/player";

require("./intro.less");
export default class Intro {

    constructor() {
        let me=this;
        this.$main=$(require("./intro.html"));
        this.$start=this.$main.find(".start");
        this.$video=this.$main.find(".video");
        this.vimeoUrl=PovHistory.currentPageInfo.introVimeo;
        $body.append(this.$main);
        this.$start.find("img").attr("src",LayoutVars.fmkHttpRoot+"/project/_src/intro/logo-vangard-1000.png")


        /*
        this.logo=lottie.loadAnimation({
            container: me.$start[0], // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: LayoutVars.helloLogoUrl // the path to the animation json
        });
        */
        this.player=new Player(me.$video[0],{
            url:me.vimeoUrl,
            background:true,
            byline:false,
            portrait:false,
            title:false,
            transparent:false,
            autoplay:false,
            color:"#ffffff",
            loop:false,
            muted:false,
        });
        this.player.pause();
        this.duration=0;
        this.position=0;
        this.positionSeek=0;
        this.percent=0;
        this.percentBuffer=0;
        this.player.setVolume(1);


        me.$start.on("click",function(e){
            me.play();
        });

        me.$video.on("click",function(e){
            me.destroy();
        });

        me.player.on("ended",function(){
            me.destroy();
        });


    }

    play(){
        this.$main.addClass("playing");
        this.player.play();
    }

    destroy(){
        this.$main.remove();
    }



}