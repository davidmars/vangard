<?php
/** @var \Classiq\Models\Nav $menu */
$list=\Classiq\Models\Nav::getByName("liste de films",true);
?>
<div id="films">

    <?=$list->wysiwyg()->field("vars.films")
    ->listJson("films-list/film")
    ->contextMenuSize(SIZE_SMALL)
        ->onlyRecords("film")
    ->htmlTag()
    ->addClass("list content")?>

    <div class="mask">
        <span class="debug">hello</span>
        <i class="a"></i>
        <i class="b"></i>
    </div>



</div>
