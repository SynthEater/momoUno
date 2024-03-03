![logo](smallLogo.png)
# Pour tester la connexion au serveur TCP:
## 1-Installer nodejs
      -Windows: allez sur leur site
      -Linux: installez le package 'nodejs'

## 2-Cloner ou copier
      -telechargez Github Desktop et clonez la repo
      -(sinon)copiez le contenu du fichier 'TCPserver.js' ci-dessus
       et copiez le dans un .js file (appellez-le TCPserver.js)

## 3-Runner le serveur
      -dans le terminal de vscode (ou autre) faites commande: node TCPserver.js
      -Vous devriez voir: 0.0.0.0 et le # de port qu'on utilise
       si oui, le serveur ecoute sur ce port et accepte toutes les addresses



## 4-Se connecter au serveur
      -connectez-vous avec votre code Python ou testez connection avec telnet
       ex commande: telnet [votreIP] [PORT]
      -sinon connectez-vous par telnet avec putty
      -dans le terminal du serveur vous allez voir: client connected (ip)

## 5-Communication
      -vous pouvez envoyer des messages a partir du client vers le serveur,
       qui les affiche dans son terminal avec l'ip du client qui l'a envoyer

## 6-Connections
      -vous pouvez connecter autant de client que vous voulez
      -vous pouvez arreter le serveur avec ctrl-c dans le terminal



      

