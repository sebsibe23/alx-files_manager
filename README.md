# 0x04. Files Manager

## Overview

This project is a comprehensive summary of our back-end trimester, encompassing authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The primary goal is to build a simple platform for uploading and viewing files, which will serve as a practical exercise in integrating these technologies into a cohesive product.

### Team Members
- Sebsibe Solomon


### Project Timeline
- **Start Date:** June 27, 2024, 6:00 AM
- **End Date:** July 4, 2024, 6:00 AM
- **Checker Release:** June 29, 2024, 12:00 AM

### Objective
The objective is to build a platform that allows users to:
- Authenticate via a token
- List all files
- Upload new files
- Change file permissions
- View files
- Generate thumbnails for images

This project will guide you through the steps to build it, while allowing some freedom in implementation and structure. This exercise aims to help you learn how to assemble each piece into a fully functional product.

### Learning Objectives
By the end of this project, you will be able to explain:
- How to create an API with Express
- How to authenticate a user
- How to store data in MongoDB
- How to store temporary data in Redis
- How to set up and use a background worker

## Technologies Used

- **Back-end:** Node.js, Express.js
- **Database:** MongoDB, Redis
- **Job Queue Management:** Kue
- **Language:** JavaScript (ES6)

## Resources

- [Node JS getting started](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [Process API doc](https://nodejs.org/dist/latest-v12.x/docs/api/process.html)
- [Express getting started](https://expressjs.com/en/starter/installing.html)
- [Mocha documentation](https://mochajs.org/)
- [Nodemon documentation](https://nodemon.io/)
- [MongoDB](https://www.mongodb.com/)
- [Bull](https://optimalbits.github.io/bull/)
- [Image thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Redis](https://redis.io/)

## Requirements

- Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
- All files will be interpreted/compiled on Ubuntu 18.04 LTS using Node.js (version 12.x.x)
- All files should end with a new line
- A `README.md` file at the root of the project folder is mandatory
- Code should use the `.js` extension
- Code will be verified against lint using ESLint

## Setup Instructions

1. Clone the repository.
2. Navigate to the project directory.
3. Run `$ npm install` to install all dependencies.

### Provided Files
- `package.json`
- `.eslintrc.js`
- `babel.config.js`

Ensure that you configure these files appropriately for your project setup.

## Features

1. **User Authentication**
    - Secure user authentication using tokens.

2. **File Management**
    - List all files.
    - Upload new files.
    - Change file permissions.
    - View files.

3. **Image Processing**
    - Generate thumbnails for images.

## Getting Started

1. Install Node.js and npm if not already installed.
2. Clone the repository:
    ```bash
    git clone [repository URL]
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm start
    ```

## Project Structure

```bash
.
├── README.md
├── package.json
├── .eslintrc.js
├── babel.config.js
├── src
│   ├── index.js
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── utils
│   ├── middleware
│   └── config
└── tests
    └── test.js
```

## Contributing

We welcome contributions from the community. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.
