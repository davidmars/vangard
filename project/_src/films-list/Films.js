import SmoothScrollbar from "smooth-scrollbar";
import FilmPreview from "./FilmPreview";

export default class Films {

    constructor($main){
        let me = this;
        this.$main=$main;
        this.$$main=$main[0];

        this.$list=$main.find(".list");
        this.$$list=this.$list[0];

        this.$tick=$main.find(".tick");
        this.$$tick=this.$tick[0];

        this.$mouseSelector=$main.find(".mouse-selector");
        this.$$mouseSelector=this.$mouseSelector[0];

        this.$line=$main.find(".line");
        this.$$line=this.$line[0];

        this.MODE_NULL="";
        this.MODE_WHEEL="wheel";
        this.MODE_MOUSE="mouse";
        this.MODE_TOUCH="touch";
        this.MODE_TOUCH_DRAG="touch drag";

        this._setInputMode(me.MODE_NULL);

        /**
         * Mouse wheel
         * @type {number}
         */
        this.wheelDelta=0;
        /**
         *
         * @type {Scrollbar}
         */
        //this.scroll=SmoothScrollbar.init(me.$main[0], {damping:0.09});
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
        window.addEventListener("wheel", event => {
            me._setInputMode(me.MODE_WHEEL);
            me.wheelDelta=event.deltaY;
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
        let touchStartY=0;
        let touchStartTime=0;
        let yWhenTouchStart=0;
        let manageTouchEvent=function(e){
            me._setInputMode(me.MODE_TOUCH);
            return e.changedTouches[0].clientY;
        };
        me.$$main.addEventListener("touchstart", e => {
            touchStartY=manageTouchEvent(e);
            yWhenTouchStart=me.y;
            touchStartTime=e.timeStamp;
        });
        me.$$main.addEventListener("touchmove", e => {
            e.preventDefault();
            e.stopPropagation();
            let ty=manageTouchEvent(e);
            let timeDiff=e.timeStamp-touchStartTime;
            //if(timeDiff>500){
                me.wheelDelta=0;
            me._setInputMode(me.MODE_TOUCH_DRAG);
                me.y=yWhenTouchStart+(ty-touchStartY);
                console.log(me.y);
            //}
            //me.wheelDelta=touchStartY-ty;
        });
        me.$$main.addEventListener("touchend", e => {
            let ty=manageTouchEvent(e);
            me.wheelDelta=0;
            let timeDiff=e.timeStamp-touchStartTime;
            if(timeDiff<500){
                let speed=ratio(timeDiff,0,4,500,0);
                me.wheelDelta=speed*(touchStartY-ty);
                if(mouseWheelTimeOut){
                    clearTimeout(mouseWheelTimeOut);
                }
                mouseWheelTimeOut=setTimeout(function(){
                    me.wheelDelta=0;
                },500)
            }
        });

        setInterval(function(){me.loop()},33);
        this.y=0;

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

            case me.MODE_TOUCH:
                my=center+me.wheelDelta*5;
                break;

            default:
                my=center;


        }
        my=Math.max(my,0);
        my=Math.min(my,h);
        TweenMax.set(me.$$line,{y:my})
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

        if(changed || me.inputMode===me.MODE_TOUCH_DRAG){
            //uniquement si la propriété y a changé
            let duration=1.5;
            if(me.inputMode===me.MODE_TOUCH_DRAG){
                duration=0.5;
            }else{
                me.y=y;
            }
            TweenMax.to(me.$$list,duration,{y:me.y,roundProps:"y"});
            let tickY=ratio(y,max,h-20,min,100);
            TweenMax.to(me.$$tick,1,{y:tickY,roundProps:"y"});
        }

        me.$tick.text(`${changed} ${me.inputMode} d:${me.wheelDelta} y:${Math.abs(Math.floor(y))}`);

        //savoir lequel est sous la souris

        let mouse=center;
        switch (me.inputMode) {
            case me.MODE_MOUSE:
                mouse=my;
                break;
        }
        TweenMax.to(me.$$mouseSelector,0.2,{y:mouse,roundProps:"y"});

        for(let p of me.previews){
            let $f=p.$film;
            let r=$f.offset();
            if(r.top < mouse){
                if(r.top+$f.height()>mouse){
                    me.setActiveOne(p);
                    break;
                }
            }
        }
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
                //if(!me.inputMode===me.MODE_TOUCH){
                    preview.playFirst();
                //}

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