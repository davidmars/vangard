<?php
/** @var Film $vv */
use Classiq\Models\Film;
the()->htmlLayout()->pageInfo->isHome=false;
$view->inside("layout/layout",$vv);
?>
<div class="film-page">

        <div class="top container-page">
            <div>
                <iframe class="emebed"
                        src="<?=$vv->getVideoEmbed()?>"
                        frameborder="0"
                        allow="autoplay; fullscreen" allowfullscreen>
                </iframe>
            </div>
        </div>

        <div class="body container-page">
            <div class="row align-items-end">
                <div class="col-sm-6 col-lg-6 ">
                    <?=$vv->wysiwyg()
                        ->field("name_lang")
                        ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                        ->setDefaultValue($vv->name)
                        ->htmlTag("h1")
                    ?>
                    <hr>
                </div>
                <div class="d-none d-lg-block col-lg-2">
                    <hr>
                </div>
                <div class="col-sm-6 col-lg-4">
                    <h2 class="h1">
                        <span class="h2">
                          <?=$vv->wysiwyg()
                              ->field("category_lang")
                              ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                              ->setPlaceholder("Category")
                              ->htmlTag("span")
                          ?>
                        -
                        <?=$vv->wysiwyg()
                            ->field("year")
                            ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                            ->setPlaceholder("1984")
                            ->htmlTag("span")
                        ?>
                        </span>

                    </h2>
                    <hr>

                </div>
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <?=$vv->wysiwyg()
                        ->field("subtitle_lang")
                        ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                        ->setPlaceholder("sous titre")
                        ->htmlTag("h2")
                    ?>
                    <div class="text-rich">
                        <?=$vv->wysiwyg()
                            ->field("about_lang")
                            ->string(\Pov\Utils\StringUtils::FORMAT_HTML)
                            ->setPlaceholder("A propos bla bla...")
                            ->htmlTag("div")
                        ?>
                    </div>

                    <hr>

                </div>
                <div class="col-sm-2">

                </div>
                <div class="col-sm-4">
                    <h2>Credits</h2>
                    <div class="text-rich">
                        <?=$vv->wysiwyg()
                            ->field("credits_lang")
                            ->string(\Pov\Utils\StringUtils::FORMAT_HTML)
                            ->setPlaceholder("sous titre")
                            ->htmlTag("div")
                        ?>
                    </div>
                </div>
            </div>

            <?=$vv->wysiwyg()->field("blocks")
                ->listJson(site()->blocksList)
                ->htmlTag()
                ->addClass("blocks");
            ?>

        </div>
        <div class="footer container-page py-big">

            <?=$view->render("components/prev-next/prev-next",
                [
                    "prev"=>$vv->previous(),
                    "next"=>$vv->next(),
                ]
            )?>

        </div>















</div>
