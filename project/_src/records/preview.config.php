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
        <label>Vidéo</label>
        <?=$vv->wysiwyg()->field("video")
            ->file()
            ->setMimeAcceptVideoOnly()
            //->onSavedRefresh("$(this).closest('[data-pov-v-path]')")
            ->button()->render()
        ?>
    </fieldset>

</div>