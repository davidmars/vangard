//require("./prev-next.inline.svg");
/**
 * UI précédent suivant
 */
export default class PrevNext{


    constructor($jq){
        /**
         * L'élément complet
         * @type {jQuery}
         */
        this.$jq=$jq;
        /**
         * Le bouton précedent
         * @type {jQuery}
         */
        this.$prev=$jq.find("[prev]");
        /**
         * Le bouton suivant
         * @type {jQuery}
         */
        this.$next=$jq.find("[next]");

        let $svg=this.$jq.find("svg");
        $jq.find(".svg-icon").append($svg);
        let $svgPrev=$svg.find("#prev");
        let $svgNext=$svg.find("#next");
        let $line=$svg.find(".horiz-line");

        this.$prev.on("mouseenter",function(){
            $svgPrev.addClass("hover");
            toPrev();
        });
        this.$next.on("mouseenter",function(){
            $svgNext.addClass("hover");
            toNext();
        });
        this.$prev.on("mouseleave",function(){
            $svgPrev.removeClass("hover");
            rien();
        });
        this.$next.on("mouseleave",function(){
            $svgNext.removeClass("hover");
            rien();
        });

        let ease= Power4.easeOut;

        let toPrev=function(){
            TweenMax.to($line,0.2,{attr:{x1:0},ease:ease});
            TweenMax.to($line,0.4,{attr:{x2:70-10},ease:ease})
        };
        let toNext=function(){
            TweenMax.to($line,0.4,{attr:{x1:70+10},ease:ease});
            TweenMax.to($line,0.2,{attr:{x2:140},ease:ease})
        };
        let rien=function(){
            TweenMax.to($line,0.4,{attr:{x1:70,x2:70},ease:Bounce.easeOut})
        };

        rien();

    }

    static initFromDom(){
        let $all= $body.find("[data-js='PrevNext']").not(".js-prev-next-init");
        $all.each(function(){
            let prevNext=new PrevNext($(this));
            $(this).addClass("js-prev-next-init");
            /*
            prevNext.$next.on("click",function(e){
                e.preventDefault();
                window.pov.history.goUrl(PovHistory.currentPageInfo.nextVideo);
            });
            prevNext.$prev.on("click",function(e){
                e.preventDefault();
                window.pov.history.goUrl(PovHistory.currentPageInfo.prevVideo);
            });
             */
        })

    }


}