<?php
/** @var \Classiq\Models\Preview $vv */
?>
<div class="cq-box wysiwyg-config-preview">

    <fieldset>
        <label>Première image</label>
        <?=$vv->wysiwyg()->field("thumbnail")
            ->file()
            ->setMimeAcceptImagesOnly()
            //->onSavedRefresh("$(this).closest('[data-pov-v-path]')")
            ->button()->render()
        ?>
    </fieldset>

    <fieldset>
        <img class="img-responsive" src="<?=$vv->thumbnail()->href()?>">
    </fieldset>

    <fieldset>
        <label>Vidéo WEBM</label>
        <?=$vv->wysiwyg()->field("video")
            ->file()
            ->setMimeAcceptVideoOnly()
            ->button()->render()
        ?>
        <video style="object-fit: cover;"
               controls class="img-responsive"
               src="<?=$vv->video(true)?>"></video>
        <code><?=$vv->video(true,false,true)?></code>
    </fieldset>

    <fieldset>

        <label>Vidéo IOS</label>

        <?=$vv->wysiwyg()->field("videoios")
            ->file()
            ->setMimeAcceptVideoOnly()
            ->button()->render()
        ?>

        <video style="object-fit: cover;"
               controls class="img-responsive"
               src="<?=$vv->video(true,true)?>"></video>
            <code><?=$vv->video(true,true,true)?></code>
    </fieldset>

</div>