# Task Manager API

REST API sederhana untuk manajemen user dan task pada aplikasi task manager. API memakai JWT untuk autentikasi user, MySQL untuk penyimpanan data, Sequelize sebagai ORM, dan Docker Compose untuk menjalankan service lokal.

## Tech Stack
- Node.js 18
- TypeScript
- Express via `@aptana/multichannel-common`
- Sequelize
- MySQL 8
- JWT (`jsonwebtoken`)
- HTTP client dengan `axios`
- Password hashing dengan `bcryptjs`
- Validasi request dengan `class-validator`
- Docker Compose

## Fitur

- Register user tanpa autentikasi
- Login user dan generate JWT
- CRUD user dengan autentikasi Bearer token
- CRUD task tanpa autentikasi
- Fetch weather info task dari `wttr.in` saat `city` dikirim
- Pagination, filter, search, dan sort untuk list user
- Cache file untuk show user
- Event worker untuk event user created, updated, deleted
- Migration awal untuk tabel `user` dan `task`

## Prasyarat

- Docker Desktop + Docker Compose
- Node.js 18 dan npm, jika menjalankan aplikasi tanpa Docker

## Setup dengan Docker

Install dependency:

```bash
npm install
```

Jalankan service:

```bash
docker compose up -d
```

Service yang berjalan:

| Service | URL / Port |
| --- | --- |
| API | `http://localhost:3001` |
| MySQL | `localhost:3307` |

Mapping port dari Docker:

- App container: `3001:3000`
- MySQL container: `3307:3306`

Migration otomatis dijalankan oleh MySQL dari folder `storage/migrations` saat volume database pertama kali dibuat.

## Setup Lokal tanpa Docker

Install dependency:

```bash
npm install
```

Siapkan MySQL, buat database `mydb`, lalu jalankan SQL di `storage/migrations/001_init.sql`.

Set environment variable sesuai kebutuhan, contoh:

```env
MODE_ENV=local
JWT_SECRET=secret
MYSQL_DB=mysql://root:@localhost:3307/mydb
```

Jalankan aplikasi:

```bash
npm run start:dev
```

## Environment Variables

| Variable | Default | Keterangan |
| --- | --- | --- |
| `MODE_ENV` | `local` | Mode aplikasi |
| `APP_MQ` | `amqp://root:root@rabbitmq` | URL message queue |
| `REDIS_URL` | `redis://redis` | URL Redis jika cache Redis dipakai |
| `JWT_SECRET` | `secret` | Secret untuk sign dan verify JWT |
| `MYSQL_DB` | `mysql://root:@mysql:3306/mydb` | Connection string MySQL |

## NPM Scripts

| Command | Fungsi |
| --- | --- |
| `npm run start:dev` | Menjalankan aplikasi dengan `nodemon` dari `src/index.ts` |
| `npm run build` | Compile TypeScript ke `dist` dan resolve alias path |
| `npm run start` | Menjalankan build production dengan `pm2-runtime` |

## Database

File migration: `storage/migrations/001_init.sql`

Tabel yang dibuat:

- `user`: `id`, `name`, `email`, `password`, `created_at`, `updated_at`
- `task`: `id`, `user_id`, `title`, `city`, `weather_info`, `is_done`, `created_at`, `updated_at`

Seed user admin:

| Email | Password |
| --- | --- |
| `admin@example.com` | `password` |

## Autentikasi

Endpoint protected wajib memakai header:

```http
Authorization: Bearer <token>
```

Token didapat dari `POST /login` dan expired dalam `1d`.

## API Documentation

Base URL Docker lokal:

```text
http://localhost:3001
```

### Register User

```http
POST /register
```

Auth: tidak perlu.

Request body:

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"password": "password123"
}
```

Validasi:

- `name`: string
- `email`: email valid
- `password`: string, minimal 8 karakter

### Login User

```http
POST /login
```

Auth: tidak perlu.

Request body:

```json
{
	"email": "john@example.com",
	"password": "password123"
}
```

Response berisi `token` dan data `user` tanpa password.

### Create User

```http
POST /users
```

Auth: wajib Bearer token.

Request body sama seperti `POST /register`.

### List User

```http
GET /users
```

Auth: wajib Bearer token.

Query optional:

| Query | Contoh | Keterangan |
| --- | --- | --- |
| `page[limit]` | `10` | Jumlah data |
| `page[offset]` | `0` | Offset data |
| `filter[id]` | UUID user | Filter by id |
| `filter[name]` | `John Doe` | Filter by name |
| `filter[email]` | `john@example.com` | Filter by email |
| `search[value]` | `john` | Keyword search |
| `search[fields][]` | `name` | Field untuk search |
| `sort` | `createdAt:DESC` | Format `field:ASC` atau `field:DESC` |

Contoh:

```text
GET /users?page[limit]=10&page[offset]=0&search[value]=john&search[fields][]=name&sort=createdAt:DESC
```

### Show User

```http
GET /users/:userId
```

Auth: wajib Bearer token.

### Update User

```http
PUT /users/:userId
```

Auth: wajib Bearer token.

Request body dapat dikirim partial:

```json
{
	"name": "John Updated",
	"email": "john.updated@example.com",
	"password": "newpassword123"
}
```

### Delete User

```http
DELETE /users/:userId
```

Auth: wajib Bearer token.

Response berupa boolean.

### Create Task

```http
POST /tasks
```

Auth: tidak perlu.

Request body:

```json
{
	"userID": "00000000-0000-4000-8000-000000000001",
	"title": "Buy milk",
	"city": "Jakarta"
}
```

Validasi:

- `userID`: UUID user valid
- `title`: string
- `city`: optional string, dipakai untuk fetch weather info dari `wttr.in`

### List Task

```http
GET /tasks
```

Auth: tidak perlu.

Query optional:

| Query | Contoh | Keterangan |
| --- | --- | --- |
| `page[limit]` | `10` | Jumlah data |
| `page[offset]` | `0` | Offset data |
| `filter[id]` | UUID task | Filter by id |
| `filter[userID]` | UUID user | Filter by user |
| `filter[title]` | `Buy milk` | Filter by title |
| `filter[city]` | `Jakarta` | Filter by city |
| `filter[isDone]` | `true` | Filter by status |
| `search[value]` | `milk` | Keyword search |
| `search[fields][]` | `title` | Field untuk search |
| `sort` | `createdAt:DESC` | Format `field:ASC` atau `field:DESC` |

Contoh:

```text
GET /tasks?page[limit]=10&page[offset]=0&search[value]=milk&search[fields][]=title&sort=createdAt:DESC
```

### Show Task

```http
GET /tasks/:taskId
```

Auth: tidak perlu.

### Update Task

```http
PUT /tasks/:taskId
```

Auth: tidak perlu.

Request body dapat dikirim partial:

```json
{
	"title": "Buy eggs",
	"city": "Bandung",
	"isDone": true
}
```

### Delete Task

```http
DELETE /tasks/:taskId
```

Auth: tidak perlu.

Response berupa boolean.

## Contoh Curl

Register:

```bash
curl -X POST http://localhost:3001/register \
	-H "Content-Type: application/json" \
	-d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

Login:

```bash
curl -X POST http://localhost:3001/login \
	-H "Content-Type: application/json" \
	-d '{"email":"john@example.com","password":"password123"}'
```

List user:

```bash
curl http://localhost:3001/users \
	-H "Authorization: Bearer <token>"
```

Show user:

```bash
curl http://localhost:3001/users/<userId> \
	-H "Authorization: Bearer <token>"
```

Update user:

```bash
curl -X PUT http://localhost:3001/users/<userId> \
	-H "Authorization: Bearer <token>" \
	-H "Content-Type: application/json" \
	-d '{"name":"John Updated"}'
```

Delete user:

```bash
curl -X DELETE http://localhost:3001/users/<userId> \
	-H "Authorization: Bearer <token>"
```

Create task:

```bash
curl -X POST http://localhost:3001/tasks \
	-H "Content-Type: application/json" \
	-d '{"userID":"00000000-0000-4000-8000-000000000001","title":"Buy milk","city":"Jakarta"}'
```

List task:

```bash
curl "http://localhost:3001/tasks?page[limit]=10&page[offset]=0&search[value]=milk&search[fields][]=title&sort=createdAt:DESC"
```

Show task:

```bash
curl http://localhost:3001/tasks/<taskId>
```

Update task:

```bash
curl -X PUT http://localhost:3001/tasks/<taskId> \
	-H "Content-Type: application/json" \
	-d '{"isDone":true}'
```

Delete task:

```bash
curl -X DELETE http://localhost:3001/tasks/<taskId>
```

## Error Umum

| Status / Message | Penyebab |
| --- | --- |
| `401 Unauthorized` | Header Authorization tidak ada, format bukan Bearer, token salah, atau token expired |
| `Email already registered` | Email sudah dipakai saat register/create user |
| `NotFoundError` | Data tidak ditemukan |
| `WrongCredentialsError` | Email atau password login salah |

## Struktur Folder

```text
src/
	config/                         # Konfigurasi env
	infrastructure/
		database/sequelize/            # Koneksi Sequelize dan model database
		events/                        # Worker event listener
		http/                          # App HTTP dan middleware
		loaders/                       # Loader cache
	modules/
		tasks/                         # Domain, repo, mapper, utility weather, dan use case task
		users/                         # Domain, repo, mapper, event, dan use case user
	types/                           # Type augmentation Express
storage/
	cache/                           # Cache file
	migrations/                      # SQL migration awal
```

## Catatan Implementasi

- Endpoint user dan task terdaftar di `src/infrastructure/http/app.ts`.
- Middleware auth ada di `src/infrastructure/http/middlewares/auth.ts`.
- Token JWT berisi `userId` dan `email`.
- Password saat register/create user di-hash dengan `bcryptjs`.
- Password pada update user mengikuti implementasi saat ini di `UpdateUser.ts`.
- Weather info task diambil dari `wttr.in`; jika API gagal, task tetap dibuat dengan `weatherInfo` null.

