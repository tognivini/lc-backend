# Awesome Project Build with TypeORM

Steps to run this project:

Criar imagem postgres:
$ docker run --name postgres-server -e POSTGRES_PASSWORD=postgres -d -p 5434:5432 postgres 

Migration run
$ npx typeorm-ts-node-esm migration:run -d ./src/data-source.ts

Migration revert
$ npx typeorm-ts-node-esm migration:revert -d ./src/data-source.ts

Migration generate
$ npx typeorm-ts-node-esm migration:generate ./src/database/migrations/MIGRATION_NAME -d ./src/data-source.ts

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command
# lc-backend
