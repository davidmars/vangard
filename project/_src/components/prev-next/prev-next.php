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
<nav data-js="PrevNext">

        <?if($prev):?>
        <a class="h1" prev href="<?=$prev->href()?>"><span><?=$prev->name?></span></a>
        <?endif;?>
        <?if($next):?>
        <a class="h1" next href="<?=$next->href()?>"><span><?=$next->name?></span></a>
        <?endif?>
        <div class="svg-icon"></div>
        <?//=$view->render("svg","prev-next")?>
        <?=file_get_contents(__DIR__."/prev-next.inline.svg")?>

</nav>