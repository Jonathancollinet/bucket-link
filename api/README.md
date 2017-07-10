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
  | Method | Routes        | Success           | Error  |
  | ------ | ------------- |:-------------:| -----:|
  |GET| /buckets      | All bucket of connected user, with 25 most recent links | 404 (User not found), 401 (User not connected) |
  |GET| /buckets/:id      | Get bucket by id, with 50 most recent links      | 404 (id not found) |
  |GET| /buckets/:id/links | Get all links by bucket id     |    404 (id not found) |
  |POST|/buckets|Create new bucket | 204 (name null)|
  |POST|/buckets/:id/links|Create a link associate to bucket(id), return json|404(id not found), 500(server error can't create link)
  |DELETE|/buckets/:id|Delete bucket by id (with assciated links)|404 (id not found)|
  |PATCH|/buckets/:id|Edit bucket by id|404 (id not found) 204(name null)|
