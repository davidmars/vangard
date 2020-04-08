<?php
the()->fmkHttpRoot="";// /github/classiq-startup
the()->configProjectUrl=new \Pov\Configs\ProjectUrl("vangard.paris"); // localhost/github/classiq-startup/fr
the()->fileSystem=new \Pov\Configs\FileSystem("project");
the()->configProjectUrl->seoActive=true;
the()->boot->loadProject("project");
the()->project->langCode="en";

include (__DIR__ . "/prod.shared.php");