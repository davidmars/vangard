<?php
/** @var \Classiq\Models\Film $vv */
?>
<div class="cq-box wysiwyg-config-preview">

    <fieldset>
        <label>Vidéo principale</label>
        <?=$vv->wysiwyg()->field("video")
            ->file()
            ->setMimeAcceptVideoOnly()
            //->onSavedRefresh("$(this).closest('[data-pov-v-path]')")
            ->button()->render()
        ?>
    </fieldset>

    <fieldset>
        <label>Previews</label>
        <?=$vv->wysiwyg()->field("previews")
            ->recordPicker("preview",true)
        ->buttonRecord()
        ->render()
        ?>
    </fieldset>

</div>