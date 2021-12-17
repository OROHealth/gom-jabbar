
I)BUTS

1)démontrer la récupération d'un plantage complet de toutes les instances, ou d'une seule.

Solution:
Pour cet API j'utiliserais NODE.JS
Et j'utiliserais l'utilitaire pm2 pour créer des instances de mon API en mode cluster.
Je lancerais donc plusieurs instances de mon API (dépendamment du nombre de coeur du processeur de mon serveur) en mode cluster en utilisant la cmd: pm2 start ./dist/src/main.js --name "starbucks-api" -i 5   (pour créer 5 instances par exemple)
Ensuite, suite au plantage d'une de mes instances, pm2 redemarrera automatique cette instance (comportement par défaut de pm2)
Aussi je dispose de la cmd "pm2 reload" pour relancer toutes mes instances au besoin.

2)simuler l'insertion de 10.000 clients faisant entre 2 et 14 commandes par an sur une période de 2 ans

Solution:
J'utilise JMeter comme outil de test de performance ou de monter en charge.
Il suffit de simuler cette insertion de 10.000 clients dans JMeter.

3)optimiser/trouver une solution à la question suivante :

Solution:

--> combien de dîners trop cuits notés 8 Twyla a-t-il servi au cours des 6 derniers mois, combien d'argent a été gagné grâce à ceux-ci et où se situent les notes médianes de ces repas ?

Solution:

SELECT COUNT(*) AS nb_overcooked_diner,
	   SUM(M.price) AS Total_amount, 
       AVG(N.note)
FROM   Commands AS C
LEFT JOIN Menu_elements as M ON C.menu_element_id = M.id
LEFT JOIN Comments as N ON N.command_id = C.id
WHERE  M.surcuisson_level = 8 AND C.created_date BETWEEN now() AND (now() - interval 6 month)


--> quelle est l'évolution du nombre de verres qu'Alexis et David ont pris seuls par rapport au nombre ensemble au cours du temps ?

Solution:

SELECT C.created_date, 
       C.nb_item - (SELECT SUM(C.nb_item) as nb_glass 
                            FROM   Commands as C
							LEFT JOIN Menu_elements as M ON C.menu_element_id = M.id
							LEFT JOIN Customers as CU ON C.customer_id = CU.id
                            WHERE  M.name = 'VERRE' AND (CU.Name = 'Alexis' OR CU.Name = 'David'))  AS TOTAL
FROM   Commands AS C
LEFT JOIN Menu_elements as M ON C.menu_element_id = M.id
LEFT JOIN Customers as CU ON C.customer_id = CU.id
WHERE  M.name = 'VERRE' AND (CU.Name = 'Alexis' OR CU.Name = 'David')
GROUP  BY C.created_date


--> l'évolution des choix de mocktails de Moira par rapport à sa critique au fil du temps

Solution:   

SELECT C.created_date, 
       SUM(C.nb_item),
       SUM(CO.review) - (SELECT SUM(CO.review)
                            FROM   Commands as C
							LEFT JOIN Menu_elements as M ON C.menu_element_id = M.id
							LEFT JOIN Comments as CO ON CO.command_id = C.id
                            WHERE  M.name = 'Moira mocktails') AS TOTAL
FROM   Commands AS C
LEFT JOIN Menu_elements as M ON C.menu_element_id = M.id
LEFT JOIN Comments as CO ON CO.command_id = C.id
WHERE  M.name = 'Moira mocktails'
GROUP  BY C.created_date

PS: le champ 'review'(critique) de la table 'Comments' contient 1 si le client critique le plat et 0 sinon


--> rechercher le nom d'un client de l'extérieur de la ville

Solution: 

SELECT name
FROM   Customers
WHERE  type = 'out of town'
LIMIT 1



II)BONUS/FACULTATIF

--> montrer des outils de visualisation et des exemples générés


--> choisir différents mécanismes de stockage pour différentes pièces et expliquer pourquoi

Solution:

Pour le stockage, je choisirais une base de données à la place d'utiliser des fichiers tout simplement parce que la base de données est plus sécuritaire que les fichiers et permet de gérer facilement les données.
Comme base de données, j'utiliserais une base de données MySql et des tables créées avec le moteur InnoDB et non pas MyISAM pour la simple raison que j'ai besoin du BD relationnelle comportant des clés étrangères pour les différentes liaisons entre les tables.
Et pour finir, j'indexerais tous les champs ou colonnes clés étrangères et aussi les champs utilisés pour la recherche dans ma base pour accélérer le mécanisme de recupération/lecture de données.

