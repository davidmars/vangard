<?php
/** @var \Classiq\Models\Nav $menu */
$menu=\Classiq\Models\Nav::getByName("menu",true);
?>
<nav id="nav">

    <div id="nav-bar" >

        <button data-nav-menu-toggle class="unstyled logo">
            <span>h</span>
            <span>e</span>
            <span>l</span>
            <span>l</span>
            <span>o,</span>

            <span>&nbsp;</span>

            <span>w</span>
            <span>e</span>
            <span>&nbsp;</span>
            <span>are</span>

            <span>&nbsp;</span>

            <b>v</b>
            <span>an</span>
            <b>g</b>
            <span>a</span>
            <b>rd</b>
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