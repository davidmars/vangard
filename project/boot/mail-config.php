<?php

use Classiq\Utils\MailConfig;
cq()->defaultMailSender=$m=new MailConfig();
$m->port="465";
$m->SMTPSecure="ssl";
$m->host="SSL0.OVH.NET";
$m->password="1Lablatte";
$m->username="hello@vangard.paris";
$m->displayName="hello !";
$m->SMTPAuth=true;
