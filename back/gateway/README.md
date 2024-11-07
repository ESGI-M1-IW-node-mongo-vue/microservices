# 🌐 NGINX Gateway - Microservices API Gateway 🌐

Cette configuration NGINX agit comme une **gateway** pour vos microservices, gérant les requêtes vers différents services (commande, livraison, cuisine, authentification) et redirigeant les utilisateurs en fonction de leurs rôles et de leur identifiant.

---

## ⚙️ Fonctionnalités Principales

- **🔒 Authentification JWT** : Utilise des tokens JWT pour sécuriser les accès et extraire les rôles et identifiants des utilisateurs.
- **📡 Proxy pour les Services API** : Dirige les requêtes entrantes vers les services appropriés (commandes, livraison, cuisine, authentification).
- **📋 Gestion des Rôles** : Récupère les informations de rôle et d’identifiant de l'utilisateur à partir du JWT pour personnaliser les accès.

---

## 🚀 Configuration Détailée

### 1. **Modules de JWT**

- **JWT Auth Module** : Charge le module `ngx_http_auth_jwt_module.so` pour gérer les tokens JWT.
- **auth_jwt_key** : Définit la clé secrète utilisée pour valider les tokens JWT (`"pouetpouetpouet"`).

### 2. **Mappage des Claims JWT**

- `map $jwt_claim_role $role` : Récupère la réclamation du rôle dans le token JWT (`$jwt_claim_role`) et la stocke dans la variable `$role`.
- `map $jwt_claim_sub $sub` : Récupère la réclamation de l'identifiant utilisateur (`$jwt_claim_sub`) et la stocke dans la variable `$sub`.

### 3. **Configuration du Serveur**

- **Port d'écoute** : Le serveur écoute sur le port 80.
- **Proxy pour le Front-end** : Redirige la racine (`/`) vers le service du front-end (`http://front:80/`).
- **En-têtes Personnalisés** : Ajoute les en-têtes `X-User` et `X-Role` avec les valeurs de `$sub` et `$role` pour transmettre les informations utilisateur aux services backend.

---

## 📂 Routes de l'API

### `/api` - Routes des Services Backend

- **/api/orders** : Proxy vers le service de commandes (`http://orders:3000/api/orders`)
- **/api/livraison** : Proxy vers le service de livraison (`http://livraison:3000/api/livraison`)
- **/api/kitchen** : Proxy vers le service de cuisine (`http://kitchen:3000/api/kitchen`)
- **/api/auth** : Proxy vers le service d'authentification (`http://auth:3001/api/auth`)

### Exemple de Requête Proxy

- **Requête** : `GET /api/orders`
- **Proxy** : Redirigée vers le service des commandes (`http://orders:3000/api/orders`)

---

## 🛠️ Installation et Configuration

1. **Installez NGINX** avec le module JWT : Assurez-vous d'avoir NGINX installé avec le module `ngx_http_auth_jwt_module`.
2. **Configurez la Gateway** : Utilisez la configuration ci-dessus dans le fichier de configuration NGINX (`/etc/nginx/nginx.conf`).
3. **Démarrez NGINX** : Redémarrez NGINX pour appliquer la configuration.
   ```bash
   sudo systemctl restart nginx
