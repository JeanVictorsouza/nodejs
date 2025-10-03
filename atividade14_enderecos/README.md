# Atividade 14 — CRUD de Endereços (Sequelize + SQL)

Versão usando **banco SQL** (MySQL ou Postgres), configurável por variáveis de ambiente.

## 1) Preparar o banco
Crie o banco com o nome desejado (ex.: `atividade14`).

**MySQL**
```sql
CREATE DATABASE atividade14 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
**Postgres**
```sql
CREATE DATABASE atividade14;
```

## 2) Configurar as variáveis
Copie `.env.example` para `.env` e ajuste:
```
DB_DIALECT=mysql        # ou postgres
DB_HOST=localhost
DB_PORT=3306            # postgres: 5432
DB_NAME=atividade14
DB_USER=root
DB_PASS=senha_forte
```

## 3) Instalar e rodar
```bash
npm install
npm run start    # ou npm run dev
```

Acesse: http://localhost:3000

## Observações
- O `sequelize.sync()` cria a tabela `enderecos` automaticamente se não existir.
- Campos e validações: rua*, bairro*, cidade*, estado(2)*, cep* (formato 99999-999), número opcional.
- Drivers já incluídos: `mysql2`, `pg`, `pg-hstore`.
