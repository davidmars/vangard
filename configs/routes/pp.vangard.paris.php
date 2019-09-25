<?php
the()->fmkHttpRoot="";// /github/classiq-startup
the()->configProjectUrl=new \Pov\Configs\ProjectUrl("pp.vangard.paris"); // localhost/github/classiq-startup/fr
the()->fileSystem=new \Pov\Configs\FileSystem("project");
the()->configProjectUrl->seoActive=true;
the()->boot->loadProject("project");
the()->project->langCode="en";

include (__DIR__ . "/pp.vangard.paris.php");