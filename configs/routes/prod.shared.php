<?php
the()->project->languages=[
    "fr",
    "en"
];
the()->project->languagesUrls=[
    "fr"=>"https://fr.vangard.paris",
    "en"=>"https://vangard.paris"
];
//force https?
the()->configProjectUrl->forceHttps=true;
// https://docs.google.com/spreadsheets/d/1kefhXt0Z7g0P2cGItQK4k_hqhSoFTMaJyvzNYjKeqw8
// Copiez-collez ce google Sheet pour pouvoir le modifier puis modifiez l'url. Vous pouvez bien entendu utiliser un csv en local mais c'est moins pratique :)
the()->project->config_translations_csv_url="https://docs.google.com/spreadsheets/d/1kefhXt0Z7g0P2cGItQK4k_hqhSoFTMaJyvzNYjKeqw8/export?gid=0&format=csv";
the()->project->config_translations_debug=false; //quand true recharge à chaque fois le CSV

//config options

//Google webmaster tools
the()->htmlLayout()->googleSiteVerification="fPbeMz8zKzcvx3QlxtCJZWKkBvyWJDR5m_BDpBGFcIU";

//Google analytics vangard
site()->googleAnalyticsId="UA-148454182-1";
