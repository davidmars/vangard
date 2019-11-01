import SmoothScrollbar from "smooth-scrollbar";
import FilmPreview from "./FilmPreview";

export default class Films {

    constructor($main){
        let me = this;
        this.$main=$main;
        this.$$main=$main[0];

        this.$list=$main.find(".list");
        this.$$list=this.$list[0];

        this.MODE_NULL="";
        this.MODE_WHEEL="wheel";
        this.MODE_MOUSE="mouse";
        this.MODE_TOUCH="touch";

        this._setInputMode(me.MODE_NULL);

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
            $(this).on("mouseenter",function(){
                //me.setActiveOne(fp);
            });
        });

        //wheel
        let mouseWheelTimeOut=null;
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

        //mousemove
        window.addEventListener("mousemove", event => {
            me._setInputMode(me.MODE_MOUSE);
        });

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
            me.loop();
            me.loopTestTheOne();
        },33);
        this.y=0;

    }
    modeNav(isNav){
        let me=this;
        if(isNav){
            me.goTop();
        }
        if(STAGE.width<1000){
            me.isNav=isNav;
        }
    }

    _setInputMode(m){
        this.inputMode=m;
        this.$main.attr("input-mode",m);
    }


    loop(){
        let me=this;
        if(me.moving){
            return;
        }
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
            20,
            0
            ,-20
        );
        let min=0;
        let max=-me.$list.outerHeight()+h;

        y-=speed;
        y=Math.min(y,min);
        y=Math.max(y,max);
        let changed= y!==me.y;

        if(changed){
            //uniquement si la propriété y a changé
            let duration=1.5;
            let ease= Power1.easeOut;
            if(me.inputMode===me.MODE_WHEEL){
                duration=0.6;
                let ease= SlowMo.ease.config(0.7, 0.7, false);
            }
            me.y=y;
            TweenMax.to(me.$$list,duration,{y:me.y,roundProps:"y",ease:ease});
        }

    }

    loopTestTheOne(){
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
                    break;
                }
            }
        }
    }


    isTopScreen(){
        let pos=this.$$main.getBoundingClientRect().top;
        let is= pos<1;
        if(is && !this._isTopScreen){
            this.goTop();
            this.moving=false;
        }
        this._isTopScreen=is;
        return is;
    }

    /**
     * Positionne la liste en haut
     */
    goTop(){
        let me=this;
        this.y=0;
        me.moving=true;
        TweenMax.to(me.$$list,2,{y:me.y,onComplete:function(){
            me.moving=false;
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
}