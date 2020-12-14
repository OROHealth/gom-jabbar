# CaribouCo

## Prérequis

* node.js
* yarn
* docker / docker-compose OU MongoDB 4.2

## Installation

### Serveur

Assurez-vous qu'aucun programme n'utilise les ports 33333 et 33334

#### Avec Docker

Tapez les commandes suivantes :

```
  cd ./caribou/back
  docker-compose up
```

#### Classique

Créez le fichier `./caribou/back/.env`, similaire à l'exemple suivant :

```
CARIB__ACCEPTED_CORS_ORIGINS=http://localhost:3000
CARIB__MG_HOST=localhost
CARIB__MG_PORT=27017
CARIB__MG_DATABASE=cariboudb
```

**Adaptez les valeurs en fonction de votre configuration.**

|Variable                    |Description   |
|----------------------------|--------------|
|CARIB__ACCEPTED_CORS_ORIGINS|Url du client |
|CARIB__MG_HOST              |Host MongoDB  |
|CARIB__MG_PORT              |Port MongoDB  |
|CARIB__MG_DATABASE          |Schéma MongoDB|

Si votre accès à MongoDB est protégé, ajoutez les variables suivantes :

|Variable                    |Description         |
|----------------------------|--------------------|
|CARIB__MG_USER              |Utilisateur MongoDB |
|CARIB__MG_PASSWORD          |Mot de passe MongoDB|

Tapez ensuite les commandes suivantes :

```
  cd ./caribou/back
  yarn
  yarn start
```

### Client

Assurez-vous qu'aucun programme n'utilise le port 3000, puis tapez dans un terminal les commandes suivantes :

```
  cd ./caribou/front
  yarn
  yarn start
```

Si votre navigateur ne s'ouvre pas automatique, rendez-vous à l'adresse suivante : http://localhost:3000

## Fonctionnel

- Inscription d'un nouvel utilisateur
- Connexion / Déconnexion d'un utilisateur
- Affichage d'une carte cliquable présentant :
  - Les caribous prêts à échanger des bois
  - Les humains ajoutés par l'utilisateur au cours de sa session
  - La zone perturbée par les humains
- Affichage d'une modale lors du clic sur la carte permettant :
  - De signaler un humain avec ses caractéristiques
  - De vérifier si un humain a été signalé dans un périmètre paramétrable
  - De signaler un caribou prêt à échanger des bois
- Affichage d'une messagerie en direct permettant :
  - D'échanger des messages sécurisé avec les personnes connectées
  - D'afficher les notifications concernant les entrées et sorties des humains de la zone perturbée
  - D'afficher le résultat des vérifications de signalement d'humains
