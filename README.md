# Car Management System

Create CRUD API using nodeJS, expressJS, Postgres, and typescript

## super dmin account

email : marcell.superadmin@gmail.com
password : 123456

## Entity Relationship Diagram (ERD)

![ERD](http://res.cloudinary.com/dzns6jopj/image/upload/v1699601740/qmpe3gvtflbrkekfmbr9.png)

Struktur singkat Entity-Relationship Diagram (ERD) dan bagaimana tabel-tabel saling terkait:

1. **Tabel `customers`:**

   - Mewakili informasi pelanggan dengan atribut seperti `customer_id`, `first_name`, `last_name`, `age`, `identity_number`, `phone_numbers`, dan `address`.

2. **Tabel `users`:**

   - Mewakili informasi pengguna dengan atribut seperti `id`, `username`, `password`, `email`, `phone_number`, `age`, dan `address`.
   - Memiliki relasi 0 atau 1-to-1 dengan tabel `customers` melalui `customer_id`.

3. **Tabel `car_brands` dan `car_types`:**

   - Merepresentasikan informasi merek dan jenis mobil.
   - Digunakan sebagai referensi dalam tabel `cars`.

4. **Tabel `cars`:**

   - Mewakili informasi tentang mobil dengan atribut seperti `car_id`, `car_name`, `brand_id`, `type_id`, `engine`, `capacity`, `car_year`, `price`, `image_url`, dan `availability`.
   - Memiliki relasi dengan tabel merek dan jenis melalui `brand_id` dan `type_id`.

5. **Tabel `transactions`:**

   - Merepresentasikan informasi transaksi dengan atribut seperti `id`, `customer_id`, `start_rent`, `finish_rent`, dan `payment_method`.
   - Terhubung dengan tabel `customers` melalui `customer_id`.

6. **Tabel `transactions_detail`:**

   - Merepresentasikan detail transaksi terkait mobil dengan atribut seperti `car_id`, `transaction_id`, dan `payment_amount`.
   - Terhubung dengan tabel `cars` dan `transactions` melalui `car_id` dan `transaction_id`.

7. **Tabel `branch` dan `employees`:**
   - Mewakili informasi cabang dan karyawan.
   - Tabel `employees` terhubung dengan tabel `branch` melalui `branch_id`.

## REST API

Berikut adalah dokumentasi untuk endpoint-endpoint REST API yang tersedia di proyek ini:

### 1. '/cars'

**Deskripsi**: mengembalikan daftar mobil yang tersedia dari database.

**URL**: `http://localhost:3000/cars`

**Metode**: GET

### 2. '/cars/:id'

**Deskripsi**: mengembalikan data mobil dengan id tertentu dari databse.

**URL**: `http://localhost:3000/cars/:id`

**Metode**: GET

### 3. '/cars/:id/delete'

**Deskripsi**: menghapus data mobil dengan id tertentu dari databse.

**URL**: `http://localhost:3000/cars/:id/delete`

**Metode**: DELETE

### 4. '/cars/create'

**Deskripsi**: menambahkan data mobil baru pada database.

**URL**: `http://localhost:3000/cars/create`

**Metode**: POST

### 5. '/cars/:id/update'

**Deskripsi**: memperbaharui data mobil dengan id tertentu pada database.

**URL**: `http://localhost:3000/cars/:id/update`

**Metode**: PATCH
