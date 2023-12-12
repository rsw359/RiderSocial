# The Romance

## Cycling Blog App | [site](https://rider-social.vercel.app)

### Description

**The Romance** is a cycling-focused blog app that allows users to share their cycling experiences, adventures, and stories. Whether you're a seasoned cyclist or just starting out, The Romance provides a platform to connect with fellow riders and share your passion for cycling.

- This site is hosted on Vercel using Render for the server. Ocassionally, Render spins its services down, so if login is unsuccessful give it just a minute or two. 

### Features

- Create and publish blog posts with text and images.
- View a feed of posts from all users.
- Explore posts from specific users.
- Add other users as friends to stay updated with their posts.
- Cloudinary integration for seamless image uploads and storage.
- MVP Implementation:
  - User authentication and authorization.
  - Basic CRUD operations for posts and user profiles.
- Stretch Goals:
  - Integrate Strava API for posting ride segments and ride data.
  - Notifications for comments on user posts using Socket.IO
 
- Coming Soon
  - Post Search
  - About Page

## Technologies Used

- MERN Stack (MongoDB, Express.js, React, Node.js)
- Redux for state management
- Material-UI (MUI) for styling
- Cloudinary for image storage
- Vercel (Frontend Deployment)
- Render (Backend Deployment)
- Strava API (Stretch Goal)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repositories:
   1. Client: `**git clone https://github.com/rsw359/RiderSocial.git**`
   2. Server:**`git clone https://github.com/rsw359/Rider-Social-Server.git`**
2. Navigate to the project directory: **`cd client`**
   1. client: `**cd client**`
   2. server: **`cd rider-server`**
3. Install dependencies for both frontend and backend: **`npm install`** (or **`yarn install`**)
4. Set up environment variables:
   - Create a **`.env`** file in the root directory of the backend and add necessary variables (e.g., MongoDB URI, Cloudinary credentials).
   - Create a **`.env`** file in the root directory of the frontend and add the backend API URL (e.g., **`REACT_APP_API_URL=https://api.example.com`**)
     - (The frontend api calls are is set to localhost:3001, but can be changed within the components in src/loginPage and src/widgets)
5. Start the backend server: **`npm start`** (or **`yarn start`**) in the **`backend`** directory.
6. Start the frontend application: **`npm start`** (or **`yarn start`**) in the **`frontend`** directory.

## Usage

- Register or log in to access the app.
- Create new posts and add images to share your cycling experiences.
- Add or delete comments on posts
- Explore posts from other users and add them as friends.
- View posts from specific users or all users in the feed.
- Add likes to posts

## Demo

Check out the live demo at **[rider-social.vercel.app](https://rider-social.vercel.app/)**.

## Future Enhancements

- Implement Strava API integration for additional ride data, such as route maps and segments.
- Incorporate additional social features for a richer user experience. (e.g. notifications, video uploads, ride scheduling with invites)

## License

This project is licensed under the MIT License

## Contact

For inquiries, please contact me by [Email](mailto:rsw359@gmail.com)

Get in touch on **[LinkedIn](https://www.linkedin.com/in/roger-s-wells/)**!
