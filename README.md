# Tutorial

https://www.youtube.com/watch?v=2G_mWfG0DZE&ab_channel=Rocketseat


```
yarn add sequelize pg sqlite sequelize-cli
```

```
docker run --name nodejsapi-auth -e POSTGRES_DB=authapi -e POSTGRES_USER=usuario -e POSTGRES_PASSWORD=senha -d -p 5432:5432 postgres:9.5
```

instalar
```
yarn sequelize migration:create --name=create-users
```

instalar
```
yarn sequelize db:migrate
yarn sequelize db:migrate:undo:all
```