<?php
/** @var \Classiq\Models\Nav $menu */
$list=\Classiq\Models\Nav::getByName("liste de films",true);
?>
<div id="films">

    <div class="tick"></div>
    <div class="line"></div>
    <div class="mouse-selector"></div>

    <?=$list->wysiwyg()->field("vars.films")
    ->listJson("films-list/film")
    ->contextMenuSize(SIZE_SMALL)
        ->onlyRecords("film")
    ->htmlTag()
    ->addClass("list content")?>
</div>
