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

## How to run the docker to host the Recomendation System

1. Open the backend/serving folder to check existing models (retrieval_index, ranking_model)
2. Pull the tensorflow/serving image from docker hub

```bash
  docker pull tensorflow/serving
```

3. Run the following command to host the Recomendation System

```bash
docker run -p 8501:8501 --mount type=bind,source=absolute_path_to_serving/retrieval_index,target=/models/retrieval_index --mount type=bind,source=absolute_path_to_serving/ranking_model,target=/models/ranking_model --mount type=bind,source=absolute_path_to_serving/config/models.config,target=/models/models.config -t tensorflow/serving --model_config_file=/models/models.config
```

4. The Rest API will be hosted on http://localhost:8501/v1/models/retrieval:predict and http://localhost:8501/v1/models/ranking:predict

### How to check the status of the models

- Open the browser and go to http://localhost:8501/v1/models/retrieval and http://localhost:8501/v1/models/ranking

### How to request the models

#### Retrieval model

Post request to http://localhost:8501/v1/models/retrieval:predict

```json
{
  "instances": ["1", "2", "3", "4", "5"]
}
```

instances is the input of the model, it is a list of strings, each string is the id of a user
Response will be a list of lists, each list is the id of the recommended video for the corresponding user (output_2)

#### Ranking model

Post request to http://localhost:8501/v1/models/ranking:predict

```json
{
  "inputs": {
    "user_id": ["1", "1", "1"],
    "video_id": ["1", "2", "3"]
  }
}
```

inputs is the input of the model, it is a dictionary with 2 keys: user_id and video_id, each key is a list of strings, each string is the id of a user or a video. The length of the 2 lists must be the same and the i-th element of the user_id list is the id of the user who watched the i-th video in the video_id list
Response will be a list of lists, each list is the score of the corresponding video for the corresponding user
