# Come far girare il progetto in locale

Se si volesse far girare il seguente progetto in locale, questa guida potrebbe aiutare. 

## Backend

E' necessario far prima partire il backend. Aprire quindi un terminale dentro questa cartella. Digitare
```shell
cd backend
```
Per entrare nella cartella backend. Digitare poi il comando seguente per installare i pacchetti di javascript
```shell
npm install
```
Creare dunque un file `.env`,e inserire i seguenti dati:

```bash
PORT=8000
MONGODB_USERNAME="<you_username>"
MONGODB_PASSWORD="<your_password>"
MONGODB_URI="<a_valid_mongodb_uri>"
JWT_SECRET="secret"
```

Lanciare ora il server, con il comando 
```shell
npm run dev
```

## Frontend

Lanciare ora il fronend. Aprire quindi un terminale dentro questa cartella. Digitare
```shell
cd frontend
```
Usare il comando 
```shell
npm start
```
In questo modo si aprira' la finestra nel browser. 