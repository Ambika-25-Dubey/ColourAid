# ColourAid Database Design

## Purpose
This document describes the initial database design for ColourAid, focusing on a development implementation using SQLite with a clean abstraction layer so PostgreSQL can replace SQLite later.

## Entities

### users
Stores registered user accounts.

Columns:
- `id` (integer, primary key)
- `uuid` (string, unique, not null)
- `name` (string, not null)
- `email` (string, unique, not null)
- `password_hash` (string, not null)
- `is_admin` (boolean, default false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### assessments
Stores results for color vision assessments.

Columns:
- `id` (integer, primary key)
- `user_id` (integer, foreign key -> users.id)
- `test_type` (string, not null)
- `score` (float)
- `severity` (string)
- `result_data` (JSON)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### image_uploads
Tracks user-uploaded images and processed outputs.

Columns:
- `id` (integer, primary key)
- `user_id` (integer, foreign key -> users.id)
- `original_filename` (string, not null)
- `stored_filename` (string, not null)
- `mime_type` (string, not null)
- `original_path` (string, not null)
- `processed_path` (string)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Relationships
- `users` has many `assessments`
- `users` has many `image_uploads`
- `assessments.user_id` references `users.id`
- `image_uploads.user_id` references `users.id`

## Normalization
- Each table stores a single entity type.
- Shared user data is not duplicated across assessment or image records.
- JSON is used for `result_data` to allow flexible assessment payload storage.

## Abstraction Strategy
- `backend/config/database.js` reads environment variables.
- `backend/database/connection.js` exposes a Knex client.
- `backend/database/initDatabase.js` creates tables in a portable way.
- SQLite is configured for development, and PostgreSQL can be swapped later by updating `DB_CLIENT` and connection settings.
