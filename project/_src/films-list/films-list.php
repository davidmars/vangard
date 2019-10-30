<?php
/** @var \Classiq\Models\Nav $menu */
$list=\Classiq\Models\Nav::getByName("liste de films",true);
?>
<div id="films" one-by-one>

    <?=$list->wysiwyg()->field("vars.films")
    ->listJson("films-list/film")
    ->contextMenuSize(SIZE_SMALL)
        ->onlyRecords("film")
    ->htmlTag()
    ->addClass("list content")?>
</div>
