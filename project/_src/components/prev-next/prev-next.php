<?php
use Classiq\Models\Page;
/**
 * @var Classiq\Models\Page[} $vv Une page de film
 *
 */
/** @var Classiq\Models\Page $prev */
$prev=null;
/** @var Classiq\Models\Page $next */
$next=null;
if(isset($vv["prev"])){
    $prev=$vv["prev"];
}
if(isset($vv["next"])){
    $next=$vv["next"];
}

?>
<nav data-js="PrevNext" class="my-big">

        <?if($prev):?>
        <a class="h1" prev  href="<?=$prev->href()?>"><span page-transition-click="TRANSI_FILM_FILM"><?=$prev->name?></span></a>
        <?endif;?>
        <?if($next):?>
        <a class="h1" next href="<?=$next->href()?>"><span page-transition-click="TRANSI_FILM_FILM"><?=$next->name?></span></a>
        <?endif?>
        <div class="svg-icon"></div>
        <?//=$view->render("svg","prev-next")?>
        <?=file_get_contents(__DIR__."/prev-next.inline.svg")?>

</nav>