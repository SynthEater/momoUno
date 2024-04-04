<?php
     require_once "classtest.php";

     $testvalue = new testserver();
 
     $jbleu = $_GET['jbleu'];
     $jjanue = $_GET['jjaune'];
     $jvert = $_GET['jvert'];
     $jrouge = $_GET['jrouge'];
     $valeurcarte = $_GET['valeurcarte'];
     $carte = $_GET['carte'];
     $tourjoueur = $_GET['tourjoueur'];
     
 
     $testvalue->setjbleu($jbleu);
     $testvalue->setjjaune($jjanue);
     $testvalue->setjvert($jvert);
     $testvalue->setjrouge($jrouge);
     $testvalue->setvaleurcarte($valeurcarte);
     $testvalue->setcarte($carte);
     $testvalue->settourjoueur($tourjoueur);
     $testvalue->affiche();
?>