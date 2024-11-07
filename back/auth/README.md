# 🔐 Auth Service - Microservice de Gestion des Clients 🔐

Bienvenue dans le microservice **Auth Service** ! Ce service est dédié à la gestion des informations des clients, aux authentifications et aux sessions pour une expérience sécurisée et sans tracas. 📲🔒

---

## 🌟 Fonctionnalités Principales

- **👥 Gestion des Clients** : Enregistre et stocke les informations des clients, comme le nom, l'email et d'autres détails de contact.
- **🔐 Authentification et Connexion** : Permet aux clients de se connecter en toute sécurité avec vérification d'identité par email et mot de passe.
- **🕒 Gestion des Sessions** : Génère des tokens pour les sessions utilisateur, facilitant les accès sécurisés aux données et services.

---

## 🚀 Routes de l'API

### 1. **Hello World**
- **Méthode** : `GET`
- **Endpoint** : `/auth/`
- **Description** : Simple point de test pour vérifier la connexion au service.
- **Réponse** : "Hello World"

### 2. **Récupérer les Informations d'un Utilisateur**
- **Méthode** : `GET`
- **Endpoint** : `/auth/me`
- **Description** : Récupère les informations de l'utilisateur connecté (basé sur le token d'authentification).
- **En-tête** : `Authorization: Bearer <token>`
- **Réponse** : Informations de l'utilisateur (nom, email, etc.) si le token est valide.

### 3. **Connexion d'un Utilisateur**
- **Méthode** : `POST`
- **Endpoint** : `/auth/login`
- **Description** : Authentifie un utilisateur avec email et mot de passe, et retourne un token pour la session.
- **Requête** : Objet JSON avec les champs `email` et `password`.
- **Réponse** : Token de session (JWT) en cas de succès, ou message d'erreur en cas de refus.

### 4. **Inscription d'un Nouvel Utilisateur**
- **Méthode** : `POST`
- **Endpoint** : `/auth/register`
- **Description** : Enregistre un nouvel utilisateur avec un email, mot de passe, et autres informations facultatives.
- **Requête** : Objet JSON contenant `name`, `email`, `password`, et autres informations de contact.
- **Réponse** : Retourne les informations de l'utilisateur créé, ou un message d'erreur si l'email est déjà utilisé.

---

## 🗂️ Modèle de Données

Le modèle de données pour l'utilisateur est structuré comme suit :

- **name** : `String` - Nom complet de l'utilisateur
- **email** : `String` - Adresse email de l'utilisateur (unique)
- **password** : `String` - Mot de passe de l'utilisateur (crypté pour la sécurité)
- **tel** : `String` - Numéro de téléphone de l'utilisateur (facultatif)
- **description** : `String` - Description ou informations supplémentaires sur l'utilisateur (facultatif)

---

## 🛠️ Installation et Lancement

1. **Clonez le repo** : `git clone <repository-url>`
2. **Installez les dépendances** : `npm install`
3. **Configurez la base de données** : Assurez-vous que MongoDB est en cours d'exécution et modifiez le fichier de configuration si nécessaire.
4. **Lancez le serveur** : `npm start`

---

## 📋 Exemple d'Utilisation

1. **Inscription d'un nouvel utilisateur** (POST `/auth/register`)

   ```json
   {
     "name": "John Doe",
     "email": "john.doe@example.com",
     "password": "securepassword123",
     "tel": "+123456789",
     "description": "Client régulier"
   }
