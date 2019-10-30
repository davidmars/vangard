import SmoothScrollbar from "smooth-scrollbar";
import FilmPreview from "./FilmPreview";

export default class Films {

    constructor($main){
        let me = this;
        this.$main=$main;
        /**
         *
         * @type {Scrollbar}
         */
        this.scroll=SmoothScrollbar.init(me.$main[0], {
            damping:0.09
        });
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
                me.setActiveOne(fp);
            });
        });
    }

    setActiveOne(preview){
        if(this.activeOne !== preview){
            if(this.activeOne){
                this.activeOne.pauseAll();
                this.activeOne.change();
            }
        }
        this.$main.find("[the-one]").removeAttr('the-one')
        this.activeOne=preview;
        if(preview){
            preview.playFirst();
            preview.$film.attr("the-one","");
        }
    }
}