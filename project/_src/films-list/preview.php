<?php
/**
 * @var \Classiq\Models\Preview $vv
 */
?>
<div class="preview paused">
    <img src="<?=$vv->thumbnail()->href()?>">
    <video class="" loop="loop" muted="muted" src="<?=$vv->video()?>"
    ></video>
</div>