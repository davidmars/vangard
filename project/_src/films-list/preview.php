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
           loop="loop" muted="muted" playsinline="playsinline"
           >
        <source src="<?=$vv->video(true,false,false)?>" type="<?=$vv->video(true,false,true)?>">
        <?if($vv->video(true,true)):?>
            <source src="<?=$vv->video(true,true,false)?>" type="<?=$vv->video(true,true,true)?>">
    <?endif;?>


    </video>
</div>
<?endif?>