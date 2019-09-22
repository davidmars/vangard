import TweenMax from "gsap";
require("./one-by-one.less");
/**
 *
 */
export default class OneByOne{
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
    constructor($main,speed=1,lockCenter){
        let me = this;
        OneByOne.all.push(this);
        this.$main=$main;
        this.speed=speed;
        this.lockCenter=lockCenter;
        this.$content=this.$main.find(".content");
        this._lastActive=false;
        this.refresh();
        this._enabled=true;
        this.enabled=true;
    }

    /**
     *
     * @private
     */
    _refreshVariables(){
        this.$items=this.$content.find(".item");
        this.__itemsCount=this.$items.length;
        this.__itemHeight=this.$items.outerHeight();
        this.$main.height(
            this.__itemsCount*this.__itemHeight*(1/this.speed)
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
        this._refreshVariables();
        this.loop();
    }

    loop(){
        if(!this.enabled){
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
            this.$items.removeAttr("the-one");
            this.$items.eq(active).attr("the-one","");
        }
        if(this.lockCenter){
            y=this.ratio(active,itemsCount-1,max,0,min);
        }
        TweenMax.set(this.$content,{"top":y});
        /*
        console.log("scrolll",scrolll);
        console.log("winH",winH);
        console.log("docH",docH);
        console.log("contentH",contentH);
        console.log("y",y);
         */

        //TweenMax.to(this.$content,0.5,{"top":y});


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