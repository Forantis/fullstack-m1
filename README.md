# TP3 API - MongoDB + Mongoose

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Seed des donnees

```bash
npm run seed
```

## Variables d'environnement

Le fichier `.env` doit contenir:

```env
MONGO_URI=mongodb://localhost:27017/tp_seance3
PORT=3001
```

## Tests API - 7 use cases (TP3)

Base URL:

```bash
export BASE_URL="http://localhost:3001"
```

1. GET /api/users (attendu: 200)

```bash
curl -i -X GET "$BASE_URL/api/users"
```

2. POST /api/users (attendu: 201, recuperer `_id`)

```bash
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john.doe@example.com","role":"user"}')

echo "$CREATE_RESPONSE"
USER_ID=$(echo "$CREATE_RESPONSE" | sed -n 's/.*"_id":"\([^"]*\)".*/\1/p')
echo "USER_ID=$USER_ID"
```

3. GET /api/users/:_id (attendu: 200)

```bash
curl -i -X GET "$BASE_URL/api/users/$USER_ID"
```

4. PUT /api/users/:_id (attendu: 200)

```bash
curl -i -X PUT "$BASE_URL/api/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe Updated","role":"admin"}'
```

5. GET /api/users (attendu: 200, count augmente)

```bash
curl -i -X GET "$BASE_URL/api/users"
```

6. DELETE /api/users/:_id (attendu: 204)

```bash
curl -i -X DELETE "$BASE_URL/api/users/$USER_ID"
```

7. GET /api/users/:_id apres suppression (attendu: 404)

```bash
curl -i -X GET "$BASE_URL/api/users/$USER_ID"
```
