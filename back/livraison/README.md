# 🚚 Delivery Service - Microservice de Gestion des Livraisons 🚚

Bienvenue dans le microservice **Delivery Service** ! Ce service est conçu pour gérer les informations des livreurs, organiser les affectations de livraison, et suivre en temps réel l'avancement des livraisons pour une logistique sans faille ! 📦📍

---

## 🌟 Fonctionnalités Principales

- **📋 Gestion des Livraisons** : Créer, mettre à jour, et supprimer des informations de livraison.
- **🚀 Suivi des Statuts** : Visualisez l'avancement de chaque commande avec des statuts comme "prêt", "en livraison", ou "livré".
- **📑 Détails de la Livraison** : Accéder aux informations d'une livraison spécifique pour un suivi précis.

---

## 🚀 Routes de l'API

### 1. **Voir Toutes les Livraisons**
- **Méthode** : `GET`
- **Endpoint** : `/order/`
- **Description** : Récupère la liste de toutes les livraisons en cours ou terminées, triée par nom.
- **Réponse** : Liste de toutes les livraisons.

### 2. **Voir les Détails d'une Livraison**
- **Méthode** : `GET`
- **Endpoint** : `/order/:id`
- **Description** : Affiche les informations d'une livraison spécifique.
- **Paramètre** : `id` (ID de la livraison)
- **Réponse** : Les détails de la livraison si elle existe, sinon un message d'erreur.

### 3. **Créer une Nouvelle Livraison**
- **Méthode** : `POST`
- **Endpoint** : `/order/`
- **Description** : Permet de créer une nouvelle livraison avec les informations du statut et de l'ID.
- **Requête** : Envoie un objet JSON contenant les détails de la livraison.
- **Réponse** : Retourne la livraison créée avec le statut 201 (créé).

### 4. **Mettre à Jour une Livraison**
- **Méthode** : `PUT`
- **Endpoint** : `/order/:id`
- **Description** : Met à jour les informations d'une livraison existante.
- **Paramètre** : `id` (ID de la livraison)
- **Requête** : Envoie un objet JSON contenant les modifications à apporter.
- **Réponse** : Retourne la livraison mise à jour.

### 5. **Supprimer une Livraison**
- **Méthode** : `DELETE`
- **Endpoint** : `/order/:id`
- **Description** : Supprime une livraison spécifique.
- **Paramètre** : `id` (ID de la livraison)
- **Réponse** : Confirmation de la suppression ou message d'erreur si la livraison n'est pas trouvée.

---

## 🗂️ Modèle de Données

Le modèle de livraison est structuré comme suit :

- **id** : `Number` - Identifiant unique de la commande
- **status** : `String` - Statut de la livraison, avec trois options disponibles :
    - `ready` : Prêt à être livré
    - `isInDelivery` : En cours de livraison
    - `delivered` : Livraison effectuée

---

## 🛠️ Installation et Lancement

1. **Clonez le repo** : `git clone <repository-url>`
2. **Installez les dépendances** : `npm install`
3. **Configurez la base de données** : Assurez-vous que MongoDB est en cours d'exécution et modifiez le fichier de configuration si nécessaire.
4. **Lancez le serveur** : `npm start`

---

## 📋 Exemple d'Utilisation

1. **Créer une livraison** (POST `/order/`)

   ```json
   {
     "id": 123,
     "status": "ready"
   }
