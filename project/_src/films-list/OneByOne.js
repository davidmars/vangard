import TweenMax from "gsap";
var EventEmitter = require('event-emitter-es6');
require("./one-by-one.less");
/**
 *
 */
export default class OneByOne extends EventEmitter{




    constructor($main,speed=1,lockCenter){
        super();
        let me = this;
        OneByOne.all.push(this);
        this.$main=$main;
        this.speed=speed;
        this.lockCenter=lockCenter;
        this.$content=this.$main.find(".content");
        this._lastActive=false;
        this.refresh();
        /**
         * La liste est active ou pas?
         * @type {boolean}
         * @private
         */
        this._enabled=true;
        this.enabled=true;
        this._isModeHover=false;
    }

    /**
     *
     * @private
     */
    _refreshVariables(){
        this.__winHeight = $(window).height();
        this.$items=this.$content.find(".item");
        this.__itemsCount=this.$items.length;
        this.__itemHeight=this.$items.outerHeight();

        this.$main.height(
            this.__itemsCount*this.__itemHeight + this.__winHeight
        );


        this.__contentHeight=this.$content.height();
        this.__docHeight = $(document).height();
        this.__winHeight = $(window).height();
        this.__minPos=this.__winHeight/2 - this.__itemHeight/2;
        this.__maxPos=this.__winHeight /2  - this.__contentHeight + this.__itemHeight / 2;
    }
    /**
     * Rafraichit la taille (en fonction du nombre d'items)
     */
    refresh(){
        if(this.isModeHover){
           return;
        }
        this._refreshVariables();
        this.loop();
    }

    loop(){
        if(!this.enabled || this.isModeHover){
            if(this.isModeHover){
                this.$main.css("opacity",1+Math.random());
            }
            return;
        }
        let itemsCount=this.__itemsCount;
        let docH = this.__docHeight;
        let winH = this.__winHeight;
        let itemH=this.__itemHeight;
        let min=this.__minPos;
        let max=this.__maxPos;
        let scrolll = $(window).scrollTop();
        let percent = (scrolll / (docH - winH)) * 100;

        let y=this.ratio(
            percent,
            100,
             max,
            0,
             min
        );
        //actif ?
        let active=this.ratio(percent,100,itemsCount-1,0,0);
        active=Math.round(active);
        if(active !== this._lastActive){
            console.log(active,this._lastActive);
            this._lastActive=active;
            let $oldActive=this.$items.filter("[the-one]");
            let $active=this.$items.eq(active);
            if($oldActive.length){
                this._isNotTheOne($oldActive);
            }
            if($active.length){
                this._isTheOne($active);
            }

        }
        if(this.lockCenter){
            y=this.ratio(active,itemsCount-1,max,0,min);
        }
        y=Math.round(y);
        TweenMax.set(this.$content,{"top":y});
        //TweenMax.to(this.$content,3,{"y":y,ease:Elastic.easeOut});
        /*
        console.log("scrolll",scrolll);
        console.log("winH",winH);
        console.log("docH",docH);
        console.log("contentH",contentH);
        console.log("y",y);
         */

        //TweenMax.to(this.$content,0.5,{"top":y});


    }

    get isModeHover() {
        return this._isModeHover;
    }
    set isModeHover(value) {
        let me=this;
        let $items=this.$content.find(".item");
        this.$main.attr("is-mode-hover",value?"true":"false");
        this._isModeHover = value;
        this.$main.height("auto");
        $items.off("mouseenter").off("mouseleave");
        if(value){
            $items.on("mouseenter",function(){
                me._isTheOne($(this));
            });
            $items.on("mouseleave",function(){
                me._isNotTheOne($(this));
            })
        }
    }
    /**
     * Définit un itm comme actif
     * @param $item
     * @private
     */
    _isTheOne($item){
        this.emit("ACTIVE",$item);
        $item.attr("the-one","");

    }

    /**
     * Définit un item comme inactif
     * @param $item
     * @private
     */
    _isNotTheOne($item){
        this.emit("INACTIVE",$item);
        $item.removeAttr("the-one");
    }


    /**
     *
     * @param {number} inputValue
     * @param {number} inputMax
     * @param {number} outputMax
     * @param {number} inputMin
     * @param {number} outputMin
     * @returns {number}
     */
    ratio(inputValue, inputMax, outputMax, inputMin=.0, outputMin=.0){
        let product = (inputValue - inputMin) / (inputMax - inputMin);
        return ((outputMax - outputMin) * product) + outputMin;
    };
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        let me=this;
        this._enabled = value;
        this.$main.attr("one-by-one-enabled",value?'1':'0');
        if(!this.enabled){
            TweenMax.set(this.$content,{"top":0});
        }else{
            this.refresh();

            setTimeout(function(){
                me.refresh()
            },1000);

        }

    }

    static initFromDom(){
        $("[one-by-one='']").each(function(){
            let o=new OneByOne($(this),1.2,true);
            $(this).attr("one-by-one","init");
        })
    }

    /**
     * Renvoie la liste des occurences après quelle ait été éventuellement nettoyée
     * @returns {OneByOne[]}
     */
    static allObjects(){
        for(let i=0;i<OneByOne.all.length;i++){
            let inDom=OneByOne.all[i].$main.closest(document.documentElement)
            if(!inDom){
                console.log("clean",OneByOne.all[i].$main)
                OneByOne.all.splice(i,1);
            }
        }
        //console.log(OneByOne.all);
        return OneByOne.all;
    }

    /**
     * Déclenché au scroll
     * @private
     */
    static _onScroll(){
        let all=OneByOne.allObjects();
        //console.log("sc");
        for(let i=0;i<all.length;i++){
            all[i].loop();
        }

    }

    /**
     * Déclenché au resize de la fenêtre
     * @private
     */
    static _onWinResize(){
        let all=OneByOne.allObjects();
        //console.log("rz");
        for(let i=0;i<all.length;i++){
            all[i].refresh();
            all[i].loop();
        }
    }

}
/**
 *
 * @type {OneByOne[]}
 */
OneByOne.all=[];

window.addEventListener("scroll", function(ev) {
    OneByOne._onScroll();
}, false);

window.addEventListener("orientationchange", function(ev) {
    OneByOne._onWinResize();
}, false);
window.addEventListener("resize", function(ev) {
    OneByOne._onWinResize();
}, false);


module.export=OneByOne;