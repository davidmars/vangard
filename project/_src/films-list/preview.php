<?php
/**
 * @var \Classiq\Models\Preview $vv
 */
?>
<div class="preview paused">
    <img src="<?=$vv->thumbnail()->href()?>">
    <video class=""
           zzautoplay="autoplay"
           loop="loop"
           muted="muted"
           src="<?=$vv->video()?>"
           zzsrc="https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm"
    ></video>
</div>