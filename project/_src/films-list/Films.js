import FilmPreview from "./FilmPreview";
var EventEmitter = require('event-emitter-es6');

export default class Films extends EventEmitter{

    constructor($main){
        super();
        let me = this;
        this.options={
            doubleClick:true
        }
        this.$main=$main;
        this.$$main=$main[0];

        this.$list=$main.find(".list");
        this.$$list=this.$list[0];

        this.MODE_NULL="";
        this.MODE_WHEEL="wheel";
        this.MODE_MOUSE="mouse";
        this.MODE_TOUCH="touch";
        this.inputMode=false;


        /**
         * Le premier argument est le nouveau film, le second l'ancien
         * @type {string}
         */
        this.EVENT_FILM_CHANGE="EVENT_FILM_CHANGE";
        this.EVENT_DISABLE="EVENT_DISABLE";
        this.EVENT_ENABLE="EVENT_ENABLE";
        /**
         * Le premier argument est le nouveau mode, le second l'ancien
         * @type {string}
         */
        this.EVENT_INPUT_MODE_CHANGE="EVENT_INPUT_MODE_CHANGE";


        /**
         * La position y de la liste (sauf en MODE_TOUCH )
         * @type {number}
         */
        this.y=0;

        /**
         * Mouse wheel
         * @type {number}
         */
        this.wheelDelta=0;
        /**
         *
         * @type {FilmPreview[]}
         */
        this.previews=[];
        /**
         *
         * @type {FilmPreview|null}
         */
        this.activeOne=null;


        this.$main.find(".film").each(function(){
            let fp=new FilmPreview($(this));
            me.previews.push(fp);
        });

        if(this.options.doubleClick){
            //change on click
            this.$main.find(".film").on("click",function(e){
                if(!$(this).is("[the-one]")){
                    e.preventDefault();
                    e.stopPropagation();
                    if($(this)[0].getBoundingClientRect().top<STAGE.height/2){
                        me.goNext();
                    }else{
                        me.goPrev();
                    }
                }
            });
            this.$$main.addEventListener("wheel", e => {
                if(me.y<-10){
                    //empeche de scroller dans le body si on est pas en haut de la liste
                    e.preventDefault();
                    e.stopPropagation();
                }
                me._setInputMode(me.MODE_WHEEL);

                if(!me.isWeeling){
                    if(e.deltaY<0){
                        me.goNext();
                    }else{
                        me.goPrev();
                    }
                    me.isWeeling=true;
                }
                if(mouseWheelTimeOut){
                    clearTimeout(mouseWheelTimeOut);
                }
                mouseWheelTimeOut=setTimeout(function(){
                    me.isWeeling=false;
                },500)
            });

        }else{
            //mousemove
            window.addEventListener("mousemove", event => {
                me._setInputMode(me.MODE_MOUSE);
            });
            this.$main.find(".film").each(function(){
                $(this).on("mouseenter",function(){
                    me.setActiveOne(fp);
                });
            });
            this.$$main.addEventListener("wheel", e => {
                if(me.y<-10){
                    //empeche de scroller dans le body si on est pas en haut de la liste
                    e.preventDefault();
                    e.stopPropagation();
                }
                me._setInputMode(me.MODE_WHEEL);
                me.wheelDelta=e.deltaY;
                if(mouseWheelTimeOut){
                    clearTimeout(mouseWheelTimeOut);
                }
                mouseWheelTimeOut=setTimeout(function(){
                    me.wheelDelta=0;
                },500)
            });
        }

        /**
         * Si false rien ne se passe
         * @type {boolean}
         */
        this.enabled=true;

        document.addEventListener( 'visibilitychange' , function() {
            me.enabled = !document.hidden;
        }, false );

        //wheel
        let mouseWheelTimeOut=null;




        //-------------touch-----------------------
        let manageTouchEvent=function(e){
            me._setInputMode(me.MODE_TOUCH);
            return e.changedTouches[0].clientY;
        };
        me.$$main.addEventListener("touchstart", e => {
            manageTouchEvent(e);
        });
        me.$$main.addEventListener("touchmove", e => {
            manageTouchEvent(e);
        });
        me.$$main.addEventListener("touchend", e => {
            manageTouchEvent(e);
        });

        setInterval(function(){
            if(me.enabled){
                if(!me.options.doubleClick){
                    me.loop();
                }
                me._loopTestTheOne();
            }
        },33);

        this.on(this.EVENT_INPUT_MODE_CHANGE,function(){
         if(me.inputMode===me.MODE_TOUCH){
             me.goTop();
         }
        })
        this._setInputMode(me.MODE_NULL);


    }



    tw(y,up=false){
        let me=this;
        let filmHeight=me.$main.find(".film").height();
        //console.log("y",y);
        //console.log("filmHeight",filmHeight);
        let roundY=Math.round(y/filmHeight)*filmHeight;
        roundY=this.limitY(roundY);
        //console.log("roundY",roundY);
        //TweenMax.to(me.$$list,0.25,{y:y,roundProps:"y",ease:Power4.easeOut});
        //TweenMax.to(me.$$list,0.75,{y:y,roundProps:"y",ease:Back.easeIn.config(1.7)});
        //TweenMax.to(me.$$list,0.5,{y:y,roundProps:"y",ease:Power4.easeIn});
        //TweenMax.to(me.$$list,0.5,{y:y,roundProps:"y",ease:Power2.easeInOut});
        TweenMax.to(me.$$list,0.5,{y:roundY,roundProps:"y",ease:Power3.easeIn});
        let tl=new TimelineMax();
        let tl2=new TimelineMax();
        let tl3=new TimelineMax();

        let $span=me.$list.find("span");
        let $i=me.$list.find("i");
        let $v=me.$list.find("video");
        let $inside=$span;
        let $inside2=$i;
        let factor=up?1:-1;




        tl.to($inside,      0.2,{y:30*factor,ease:Power0.easeOut});
        tl2.to($inside2,    0.2,{y:30*factor,ease:Power0.easeOut});
        //tl3.to($v,0.1,{scale:2,ease:Power3.easeOut});
        tl.to($inside,      0.7,{y:0,ease:Power1.easeInOut});
        tl2.to($inside2,    0.8,{y:0,ease:Power1.easeInOut});
        //tl3.to($v,1.3,{scale:1,ease:Power3.easeOut});

    }

    goPrev(){
        console.log("prev")
        let me=this;
        this.y-=this.$main.find(".film").height();
        this.tw(this.y,true);
    }
    goNext(){
        console.log("next")
        let me=this;
        this.y+=this.$main.find(".film").height();
        //TweenMax.to(me.$$list,0.5,{y:me.y,roundProps:"y",ease:Power1.easeOut});
        this.tw(this.y);
    }

    modeNav(isNav){
        let me=this;
        if(isNav){
            me.goTop();
        }
    }

    /**
     * Pour définir le mode de déplacement
     * @param m
     * @private
     */
    _setInputMode(m){
        //force touch
        if(!machine.hasHover){
            if(machine.isTouch){
                m=this.MODE_TOUCH;
            }
        }
        if(m !== this.inputMode){
            let old=this.inputMode;
            this.inputMode=m;
            this.$main.attr("input-mode",m);
            this.emit(this.EVENT_INPUT_MODE_CHANGE,[m,old]);
        }

    }

    disable(){
        this.enabled=false;
        TweenMax.killTweensOf(this.$list);
    }
    enable(){
        this.enabled=true;
        TweenMax.killTweensOf(this.$$list);
    }

    limitY(y){
        let min=0;
        let max=-this.$list.outerHeight()+STAGE.height;
        y=Math.min(y,min);
        y=Math.max(y,max);
        return y;
    }
    /**
     * Boucle qui se charge de faire scroller le bazard
     */
    loop(){
        let me=this;
        if(!this.isTopScreen()){
            return;
        }
        if(this.inputMode===me.MODE_TOUCH){
            return;
        }
        let y=this.y;
        let h=STAGE.height;
        let center=h/2;
        let my;

        switch (me.inputMode) {
            case me.MODE_MOUSE:
                my=STAGE.mouseY;
                break;
            case me.MODE_WHEEL:
                my=center+me.wheelDelta*25;
                break;
            default:
                my=center;
        }
        my=Math.max(my,0);
        my=Math.min(my,h);
        let speed=ratio(
            my,
            h,
            30,
            0
            ,-30
        );



        y-=speed;
        y=me.limitY(y);

        let changed= y!==me.y;

        if(changed){
            //uniquement si la propriété y a changé
            let duration=0.5;
            let ease= Power1.easeOut;
            if(me.inputMode===me.MODE_WHEEL){
                duration=0.1;
                let ease= SlowMo.ease.config(0.7, 0.7, false);
            }
            me.y=y;
            TweenMax.to(me.$$list,duration,{y:me.y,roundProps:"y",ease:ease});
        }
    }

    /**
     * Boucle qui se charge de déterminer quel film est actif
     * @private
     */
    _loopTestTheOne(){
        //savoir lequel est sous la souris
        let me=this;
        let mouse;
        switch (me.inputMode) {
            case me.MODE_MOUSE:
                mouse=STAGE.mouseY;
                break;
            default:
                mouse=STAGE.height/2;
        }
        for(let p of me.previews){
            let $f=p.$film;
            let r=$f[0].getBoundingClientRect();
            //$f.find("i").text(`${Math.floor(r.top)} / ${mouse} / ${me.inputMode}`);
            if(r.top < mouse){
                if(r.top+$f.height()>mouse){
                    me.setActiveOne(p);
                    return r;
                }
            }
        }
        //si on est là c'est que rien n'est actif
        if(me.activeOne){
            //si précédemment il y en avait un
            me.setActiveOne(null);
            me.pauseAllVideos();
        }
    }

    /**
     * Détermine si on est dans la zone d'activité de l'objet
     * @returns {boolean}
     */
    isTopScreen(){
        let pos=this.$$main.getBoundingClientRect().top;
        let is= pos<1;
        if(is && !this._isTopScreen){
            this.goTop();
        }
        this._isTopScreen=is;
        return is;
    }

    /**
     * Positionne la liste en haut
     */
    goTop(){
        return;
        let me=this;
        me.y=0;
        TweenMax.to(me.$$list,0,{y:me.y,onComplete:function(){
        }});
    }

    /**
     * Définit le film qui est actif
     * @param preview
     */
    setActiveOne(preview){
        let me=this;
        if(this.activeOne !== preview){
            if(this.activeOne){
                this.activeOne.pauseAll();
                //this.activeOne.change();
            }
            this.$main.find("[the-one]").removeAttr('the-one');
            me.emit(me.EVENT_FILM_CHANGE,[preview,this.activeOne]);
            this.activeOne=preview;
            if(preview){
                preview.playFirst();
                preview.$film.attr("the-one","");
            }
            for(let p of me.previews){
                let $f=p.$film;
                if(p.yetPlayed){ //on va pas changer uen video qu'on a pas encore lu
                    if(!isVisible($f[0])){ //on ne change la video que si on l'a pas vue avant
                        p.change();
                        break; //on ne change qu'une seule vidéo à la fois
                    }
                }
            }
        }
    }

    /**
     * Stoppe toutes les vidéos
     */
    pauseAllVideos(){
        let me=this;
        for(let p of me.previews){
            p.pauseAll();
        }
    }
}