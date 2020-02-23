import Player from '@vimeo/player';
require ("./video-wrap.less");

export default class VideoWrap{




    constructor($main){
        VideoWrap.all.push(this);
        let me=this;
        this.$main=$main;
        this.$main.find("button").on("click",function(){
            me.play();
        });

        this.$play=$("[play]");
        this.$timer=$("[timer]");
        this.$progress=$("[progress]");
        this.$progressBuffer=$("[progress-buffer]");
        this.$progressWrap=$("[progress-container]");
        this.$fs=$("[fs]");

        if($(".fs-wrap")[0].requestFullscreen){
            me.$fs.on("click",function(){
                if(!STAGE.isFullScreen){
                    $(".fs-wrap")[0].requestFullscreen();
                }else{
                    document.exitFullscreen();
                }
            });
        }else{
            this.$fs.remove();
        }

        me.$play.attr("state","play");
        me.$play.on("click",function(){
            me.tooglePlayPause();
        });
        me.$progressWrap.on("mousedown mouseup mousemove",function(e){
            if(e.type==="mousemove"){
                if(!window.mouseIsDown){
                    return;
                }
            }
            me.seek(ratio(e.offsetX,$(this).width(),1,0,0),true)
        });

        let $player=$main.find(".js-video");
        this.player=new Player($player[0],{
            url:$player.attr("src"),
            background:true,
            byline:false,
            portrait:false,
            title:false,
            transparent:false,
            autoplay:false,
            color:"#ffffff",
            loop:false
        });
        this.player.pause();

        this.duration=0;
        this.position=0;
        this.positionSeek=0;
        this.percent=0;
        this.percentBuffer=0;
        this.player.setVolume(1);

        this.player.getDuration().then(function(duration) {
            me.duration=duration;
            me.displayTime();
        });


        //events............

        this.player.on("timeupdate",function(e){
            if(VideoWrap.logLevel){
                console.log("timeupdate",e);
            }
            me.seeking=false;
            me.position=e.seconds;
            me.duration=e.duration;
            me.percent=e.percent;
            me.displayTime();
        });

        this.player.on("ended",function(){
            if(VideoWrap.logLevel) {
                console.log("ended");
            }
            me.seek(0,false);
            //me.$play.text("play again ?");
            me.$play.attr("state","play");
            me.$main.removeClass("playing");

        });
        this.player.on("pause",function(){
            if(VideoWrap.logLevel) {
                console.log("pause");
            }
            if(!me.seeking){
                //me.$play.text("play")
                me.$play.attr("state","play");
            }
            me.$main.removeClass("playing");
        });
        this.player.on("bufferstart",function(){
            if(VideoWrap.logLevel){
                console.log("bufferstart");
            }
            me.$main.addClass("buffering");
            me.displayTime();
            me.seeking=true;
        });
        this.player.on("bufferend",function(){
            if(VideoWrap.logLevel){
                console.log("bufferend");
            }
            me.$main.removeClass("buffering");
            me.seeking=false;
            me.displayTime();

        });
        this.player.on("play",function(){
            if(VideoWrap.logLevel){
                console.log("play");
            }
            //me.$play.text("pause")
            me.$play.attr("state","pause");
            me.$main.addClass("playing");
        });
        this.player.on("progress",function(e){
            if(VideoWrap.logLevel){
                console.log("progress",e);
            }
            me.percentBuffer=e.percent;
            me.displayTime();
        })

    }

    displayTime(){
        let remain=Math.floor(this.duration-this.position);
        this.$timer.text(secondsToMMSS(remain));
        if(this.seeking){
            this.$progress.css("width",`${this.positionSeek*100}%`);
        }else{
            this.$progress.css("width",`${this.percent*100}%`);
        }

        this.$progressBuffer.css("width",`${this.percentBuffer*100}%`);
    }



    /**
     *
     * @param percent
     * @param {boolean|null} play Si false forcera la pause, si true forcera le play, si null gardera létat actuel
     */
    seek(percent,play=false){
        let me=this;
        this.seeking=true;
        this.positionSeek=percent;
        this.player.setCurrentTime(ratio(percent,1,this.duration,0,0));
        this.displayTime();
        if(play===true){
            this.player.play();
        }
        if(play===false){
            this.player.pause();
        }
    }

    /**
     * @deprecated
     * @param string
     * @param blink
     */
    text(string,blink=false){
        return;
        pageTransition
            .transiFilm
            .setAutoSize(true)
            .text(string)
            .blink(blink);
    }
    tooglePlayPause(){
        let me =this;
        me.player.getPaused().then(function(paused) {
            if(paused){
                me.play();
            }else{
                me.pause();
            }
        });
    }
    play(){
        let me=this;
        me.$main.addClass("playing");
        this.player.play();
    }
    pause(){
        this.player.pause();
    }

    get seeking() {
        return this._seeking;
    }

    set seeking(value) {
        if(value){
            this.$progress.addClass("seeking");
            this.$play.addClass("seeking");
            this.player.setVolume(0);
        }else{
            this.$progress.removeClass("seeking");
            this.$play.removeClass("seeking");
            this.player.setVolume(1);
        }
        this._seeking = value;
    }


    static pauseAll(){
        for(let v of VideoWrap.all){
            v.pause();
        }
    }
    static initFromDom(){
        let $all= $body.find(".js-video-wrap").not("[init]");
        $all.each(function(){
            let v=new VideoWrap($(this));
            $(this).attr("init","");
            if(window.pageViewCount>1){
                setTimeout(function(){
                    v.play();
                },2000)
            }
        })

    }

}
VideoWrap.logLevel=0;
VideoWrap.all=[];

