<?php
/**
 * @var \Classiq\Models\Preview $vv
 */
?>
<?if($vv->video()):?>
<div class="preview paused">
    <img data-src="<?=$vv->thumbnail()->href()?>" class="lazyload">
    <video size="<?=$vv->video(false)->humanFileSize()?>"
           preload="none"
           loop="loop" muted="muted"
           src="<?=$vv->video()?>"
    ></video>
</div>
<?endif?>