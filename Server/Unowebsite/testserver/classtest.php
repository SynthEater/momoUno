<?php
    class testserver
    {
        protected $jbleu;
        protected $jjaune;
        protected $jvert;
        protected $jrouge;
        protected $valeurcarte;
        protected $carte;
        protected $tourjoueur;

            function __construct()
            {
                $this->jbleu = 7;
                $this->jjaune = 7;
                $this->jvert = 7;
                $this->jrouge = 7;
                $this->valeurcarte = "Carte Uno"; 
                $this->carte = "card_back_large";
                $this->tourjoueur = "JoueurBleu";
            }

        public function setjbleu($value)
        {
            $this->jbleu=$value;
        }

        public function setjjaune($value)
        {
            $this->jjaune=$value;
        }

        public function setjvert($value)
        {
            $this->jvert=$value;
        }

        public function setjrouge($value)
        {
            $this->jrouge=$value;
        }

        public function setvaleurcarte($value)
        {
            $this->valeurcarte=$value;
        }

        public function setvcarte($value)
        {
            $this->carte=$value;
        }

        public function settourjoueur($value)
        {
            $this->tourjoueur=$value;
        }
    }

    public function affiche()
    {
        echo "Le joueur bleu a $this->jbleu cartes \n";
        echo "Le joueur jaune a $this->jjaune cartes \n";
        echo "Le joueur vert a $this->jvert cartes \n";
        echo "Le joueur rouge a $this->jrouge cartes \n";
        echo "La carte sur le dessus est $this->valeurcarte \n";
        echo "La valeur de la carte est $this->carte \n";
        echo "C'est au tour du $this->tourjoueur \n";
    }

?>