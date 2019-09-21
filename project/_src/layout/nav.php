<?php
/** @var \Classiq\Models\Nav $menu */
$menu=\Classiq\Models\Nav::getByName("menu",true);
?>
<nav id="nav">

    <div id="nav-bar" >

        <button data-nav-menu-toggle class="unstyled logo">
            <?=$view->render("layout/hello-logo")?>
        </button>

    </div>

    <div id="nav-content">

        <div>
            <?=utils()->string->loremIspum(100,100)?>>

        </div>
        <div>
            <?=utils()->string->loremIspum(100,100)?>>
        </div>

    </div>
</nav>