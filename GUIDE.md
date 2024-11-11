If you want to use npm command, then it should be run like this:

```bash
npm run db:generate --name=MigrationName
```

In case of Windows package.json command should look like that:

```json
"db:generate": "npm run typeorm migration:generate ./src/migrations/%npm_config_name%"
```

However, using Unix based OS it has to be like that:

```json
"db:generate": "npm run typeorm migration:generate ./src/migrations/$name"
```
