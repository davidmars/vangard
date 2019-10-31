<?php
/**
 * Un block avec un texte paragraphe formaté
 * @var Classiq\Models\JsonModels\ListItem $vv
 *
 */
$cols=$vv->getData("cols","1");
?>
<div <?=$vv->wysiwyg()->attr()?> class="block block-texte py-medium">


        <div class="container-page">
            <?if($cols==="1"):?>
                <?=$vv->wysiwyg()
                    ->field("texte_lang")
                    ->string(\Pov\Utils\StringUtils::FORMAT_HTML)
                    ->setPlaceholder("Saisissez votre texte")
                    ->setMediumButtons(site()->richTextFormats)
                    ->htmlTag("div")
                    ->addClass("text-rich")
                ?>
            <?else:?>
                <div class="row">
                    <div class="col-lg-6">
                        <?=$vv->wysiwyg()
                            ->field("texte_lang")
                            ->string(\Pov\Utils\StringUtils::FORMAT_HTML)
                            ->setPlaceholder("Saisissez votre texte")
                            ->setMediumButtons(site()->richTextFormats)
                            ->htmlTag("div")
                            ->addClass("text-rich")
                        ?>
                    </div>
                    <div class="col-lg-6">

                        <?=$vv->wysiwyg()
                            ->field("texte2_lang")
                            ->string(\Pov\Utils\StringUtils::FORMAT_HTML)
                            ->setPlaceholder("Saisissez votre texte")
                            ->setMediumButtons(site()->richTextFormats)
                            ->htmlTag("div")
                            ->addClass("text-rich")
                        ?>
                    </div>
                </div>
            <?endif?>
        </div>


</div>

