<?php
/** @var \Classiq\Models\Nav $menu */
$menu=\Classiq\Models\Nav::getByName("menu",true);

use Pov\Utils\StringUtils; ?>
<nav id="nav">

    <div id="nav-bar" >

        <a href="#" data-nav-menu-toggle  class="unstyled logo">
            <?=$view->render("layout/hello-logo")?>
        </a>
        <div class="right">
            <a href="#"  burger-icon class="unstyled"></a>
            <?if(count(cq()->langActives(false))>1):?>
                <div class="langs">
                <?foreach (cq()->langActives(false) as $langCode):?>
                    <a class="hvr <?=the()->project->langCode==$langCode?"active":""?>"
                       data-is-lang="<?=$langCode?>" href="#">
                        <span class="underline-hvr""><?=$langCode?></span>
                    </a>
                <?endforeach;?>
                </div>
            <?endif;?>
        </div>
    </div>

</nav>

<div id="nav-content">

    <div class="left">
        <?=$menu
            ->wysiwyg()
            ->field("vars.leftContent_lang")
            ->string(StringUtils::FORMAT_HTML)
            ->setMediumButtons(site()->richTextFormats)
            ->htmlTag("div",true,true)
            ->addClass("text-rich");
        ?>
    </div>

    <div class="right">
        <?=$menu
            ->wysiwyg()
            ->field("vars.rightContent_lang")
            ->string(StringUtils::FORMAT_HTML)
            ->setMediumButtons(site()->richTextFormats)
            ->htmlTag("div",true,true)
            ->addClass("text-rich");
        ?>
    </div>

</div>