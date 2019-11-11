import FilmPreview from "./FilmPreview";
var EventEmitter = require('event-emitter-es6');

export default class Films extends EventEmitter{

    constructor($main){
        super();
        let me = this;
        this.options={
            doubleClick:true
        };
        this.$main=$main;
        this.$$main=$main[0];

        this.$list=$main.find(".list");
        this.$$list=this.$list[0];

        this.$allFilms=this.$main.find(".film");

        let $masks=this.$main.find(".mask>i");
        this.$skew=this.$allFilms.add($masks);
        this.$filmTypos=this.$main.find(".film span,.film i");
        this.$firstFilm=this.$main.find(".film").eq(0);

        /**
         * Le premier argument est le nouveau film, le second l'ancien
         * @type {string}
         */
        this.EVENT_FILM_CHANGE="EVENT_FILM_CHANGE";
        this.EVENT_DISABLE="EVENT_DISABLE";
        this.EVENT_ENABLE="EVENT_ENABLE";

        this.EVENT_START_MOVING="EVENT_START_MOVING";
        this.EVENT_STOP_MOVING="EVENT_STOP_MOVING";
        this.EVENT_STOP_MOVING_AND_GOOD_POSITION="EVENT_STOP_MOVING_AND_GOOD_POSITION";

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
        this.isMoving=false;


        this.$main.find(".film").each(function(){
            let fp=new FilmPreview($(this));
            me.previews.push(fp);
        });


        //change on click
        this.$main.find(".film").on("click",function(e){
            if(me.isMobileNavOpen()){
                return;
            }
            if(!$(this).is("[the-one]")){ //remettre pour activer le click
                e.preventDefault();
                e.stopPropagation();
                let y=$(this).offset().top - parseInt( $(this).parent().css("padding-top") );
                me.tw(y,false,false);
            }
        });

        let scrollTimer=null;
        window.addEventListener('scroll', function(e) {
            //console.log("scroll",window.scrollY);
            if(scrollTimer) {
                clearTimeout(scrollTimer);
            }
            scrollTimer=setTimeout(function(){
                me.recentre();
            },300);

        });
        /**
         * Si false rien ne se passe
         * @type {boolean}
         */
        this.enabled=true;

        document.addEventListener( 'visibilitychange' , function() {
            me.enabled = !document.hidden;
        }, false );



        this.speed=0;
        this.speed2=0;
        this.speed3=0;



        let makeSpeed=function(varr,mult){
            let ral=me[varr] * mult + me.speed;
            if(Math.abs(ral) > 0){
                me[varr]=( ral ) / (mult+1) ;
            }else{
                me[varr]=0;
            }
            if(Math.abs(me.speed2)<0.01){
                me[varr]=0;
            }
        };



        setInterval(function(){
            if($body.attr("is-home")==="true" || $body.is(".nav-open")){
                me.enable();
            }else{
                me.disable();
            }
            //let y=Math.round(window.scrollY);
            //let yy=Math.round(me.roundY(y));
            //me.debug(y+" "+yy+" "+STAGE.height+" "+$main.find(".mask>i").css("bottom"));
            if(me.enabled){
                let newY=window.scrollY;
                me.speed= me.yy - newY;
                me.yy=newY;
                makeSpeed("speed2",3);
                makeSpeed("speed3",15);

                let wasMoving=me.isMoving;
                me.isMoving=Math.abs(me.speed3)>0;
                if(wasMoving !== me.isMoving){
                    if(me.isMoving){
                        me.emit(me.EVENT_START_MOVING);
                    }else{
                        me.emit(me.EVENT_STOP_MOVING);
                    }
                }
                if(me.isMobileNavOpen()){
                    return;
                }
                TweenMax.set(me.$filmTypos,{y:me.speed2*-2});

                let sk=me.speed2/10;
                sk=Math.max(sk,-60);
                sk=Math.min(sk,60);
                TweenMax.set(me.$skew,{skewY:-sk});


                //console.log("speed",me.speed,me.speed2,me.speed3);
            }
        },20);
        me.on(me.EVENT_START_MOVING,function(){
            me.setActiveOne(null);
            me.pauseAllVideos();
        });
        me.on(me.EVENT_STOP_MOVING,function(){
            me._selectTheOne();
            let y=Math.round(window.scrollY);
            let yy=Math.round(me.roundY(y));
            if(y===yy){
                me.emit(me.EVENT_STOP_MOVING_AND_GOOD_POSITION);
            }
        });
        me.on(me.EVENT_STOP_MOVING_AND_GOOD_POSITION,function(){
            me.playTheOne();
            me._changePreviews();
        });

        me.recentre();
        me._selectTheOne();
        me.playTheOne();

    }

    isMobileNavOpen(){
        return STAGE.width < 1000 && $body.is(".nav-open");
    }

    debug(str){
        let $d=this.$main.find(".debug");
        $d.css("display","block");
        $d.text(str);
    }

    /**
     * Recentre la liste vers l'élement le plus proche du scroll actuel
     */
    recentre(){
        this.tw(window.scrollY);
    }
    tw(y,up=false,isFast=true){
        let me=this;
        y=this.limitY(y);
        y=this.roundY(y);
        let t=isFast?0.2:0.5;
        me.scrollTo(y,t)
    }

    scrollTo(y,time){
        if(this.enabled){
            TweenMax.to(window, time, {scrollTo:y,ease:Power3.easeIn});
        }
    }

    disable(){
        this.enabled=false;
    }
    enable(){
        this.enabled=true;
    }

    /**
     * Encadre les valeurs de y
     * @param y
     * @returns {number}
     */
    limitY(y){
        let minn=0;
        let maxx=$(document).height() - $(window).height();
        y=Math.max(y,minn);
        y=Math.min(y,maxx);
        return y;
    }

    /**
     * Arrondit y pour qu'il se retrouve au centre
     * @param y
     * @returns {number}
     */
    roundY(y){
        let filmHeight=this.$firstFilm.height()+4;
        let roundY=Math.round(y/filmHeight)*filmHeight;
        return roundY;
    }

    /**
     * Se charge de déterminer quel film est actif
     * @private
     */
    _selectTheOne(){
        //savoir lequel est au centre
        let me=this;
        let mouse;
        mouse=STAGE.height/2;
        if(me.speed !==0){
            me.pauseAllVideos();
            return ;
        }
        for(let p of me.previews){
            let $f=p.$film;
            let r=$f[0].getBoundingClientRect();
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
     * Définit le film qui est actif (qui est au centre)
     * @param preview
     */
    setActiveOne(preview){
        let me=this;
        if(this.activeOne !== preview){
            this.$main.find("[the-one]").removeAttr('the-one');
            this.activeOne=preview;
            if(preview){
                preview.$film.attr("the-one","");
            }
            me.emit(me.EVENT_FILM_CHANGE,[preview,this.activeOne]);
        }
    }

    /**
     * Change les vidéo de preview
     * @private
     */
    _changePreviews(){
        let me=this;
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

    /**
     * Stoppe toutes les vidéos
     */
    pauseAllVideos(){
        let me=this;
        this.activeOne=null;
        for(let p of me.previews){
            p.pauseAll();
        }
    }

    /**
     * Joue la vidéo qui est au centre
     */
    playTheOne(){
        if(this.activeOne){
            this.activeOne.playFirst();
        }
    }
}