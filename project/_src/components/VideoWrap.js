import Player from '@vimeo/player';

export default class VideoWrap{
    constructor($main){
        console.error("new player");
        VideoWrap.all.push(this);
        let me=this;
        this.$main=$main;

        let $player=$main.find(".js-video");
        this.player=new Player($player[0],{
            url:$player.attr("src"),
            background:false,
            byline:false,
            portrait:false,
            title:false,
            transparent:false,
            autoplay:false,
            color:"#ffffff",
        });

        this.player.setColor("#ffffff");
        this.player.setVolume(1);

        this.player.on("ended",function(){
            console.log("ended");
            me.text("play again ?");
            me.$main.removeClass("playing");
        });
        this.player.on("pause",function(){
            console.log("pause");
            me.text("pause");
            me.$main.removeClass("playing");
        });
        this.player.on("bufferstart",function(){
            console.log("bufferstart");
            me.text("loading",true);
            me.$main.addClass("buffering");
        });
        this.player.on("bufferend",function(){
            console.log("bufferend");
            me.$main.removeClass("buffering");
        });
        this.player.on("play",function(){
            console.log("play");

            me.$main.addClass("playing");

            me.text("play");
            setTimeout(function(){
                me.text("go",true);
            },300)
        });
        this.player.on("progress",function(e){
            console.log("progress",e);
            //me.text(`${Math.round(e.percent * 100)}%`);
        })

    }
    text(string,blink=false){
        return;
        pageTransition
            .transiFilm
            .setAutoSize(true)
            .text(string)
            .blink(blink);
    }
    play(){
        let me=this;
        me.$main.addClass("playing");
        me.text("loading",true);
        //this.player.play();
    }
    pause(){
        this.player.pause();
    }

    static pauseAll(){
        for(let v of VideoWrap.all){
            v.pause();
        }
    }
    static init(){
        $body.on("click",".js-video-wrap button",function(e){
            e.preventDefault();
            let $main=$(this).closest(".js-video-wrap");
            if(!$main.data("VideoWrap")){
                $main.data("VideoWrap",new VideoWrap($main));
            }
            $main.data("VideoWrap").play();
        })
    }

}

VideoWrap.all=[];

