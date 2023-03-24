
# Fullstack Project Management System
Hi, Welcome to my Fullstack Project Management Systme, I made this project using React/Typescript for the Front-end part and .Net Core for the Back-end part

## Funcionality
* When a user is Logged can do:
    * Create a Project(CRUD)
    * Assign new Users into the project
    * Create List for that Project and Task for that List(CRUD)
    * Inside a Task you can Edit, change the priority, add description, assign User to that task and add Subtask

## Next Features
* Loggin with 3rd parts (google, github)
* Add Comments into a task
* Improve the Design and UX
* Dark Mode

## Front End Project
A modern minimal Vite + React + TypeScript template with pre-configured ESLint (with Airbnb JS/React rules), Prettier
### Run Locally

Clone the project

[Here](https://github.com/DanielMM161/FullStack-ProjectManagement/archive/refs/heads/main.zip) 

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install / yarn
```

Start the server

```bash
  npm run dev / yarn run dev
```
### 🛠 Tech stack & Open-source libraries
- [React](https://github.com/facebook/react) - version ^18.2.0
- [TypeScript](https://github.com/Microsoft/TypeScript) - version ^4.8.2
- [React Router](https://github.com/remix-run/react-router#readme) - Routes App
- [Redux](https://github.com/reduxjs/redux) - Global State
- [Axios](https://github.com/axios/axios) - Construct the REST APIs: version 1.2.1
- [Mui Components](https://mui.com/material-ui/getting-started/installation/) - Mui Library Components: version ^5.11.8
- [React Notifications Component](https://github.com/teodosii/react-notifications-component) - version ^4.0.1

## Project Structure
<details>
<summary>Open Project Structure</summary>
``` bash
└───src
    ├───assets
    ├───components
    │   ├───BreadCrumbs
    │   ├───Button
    │   ├───ButtonLoader
    │   ├───CardProduct
    │   ├───Cart
    │   │   └───component
    │   ├───Filter
    │   ├───Footer
    │   ├───Forms
    │   │   ├───CreateProduct
    │   │   ├───DeleteProduct
    │   │   ├───EditProduct
    │   │   ├───Login
    │   │   └───Register
    │   ├───HeroImage
    │   ├───LoadingPulsating
    │   ├───Modal
    │   ├───NavBar
    │   ├───NoProductFound
    │   ├───ProductSlider
    │   ├───SideBar
    │   ├───SnackBar
    │   ├───Switch
    │   └───UserValidation
    ├───context
    ├───hooks
    ├───models
    ├───pages
    │   ├───CategoryProduct
    │   ├───Home
    │   │   └───components
    │   │       └───TopCategories
    │   ├───Products
    │   ├───Profile
    │   │   └───components
    │   │       └───Info
    │   └───SingleProduct
    │       └───components
    │           ├───ProductDetail
    │           └───UserAdmin
    ├───redux
    │   └───slices
    ├───services
    ├───styled
    ├───tests
    │   ├───Mocks
    │   ├───reducers
    │   └───servers
    └───utilities
```
</details>
