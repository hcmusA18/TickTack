# Instructions

## How to run the program

1. Clone the repository
2. Open the terminal and navigate to the directory where the repository is located
3. Run the command `npm install` to install the dependencies
4. Run the command `npm start` to start the program or `npm run dev` to start the program in development mode
   Note: The server will run on port 4000 by default. If you want to change the port, you can do so by changing the value of the PORT variable in the .env file

## Project Structure

- [**backend**](backend)
  - [**src**](backend/src)
- [**frontend**](frontend)
  - [**src**](frontend/src)
    - [**assets**](frontend/src/assets)
      - [**icons**](frontend/src/assets/icons)
      - [**images**](frontend/src/assets/images)
    - [**components**](frontend/src/components)
    - [**libs**](frontend/src/libs)
      - [**configs**](frontend/src/libs/configs)
      - [**redux**](frontend/src/libs/redux)
      - [**utils**](frontend/src/libs/utils)
        - [**storage**](frontend/src/libs/utils/storage)
    - [**navigators**](frontend/src/navigators)
    - [**pages**](frontend/src/pages)
      - [**ErrorPage**](frontend/src/pages/ErrorPage)
    - [**theme**](frontend/src/theme)
    - [**types**](frontend/src/types)

## Describe the frontend

### Frontend Framework

- React, React Native (for the mobile app)
- Redux, Redux Toolkit (for state management)
- React Navigation (for navigation)
- React Native Paper (for UI)
- Axios (for making HTTP requests) -- still not installed
- FlashList (replace for FlatList)
- AsyncStorage (replace for LocalStorage)
- Lodas (for functions)

### How it works

- The app is divided into 3 main parts: components, pages and navigators
- Components are reusable UI components
- Pages are the screens of the app
- Navigators are the navigators of the app
- The app uses Redux for state management

### How to add a new page

1. Create a new folder in the pages folder
2. Create a new file in the folder you just created
3. Add the code to the file you just created
4. Modify the `config` object in the **src/app.tsx** file to add the new page to the app
5. Add new page name to type `AppStackParamList` in the **src/AppNavigator.tsx** file
6. Add `Stack.Screen` to `AppStack` in the **src/navigators/AppNavigator.tsx** file to add the new page to the app
   Note: Remember to import the new page in the **src/AppNavigator.tsx** file

## How to use Jest to make unit tests

1. Create a new file in the **src** folder

## PostgreSql Database Instructions

1. Create a .env file in the backend folder with the following content:

```bash
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ticktack
DB_PORT=5432
DB_PASS=your-password-here
JWT_SECRET=jwts3cr3t
GOOGLE_REFRESH_TOKEN=your-refresh-token-here
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=https://developers.google.com/oauthplayground
GOOGLE_DRIVE_FOLDER_ID=your-folder-id-here
COOKIE_PARSER_SECRET=cookieparsersecret
```

2. As we use python to insert data into the database, you need to install the following packages:

```bash
pip install psycopg2
pip install json
pip install python-dotenv
pip install pathlib
pip install numpy
```

3. Open pgAdmin and create a new database named "ticktack"
4. Run the sql script in the backend/src/database folder to create the tables
5. Run the python script in the backend/src/database folder to insert the data into the tables

## How to start the recommender

### Run on your own

1. Change the directory to the `recommender` folder
2. Create a virtual environment in the `recommender` folder with python 3.10

```bash
python -m venv venv
```

3. Activate the virtual environment

```bash
venv/Scripts/activate
```

4. Install the required packages

```bash
pip install -r requirements.txt
```

5. Run the 2 scripts in the `recommender` folder separately

```bash
python .\model_builder.py
python .\recommender.py
```

### Run on docker

1. Change the directory to the `recommender` folder
2. Build the docker image for the first time or after changes

```bash
docker compose up --build
```

- If you want to run the docker image without building it

```bash
docker compose up
```

If successfully run, the recommender will be available at `http://127.0.0.1:8080/recommend`. The request format is as follows: `http://127.0.0.1:8080/recommend?userId=1&number=5`. The `userId` is the user id and the `number` is the number of recommendations to be returned.

`model_builder.py` will track the changes in the database and update the model accordingly. `recommender.py` will start a flask server to serve the recommendations.
