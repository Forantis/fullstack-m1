# TP4 - Frontend Fundamentals (React + API TP3)

Le repo est maintenant structure en deux dossiers:

- `backend/`: API Express + MongoDB du TP3
- `frontend/`: application React (Vite) du TP4

## 1) Lancer le backend

```bash
cd backend
npm install
npm run dev
```

Variables attendues dans `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/tp_seance3
PORT=3001
```

## 2) Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend tourne sur `http://localhost:5173` et utilise un proxy Vite vers `http://localhost:3001`.

## Fonctionnalites implementees (TP4)

- Affichage de la liste des utilisateurs (API)
- Creation d'utilisateur (formulaire controle + validation)
- Suppression d'utilisateur
- Gestion des etats `loading`, `error`, `success`
- Composants React:
  - `Navbar`
  - `UserCard`
  - `UserList`
  - `UserForm`
- Service API centralise: `frontend/src/services/userService.js`
