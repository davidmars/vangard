$body.on("mousedown","[data-is-lang]:not(.active)",function(e){
    e.preventDefault();
    e.stopPropagation();
    let lang=$(this).attr("data-is-lang");
    let url=PovHistory.currentPageInfo.languagesUrls[lang];
    document.location=url+"?i=0"; //cache l'intro
});