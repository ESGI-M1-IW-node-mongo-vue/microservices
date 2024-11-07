# 🛒 Order Service - Microservice de Gestion des Commandes 🛒

Bienvenue dans le microservice **Order Service** ! Ce service permet aux clients de passer des commandes, de les enregistrer et de les transmettre aux services de traitement, garantissant une expérience de commande fluide et rapide ! 📦🍲

---

## 🌟 Fonctionnalités Principales

- **📥 Passer des Commandes** : Permet aux clients de sélectionner des plats et de passer des commandes.
- **📋 Gestion des Commandes** : Enregistre les informations des commandes, y compris les détails des plats, le total et l'adresse de livraison.
- **📤 Transmission aux Services Appropriés** : Relie automatiquement les commandes aux services de préparation et de livraison pour un traitement efficace.

---

## 🚀 Modèle de Données

Le microservice **Order Service** utilise les modèles de données suivants :

### **Modèle Order (Commande)**

- **client** : `String` - Nom du client qui passe la commande
- **dishes** : `Array` - Liste des plats commandés
- **total** : `Number` - Montant total de la commande
- **address** : `String` - Adresse de livraison
- **status** : `String` - Statut de la commande (par exemple, "en cours", "préparée")

### **Modèle Dish (Plat)**

- **name** : `String` - Nom du plat
- **price** : `Number` - Prix du plat
- **ingredients** : `Array` de `String` - Ingrédients du plat (facultatif)
- **status** : `String` - Statut du plat (par exemple, "disponible", "indisponible")

---

## 📋 Exemple d'Utilisation

Voici un exemple de création d'une commande avec plusieurs plats :

1. **Créer une commande** (POST `/order/`)

   ```json
   {
     "client": "Alice Dupont",
     "dishes": [
       { "name": "Pizza Margherita", "price": 10, "status": "available" },
       { "name": "Pâtes Carbonara", "price": 15, "status": "available" }
     ],
     "total": 25,
     "address": "123 Rue de Paris",
     "status": "pending"
   }
