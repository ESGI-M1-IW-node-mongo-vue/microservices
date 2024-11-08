# Microservices - Projet du Groupe 3

## L'architecture des dossiers 📂

### Le dossier `back`

Il contient les microservices et la gateway faite en Nginx.
Chaque dossier contient un microservice.

### Le dossier `front`

Il contient le front-end de l'application fait en VueJS.

### Le dossier `config`

Il ne contient uniquement que le kong.yaml qui est le fichier de configuration de Kong, l'autre api gateway qu'on a fini
par mettre en place.

### Le dossier `slides`

Contient les slides faites en RevealJS + Astro depuis un template.


## Faire marcher tout ça

A la racine du projet, il suffit de lancer la commande `docker-compose up` pour lancer tous les services.

Ensuite, il suffit de se rendre sur `http://localhost:5173` pour accéder à l'application front-end.


## Bonus : revivre le waouh effect des slides

Pour revivre le waouh effect des slides, il suffit de lancer la commande `npm install` puis `npm run dev` dans le dossier `slides`.
Sur le port 4321, vous aurez accès à la présentation en RevealJS. 👨‍🍳