# Blog Application

This application will enable a user to register, log in, create blog posts, and view all posts done by the user. Using a MERN (MongoDB, Express, React, Node.js) stack, controlling and handling the content on a blog should be pretty smooth and easy.

## Features

- **User Registration and Authentication**: Allows users to register an account and authenticate at logging in securely; passwords must be stored in hashed form to make the application much more secure.
- **Create Posts**: Authenticated users can create new blog posts with a title, summary, and content. Users will also be able to attach images for their posts.
- **View Posts**: List of latest posts on the blog home page. The post consists of a title, body, and author information.
- **Read Posts:** At this level, the users of a system can click on a post and read the full content view of an author together with the date when the post was published.
- **Edit and Delete Posts**: Users can edit or delete their posts. This makes sure that a user is in complete control of his content.
- **Image Upload**: Allows users to upload images to add them to blogs. Images are stored on the server and linked to the respective posts.

## Technologies Used

### Frontend

- **React**: A JavaScript library that proves to help create a user interface. It's going to aid development on the client side.
- **HTML**: The HyperText Markup Language.
- **CSS**: Styles the front end application.

### Backend

- **Node.js**: A JavaScript runtime designed with Chrome's V8 JavaScript engine for writing server-side scripts.
- **Express**: Fast, unopinionated web framework for Node.js, used to build the backend for API.
- **MongoDB**: A NoSQL database that stores user and post data.
- **Mongoose**: Object Data Modeling tool designed to use with MongoDB and Node.js to describe database schemas and models.

### Authentication

- **bcrypt**: Password hashing library that helps to ensure user's passwords are stored securely.
- **JWT (JSON Web Token)**: An open standard specification for issuing access tokens in an identity verification process.

### File Upload

- **multer**: Middleware to handle multipart/form-data. In this context, it was used to upload images to a server.

## How it Works

1. **User Registration and Log in**: The user may register with his username and password. User passwords are hashed by use of bcrypt. When any of the two actions are successful, a JWT token is created and sent as a cookie.
2. **Create and Manage Posts**: An authenticated user can create a new post by adding its title, summary, and content. The user can upload any related image for the post. That image is saved on the server, while the path of that image is saved in the database. The created post is theirs to manage; they can edit or delete their posts.
3. **View Posts**: The new posts will be displayed on the home screen to the users. If a user selects a post, it will take them to the complete content, which shows the title, summary, complete content, information about the author, and publishing date.
4. **Safe Access**: The application will verify the request to secured routes configured with JWT tokens. This guarantees that a user can create, update, or delete only after an authentication token has been provided. Moreover, the tokens are cross-verified with every request.

At the core, the Blog Application is mainly dedicated to writing and creating a blog. This application has paid much attention to user authentication and data security.
