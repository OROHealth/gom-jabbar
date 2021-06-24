
Bonjour, Je suis JEAN GABIN NGUENDA NANA. 

Ce travail est ma proposition suite à l’exigence de sa grandeur Miaou XII décrit ici https://github.com/OROHealth/gom-jabbar/blob/main/caternet/CatWeb.md.

# Infrastructure

Mon infrastructure est principalement composée de deux grandes parties.

La première partie est un cluster Kubernetes déployé sur l’infrastructure de Google (GKE). Ce cluster est utilisé pour l’exécution des applications de production.

La seconde partie est un ensemble de quatre (04) serveurs physiques (Bare metal servers) fournies par un cloud provider. 

## Google Kubernetes Engine (GKE)

Le cluster Kubernetes de Google à les caractéristiques suivantes :

- Il est composé de 3 masters (control planes) et de 3 slaves (nodes). Ceci est fourni par un GKE de type « autopilot ».
- Le cluster est localisé au Canada.

De plus, ce cluster vient avec des outils très utiles tel que le dashboard de GKE qui fournit des informations claires sur le monitoring des services en cours d’exécution ainsi que la gestion des logs. Ce cluster inclus aussi un load balancer fourni par Google.

Le script ayant permis ce déploiement est disponible dans le fichier “caternet/infrastructure/gke_kubernetes_create.sh”.

Pour gérer les certificats HTTPS, nous allons déployer l’outil Cert Manager dans notre cluster GKE. Notre autorité de certification est  Let's Encrypt.  (Voir les fichiers cert-manager.yaml et cert-manager-issuer.yaml).

Concernant le stockage des données, le besoin porte sur un volume qui est localisé au Canada et qui permet d’avoir une réplication des données dans deux datacenters différents du Canada. Nous avons donc choisi les “regional persistent disks” de GKE (voir le fichier gke_persistent_volume.yaml).

## Les serveurs dédiés (Bare metal servers)

Ces servers sont au nombre de quatre et ont pour principal objectif de servir de support pour l’environnement DevOps de l’équipe. Ils sont composés de deux serveurs avec une forte puissance de calcul (serveurs compute) et deux servers avec une forte capacité de stockage (serveurs storage).

L’architechture physique de ces serveurs est :

![Alt text](images/img1.png?raw=true "Architechture physique des serveurs dédiés.")

Le vrack représente ici un réseau privé interne entre ces serveurs physiques et fourni par le provider.

Sur ces serveurs, nous envisageons bâtir un cluster Kubernetes (la distribution Kubeadm) avec un cluster de stockage glusterFS. L’architecture logique sera la suivante :

![Alt text](images/img2.png?raw=true "Cluster Kubernetes interne.")

Pour ce faire, nous installerons un cluster d’hyperviseur telle que Promox sur les serveurs physiques pour pourvoir les virtualisés. L’organisation des machines virtuelles sera la suivante :

![Alt text](images/img3.png?raw=true "Organisation des machines virtuelles")

L’accès à cette infrastructure par les administrateurs se fera par VPN via la solution openVPN.

![Alt text](images/img4.png?raw=true "Accès par VPN")

Dans ce cluster Kubernetes, nous allons déployer les outils suivants :

- Nginx Ingress load balancer (voir le fichier nginx_ingress_load_balancer.yaml) comme load balancer de notre cluster.
- Cert manager pour la gestion des certificats SSL.
- Kubernetes dashboard (voir fichier kubernetes_dashboard.yaml) 
- Metric server (metrics_server.yaml), prometheus et grafana pour le monitoring des services
- La pile ELK pour la gestion des logs.

De plus, pour notre environnement de travail DevOps nous installerons :

- Gitlab (voir gitlab.yaml) pour la gestion et le versionning des codes sources,
- Gitlab-runner (voir gitlab_runner.yaml) pour l’exécution des jobs des pipelines de Gitlab, 
- Sonarqube : outil d’inspection automatique du code.
- Spinnaker : outil de continous delivery pouvant être déployer sur Google et fonctionnant avec plusieurs fournisseurs cloud (AWS, Azure, Oracle cloud, Google, Cloud foundry).

## Autres outils pour notre infrastructure.

Dans notre infrastructure, nous avons aussi besoin de :
- Un bus de message pour la synchronisation des microservices : nous allons utiliser Pub/Sub de Google.
- Une base de données sur le cluster de travail et une autre sur le cluster de production. Nous utiliserons MongoDB (voir mongodb.yaml).
- Un moteur de recherche : Elasticsearch sur chaque cluster.

# L’application à développer

Nous avons identifié 3 microservices dans l’application à développer.

Le premier microservice est CatNodeJS. Il s’agit du composant principal qui assure la gestion des utilisateurs et des informations du système. Je me suis appuyé sur une architecture BAAS (Bakend As A Service) et sur une implémentation disponible sur NodeJS du nom de ParseServer (https://parseplatform.org/).

Le deuxième micro service est CadaverExchange pour l’échange des cadavres de rats et des souris. Ce microservice écoute la disponibilité des rats et souris pour les mettre à disposition sur le marché.

Le troisième microservice MouseTrap pour attraper les souris et les rats. 

La synchronisation de ces microservices se fait via Pub/Sub suivant l’architecture ci-après :

![Alt text](images/img5.png?raw=true "Communication entres microservices")

NB :
- Chacune de ces applications fait l’objet d’un repository séparé sur notre Gitlab.
- Chaque repository contient les fichiers clés suivants :
    - .gitlab-ci.yml  qui est le fichier de configuration de Gitlab CD/CI et donc contient les instructions des différents jobs des pipeline coté Gitlab.
    - Dockerfile qui permet la construction de l’image docker pour cette application
    - docker-compose.yml qui permet le lancement et l’exécution d’un environnement local de l’application

# Les environnements et le pipeline DevOps

Pour ce travail, j’ai défini 4 environnements :

- Local : qui correspond à l’environnement des développeurs
- Test : qui est un environnement en ligne centralisé contenant une version de test centralisé et exploité par les développeurs.
- QA :  une version de test destinée aux utilisateurs fini pour qu’il y valider les fonctionnalités développées.
- Staging : un environnement qui est une copie très similaire de l’environnement de production
- Production : environnement utilisé par les utilisateurs finaux.

NB : 
- Les environnements de Test et QA sont sur notre cluster interne Kubernetes or les environnements Staging et Production sont sur GKE.
- Chaque environnement est matérialisé par une branche dans le projet concerné sur Gitlab et les différentes versions sont matérialisés par des tags.
- Des restrictions d’accès sont appliqués dans les passages d’une version à une autre. Et les jobs de build et déploiement sont déclenché manuellement dans la branche de production.

Pour ce qui est du pipeline DevOps nous avons les étapes :
- Code review : effectuer automatiquement avec Sonaqube.
- Build : qui consiste à construire l’image docker et à push dans le registry docker
- Test : exécution des tests automatiques.
- Deploy : déploiement de l’application. Cette phase est prise en charge par Spinnaker.

Pour la sécurité des données manipulés par le pipeline et l’intégrité des jobs, Gitlab offre la possibilité de stocker les fichiers gitlab-cli.yaml dans des emplacements sécurisés et externes aux repositories. De plus, d’autres de ces paramètres seront manipulés par spinnaker qui est un espace sécurisé donc l’accès est restreint et contrôlé.


# Points d’amélioration

Comme points d’amélioration à ce travail j’ai :

- Définir des mécanismes de restauration automatique du service
    - Provisioning automatique des services, du cluster ou des ressources (Infrastructure as code)
    - Rapatriement et restauration des données de backup
- Les applications doivent se déployer de facon transparente sur l’utilisateur. Kubernetes offre des mécanismes pour cela. (Zero downtime deployment). 
- Les données stockées doivent être cryptées.
