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
