# Node.js TypeScript Project Setup

This guide will help you set up a Node.js project with TypeScript. It also includes instructions on how to push branches to GitHub and create merge requests.

## Prerequisites

-   [Node.js](https://nodejs.org/) (version 14 or above)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Initialize TypeScript

Make sure TypeScript is installed:

```bash
npm install -D typescript
```

Or:

```bash
yarn add -D typescript
```

### 7. Setup env variables

```bash
JWT_SECRET_KEY = <USER CREATED DUMMY TOKEN>
TOKEN_HEADER_KEY=authorization
DB_HOST=localhost
DB_USER=ssrcp
DB_PASSWORD=ssrcp
DB_NAME=ssrcp
DB_PORT=3306
```

### 7. Run Project

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

Application started on http://127.0.0.1:3000 port.

We will also start streaming applications on port 8080 using the WebSocket portal.

```bash
  node DemoStreamLocWS.js
```

The stream can be accessed by the following API

```url
ws://localhost:8080?robotId=${robotId}&userId=${userId}&actorId=${actorId}
```
