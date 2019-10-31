<?php
/**
 * Un block avec un texte paragraphe formaté
 * @var Classiq\Models\JsonModels\ListItem $vv
 *
 */
?>
<div <?=$vv->wysiwyg()->attr()?> class="block block-texte py-medium">
    <div class="container-page">
            <?=$vv->wysiwyg()
                ->field("texte_lang")
                ->string(\Pov\Utils\StringUtils::FORMAT_HTML)
                ->setPlaceholder("Saisissez votre texte")
                ->setMediumButtons(site()->richTextFormats)
                ->htmlTag("div")
                ->addClass("text-rich")
            ?>
    </div>
</div>

