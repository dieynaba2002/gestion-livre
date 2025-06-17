# 📚 Application de Gestion de Livres (Fullstack NestJS + Angular)

Ce projet est une application Fullstack permettant la gestion de livres avec :
- ✅ Authentification par JWT
- ✅ Ajout, modification et suppression de livres
- ✅ Upload de photo pour chaque livre
- ✅ Interface utilisateur en Angular

---

## 🧱 Structure du projet
EDACY/
├── gestion-livre/ → API NestJS avec Prisma
├── gestion-livre-frontend/ → Application Angular
└── README.md


---

## ⚙️ Prérequis

Avant de commencer, assure-toi d’avoir installé :

- [Node.js](https://nodejs.org/) (v18 ou plus)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) (ou MariaDB)
- [Angular CLI](https://angular.io/cli)
- [Git](https://git-scm.com/)

---

## 📦 Installation

### 🔧 Backend (NestJS)

```bash
# Cloner le dépôt
git clone https://github.com/ton-profil/EDACY.git
cd EDACY/backend

# Installer les dépendances
npm install
```
# Créer le fichier .env
touch .env
DATABASE_URL="mysql://root:@localhost:3306/gestion_livre"
SECRET_KEY="SECRET_KEY"
OTP_CODE = "OTP_CODE"

# Générer le client Prisma
npx prisma generate

# Appliquer les migrations à la base
npx prisma migrate dev --name init

# Lancer le serveur en mode développement
npm run start:dev

L’API sera disponible sur http://localhost:3000

💻 Frontend (Angular)
cd ../frontend

# Installer les dépendances
npm install

# Lancer l'application Angular
ng serve
Le frontend sera disponible sur http://localhost:4200

🔐 Fonctionnalités principales
Authentification
Inscription / Connexion via un formulaire

JWT stocké dans le localStorage

Accès protégé avec guard Angular

Livres
🆕 Ajouter un livre avec photo

✏️ Modifier les détails d’un livre

🗑️ Supprimer un livre

📂 Afficher tous les livres créés par un utilisateur

🧪 Technologies utilisées
Backend
NestJS

Prisma

JWT

Multer (upload photo)

MySQL

Frontend
Angular

RxJS

framework CSS

Auth avec JWT (intercepteur + guard)

backend/
├── src/
│   ├── auth/         → Gestion de l’authentification
│   ├── user/         → Inscription & profil utilisateur
│   ├── book/         → Ajout, modification, suppression de livres
│   ├── prisma/       → Client Prisma
│   └── main.ts       → Fichier d’entrée de l’application
│
├── uploads/          → Dossier où sont stockées les photos des livres

frontend/
├── src/app/components/
│   ├── auth/         → Login / Register
│   ├── ajoutlivre/        → component ou y'a le formulaire ajout livres
│   ├── meslivres/        → Composants liés aux livres (la liste)
│   └── services/     → AuthService, BookService, etc.

Développée par Dieynaba Coly.
