# 📋 Customer Manager

<p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/vite-purple?style=for-the-badge&logo=vite&logoColor=white" />
</p>


Welcome to the Customer Manager project! 🚀 This simple Proof of Concept (POC), showcasing basic CRUD functionalities for managing customers.

The backend code can be seem in the following [repository](https://github.com/maycon-mdrs/VClients).

<br />

## ⚙️ Project Setup

Before running the project, it is necessary to have [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en) installed on your machine.

> [!note]
> ℹ️ **System Information:**  
> - npm  ~> v9.8.1  
> - node ~> v18.18.2


> [!warning]
> ⚠️ **Important Note:**  
> It is crucial to mention that this project locally utilizes [pnpm](https://pnpm.io/pt/) (v8.9.2) instead of npm, although both should be able to interoperate without any issues.



After checking or installing node and npm on your machine it is necessary to clone the git repository of the frontend with the following command:

```bash
$ git clone https://github.com/LuigiVanin/customer-manager-sample.git
```


After all, ensure to create an .env file following the structure outlined in .env.example. This file should contain all necessary environment variables for the application to function properly.


| Variable      | Description                                        |
|---------------|----------------------------------------------------|
| VITE_API_URL  | The URL of the API endpoint that the frontend consumes. For local development, it is set to `http://localhost:5138/`. Ensure it points to the correct API server address. |

<br />

## 🚀 How to Run the Frontend

Firstly, it's necessary to install all project dependencies using npm:

```bash
$ npm i
```

To run the project in development mode, use the following command:

```bash
$ npm run dev
```


## 🛠️ How to Build the Project

To build the project, execute the following command:

```bash
$ npm run build
```

## Folder Structure

- `src/components`: This directory may contain reusable components that can be used in various parts of the application.

- `src/pages`: Specific page components will be placed here. Each page may have its own directory with components, styles, etc.

- `src/pages/layouts`: Folder designated for page layouts.

- `src/services`: Shared services will be placed here. Services are used for business logic, communication with APIs, etc.

- `src/lib`: This directory may contain shared resources.

- `src/hooks`: Files related to React hooks will be maintained here.

- `src/types`: Specific types for this application will be kept here.

- `src/providers`: This folder will contain all custom context providers for global contexts.

## 📦 Tools 

-   [React](https://react.dev/)
-   [React Query](https://tanstack.com/query/latest).
-   [Axios](https://axios-http.com/).
-   [Shadcn/ui](https://ui.shadcn.com/).
-   [React Hook Form](https://react-hook-form.com/).
-   [Vite](https://vitejs.dev/).
-   [React icon](https://react-icons.github.io/react-icons/).
