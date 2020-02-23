<?php
/**
 * @var \Classiq\Models\Preview $vv
 */
?>
<?if($vv->video()):?>
<div class="preview paused">
    <img data-src="<?=$vv->thumbnail()->sizeMax(1200,1200)->jpg()->href()?>" class="lazyload">
<?/*<img src="<?=$vv->thumbnail()->href()?>" >*/?>
    <video size="<?=$vv->video(false)->humanFileSize()?>"
           preload="none"
           loop="loop" muted="muted"
           src="<?=$vv->video()?>"
    ></video>
</div>
<?endif?>