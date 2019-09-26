<?php
/** @var \Classiq\Models\Film $vv */
?>
<div class="cq-box wysiwyg-config-preview">

    <fieldset>
        <label>Vidéo principale</label>
        <?=$vv->wysiwyg()->field("video")
            ->string()
            ->textarea("url vimeo")
        ?>
    </fieldset>
    <fieldset>
        <label>Sous titre</label>
        <?=$vv->wysiwyg()->field("subtitle_en")
            ->string()
            ->setPlaceholder("Mon super sous titre ici")
            ->input()
        ?>
    </fieldset>
    <fieldset>
        <label>Catégorie</label>
        <?=$vv->wysiwyg()->field("category_en")
            ->string()
            ->setPlaceholder("Advertising, Music video...")
            ->input()
        ?>
    </fieldset>
    <fieldset>
        <label>Année</label>
        <?=$vv->wysiwyg()->field("year")
            ->string()
            ->setPlaceholder("1999")
            ->input()
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