<?php
/**
 * @var \Classiq\Models\Preview $vv
 */
?>
<?if($vv->video()):?>
<div class="preview paused">
    <img src="<?=$vv->thumbnail()->href()?>">
    <video size="<?=$vv->video(false)->humanFileSize()?>"
           preload="none"
           class=""
           loop="loop" muted="muted"
           src="<?=$vv->video()?>"
    ></video>
</div>
<?endif?>