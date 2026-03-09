# Blog API

Blog API for the "ExpressJS Build an API" Ed content.

## API Features

- /user
  - GET /
    - Get all users from db
  - GET /:userId
    - Get one user from db
  - GET /username/:targetUsername
    - Search for a user by their username
  - GET /email/:targetEmail
    - Search for a user by their email address
    - Not essential
  - GET /search
    - Search for a user by a given set of data in query string
      - e.g. localhost:3000/users/search?username=tim&isAdmin=true
    - Not essential
  - GET /me/reactedPosts
    - Show a list of all posts that we reacted to ourselves
    - Requires an auth header / JWT
    - Not essential
  - GET /:userId/reactedPosts
    - Show a list of all posts that the target user has reacted to
    - Not essential
  - POST /
    - Make a new user in the db
  - PATCH /:userId - Update a specific user in the database - Require a JWT of the user being updated (e.g. updating your own account) or an admin
  - DELETE /:userId
    - Delete a specific user in the database
    - Require a JWT of the user being deleted (e.g. closing your own account) or an admin

- /posts
  - GET /
    - Get all posts from database
  - GET /:userId
    - Get one post from database
  - GET /search 
    - Search for a post by a given set of data in query string
      - e.g. localhost:3000/posts/search?author=tim&title=thrash
    - Not essential
  - POST /
    - Make a new post in the database
    - Require a JWT of either the author of the post or admin
  - PATCH /:userId
    - Update a specific post in the database
    - Require a JWT of either the author of the post or admin
  - PUT /reactionCounter/:postId
    - Require a JWT of either the author of the post or admin
    - Replace the postId reaction counter reaction counter + 1
    - Modify the user from the JWT to make sure this post is in their reacted posts array
    - Not essential
  - DELETE /:userId
    - Delete a specific post in the database
    - Require a JWT of either the author of the post or admin

## Database Entities

All properties of all entities are required.

### User

- email: string, email address for the purpose of validation
- password: string, hashed and salted value
- isAdmin: boolean, default: false
- username: string, unique, atleast 3 characters long
- usersWeFollow: array of foreign keys to users
- postsWeReactedTo: array of foreign keys to posts

### Posts

- title: string, unique
- content: string
- authors: array of foreign keys to users
- reactionCounter: number, minimum of 1, users can click to react multiple times

## Project Setup

### NPM Script Commands

- NPM script commands
- Seed & similar files

### Database Setup

- MongoDB Atlas usage
