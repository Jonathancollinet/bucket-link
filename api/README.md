# Bucket-link API

## Installation
``` bash
  npm i
```
If you want all sequelize-cli arguments :
``` bash
  PATH=$PATH:/path/to/git/repo/.bin
```
Configure the database informations in `config/config.json`

## Usage
Create table with foreigns keys
``` bash
  npm run migrate
```
Delete all tables
``` bash
  npm run migrate:reset
```
Undo last migration
``` bash
  npm run migrate:undo
```
Start `api`
``` bash
  npm run start
```
Database seeding
Config here : `config/seeds.js`
``` bash
  npm run seed
```
Reset seeding (Delete all rows in all tables)
``` bash
  npm run seed:reset
```
Run Test
```bash
  npm run test
```

## Routes

### Buckets

- Get /buckets
Success => Get all buckets of connected user, with 25 most recent links.
Error => 401 => User not connected
Error => 404 => User not found

- Get /buckets/:bucketId
Success => Get Bucket by Id, with 50 most recent links.
Error => 404 => bucketId not found

- Get /buckets/:bucketId/links
Success => Get all links by bucket id.
Error => 404 => bucketId not found

- Post /buckets
Success => Create new bucket.
Error => 204 => On name == null => No content

- Post /buckets/:bucketId/links
Success => Create a links associate to bucket(bucketId) => Return newly created link (json)
Error => 404 => bucketId not found
Error => 500 => Can't create link

- Delete /buckets/:bucketId
Success => Delete bucket by id (with all associated links)
Error => 404 => bucketId not found

- Patch /buckets/:bucketId
Success => Edit bucket by id
Error => 404 => bucketId not found
Error => 204 => name == null => No content

