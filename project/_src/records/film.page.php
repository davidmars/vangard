<?php
/** @var Film $vv */
use Classiq\Models\Film;
the()->htmlLayout()->pageInfo->isHome=false;
$view->inside("layout/layout",$vv);
?>
<div class="film-page">
        <div id="fs-wrap" class="fs-wrap">
            <div class="top zzzcontainer-page full">
                <div  class="js-video-wrap">
                    <button class="play-button intro-fade">
                        <?=pov()->svg->use("startup-play-thin")?>
                    </button>

                    <div class="js-video" src="<?=$vv->getVideoEmbed()?>"></div>

                </div>
            </div>

            <div class="body container-page">
                <div class="row align-items-end js-after-video">
                    <div class="col-sm-6 col-lg-6 ">
                        <div class="title-player">
                            <?=$vv->wysiwyg()
                                ->field("name_lang")
                                ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                                ->setDefaultValue($vv->name)
                                ->htmlTag("h1")
                                ->addClass("intro-fade")
                                ->addClass("title")
                            ?>
                            <div timer class="intro-fade"></div>

                            <button play class="intro-fade">
                                <?=pov()->svg->use("startup-play-thin")->addClass("play")?>
                                <?=pov()->svg->use("startup-pause-thin")->addClass("pause")?>
                            </button>
                            <button fs class="intro-fade" title="Full Screen">
                                <?=pov()->svg->use("startup-full-screen-thin")?>
                            </button>
                        </div>

                        <div progress-container>
                            <div progress></div>
                            <div progress-buffer></div>
                            <hr class="intro-fade">
                        </div>


                    </div>
                    <div class="d-none d-xl-block col-xl-2">
                        <hr class="intro-fade">
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <h2 class="h1">
                            <span class="h2 ">
                              <?=$vv->wysiwyg()
                                  ->field("category_lang")
                                  ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                                  ->setPlaceholder("Category")
                                  ->htmlTag("span")
                                  ->addClass("intro-fade")
                              ?>
                            -
                            <?=$vv->wysiwyg()
                                ->field("year")
                                ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                                ->setPlaceholder("1984")
                                ->htmlTag("span")
                                ->addClass("intro-fade")
                            ?>
                            </span>

                        </h2>

                        <hr class="intro-fade">

                    </div>
                </div>
            </div>
        </div>

        <div class="body container-page">


            <div class="row">
                <div class="col-md-6">
                    <?=$vv->wysiwyg()
                        ->field("subtitle_lang")
                        ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                        ->setPlaceholder("sous titre")
                        ->htmlTag("h2")
                    ->addClass("h2mb")
                    ?>
                    <div class="text-rich">
                        <?=$vv->wysiwyg()
                            ->field("about_lang")
                            ->string(\Pov\Utils\StringUtils::FORMAT_HTML)
                            ->setMediumButtons(site()->richTextFormats)
                            ->setPlaceholder("A propos bla bla...")
                            ->htmlTag("div")
                        ?>
                    </div>

                    <hr class="my-big">

                </div>
                <div class="d-none d-xl-block col-xl-2">
                </div>
                <div class="col-md-6 col-xl-4">
                    <h2 class="h2mb">Credits</h2>
                    <div class="text-rich">
                        <?=$vv->wysiwyg()
                            ->field("credits_lang")
                            ->string(\Pov\Utils\StringUtils::FORMAT_HTML)
                            ->setMediumButtons(site()->richTextFormats)
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
