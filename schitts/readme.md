## SCHITT'S CREEK CAFE

## Initial Setup

In the server folder, install dependencies and then seed the database:

```
cd server
npm install .
```

In the client folder, install dependencies:

```
cd client
npm install .
```

### Running the Application Locally

In one terminal, start the front end:

```
cd client
npm start
```

In a separate terminal, start the back end:

```
cd server
npm run dev
```

Mongodb connection already set-up. Added a user who can only access cluster0 (read & write)
