# 🍲 Kitchen Service - Microservice de Gestion des Commandes 🍲

Bienvenue dans le microservice **Kitchen Service** ! Ce service est conçu pour recevoir et gérer les commandes dans une cuisine de restaurant. Il permet aux chefs de suivre l'avancement des plats et de mettre à jour leur statut en temps réel. Parfait pour une cuisine efficace et bien organisée ! 👨‍🍳👩‍🍳

---

## 🌟 Fonctionnalités Principales

- **📥 Recevoir les Commandes** : Enregistrer les commandes avec le nom du client et les plats commandés.
- **📋 Voir toutes les Commandes** : Obtenir une vue d'ensemble de toutes les commandes en cours.
- **🔄 Mettre à Jour le Statut d'un Plat** : Les chefs peuvent facilement mettre à jour le statut de chaque plat (en préparation, prêt à servir).
- **📑 Voir les Détails d'une Commande** : Afficher les informations d'une commande spécifique, y compris chaque plat et son statut actuel.

---

## 🚀 Routes de l'API

### 1. **Créer une Commande**
- **Méthode** : `POST`
- **Endpoint** : `/order/`
- **Description** : Permet de créer une nouvelle commande.
- **Requête** : Envoie un objet `order` contenant le `customerName` et les `dishes`.
- **Réponse** : Retourne la commande créée avec le statut 201 (créé).

### 2. **Voir Toutes les Commandes**
- **Méthode** : `GET`
- **Endpoint** : `/order/`
- **Description** : Récupère toutes les commandes existantes.
- **Réponse** : Liste de toutes les commandes.

### 3. **Voir les Détails d'une Commande**
- **Méthode** : `GET`
- **Endpoint** : `/order/:orderId`
- **Description** : Affiche les détails d'une commande spécifique.
- **Paramètre** : `orderId` (ID de la commande)
- **Réponse** : Détails de la commande si elle existe, sinon message d'erreur.

### 4. **Mettre à Jour le Statut d'un Plat**
- **Méthode** : `PATCH`
- **Endpoint** : `/order/:orderId/dish/:dishName/status`
- **Description** : Permet de mettre à jour le statut d'un plat dans une commande.
- **Paramètres** :
    - `orderId` (ID de la commande)
    - `dishName` (Nom du plat)
- **Requête** : Envoie le statut mis à jour dans un objet JSON `{ "status": "new_status" }`.
- **Réponse** : La commande mise à jour avec le nouveau statut du plat, ou un message d'erreur si la commande ou le plat n'existent pas.

---

## 🗂️ Modèle de Données

Le modèle de commande est structuré comme suit :

- **customerName** : `String` - Nom du client
- **dishes** : `Array` de plats
    - **name** : `String` - Nom du plat
    - **status** : `String` - Statut du plat (par défaut : "pending")
- **createdAt** : `Date` - Date de création de la commande

---

## 🛠️ Installation et Lancement

1. **Clonez le repo** : `git clone <repository-url>`
2. **Installez les dépendances** : `npm install`
3. **Configurez la base de données** : Assurez-vous que MongoDB est en cours d'exécution et modifiez le fichier de configuration si nécessaire.
4. **Lancez le serveur** : `npm start`

---

## 📋 Exemple d'Utilisation

Voici un exemple pour créer une commande et mettre à jour le statut d'un plat :

1. **Créer une commande** (POST `/order/`)

   ```json
   {
     "customerName": "Jean Dupont",
     "dishes": [
       { "name": "Pasta Carbonara" },
       { "name": "Salade César" }
     ]
   }
