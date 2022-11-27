# Braking Friendship Gamez
## Featuring - Exploding Kittens Web App

### Contributors
<a href="https://github.com/joshgarza">Josh Garza</a>,
<a href="https://github.com/jonahchoi">Jonah Choi</a>
<a href="https://github.com/hieungo89">Hieu Ngo</a>,
<a href="https://github.com/Fernando-Gamboa">Fernando Gamboa</a>,
<a href="https://github.com/jredboyz">Joseph Redmond</a>,
<a href="https://github.com/ericpei1">Eric Pei</a>

<!-- ABOUT THE PROJECT -->
## About the Project
Our team built a fully functional web application for an online card game featuring Exploding Kittens with all the features such as login, profile, lobby, gameplay, and chat.

### This project includes the following sections:
1. Landing Page
2. Login Page
3. Profile Page
4. Game Lobby
5. Gameplay

<p align="right">(<a href="#top">back to top</a>)</p>

## App Features
<!-- TODO USE THIS TEMPLATE FOR EACH FEATURE  -->
### Landing Page:
<div align="center">
  <img src="screenshots/Overview.png" alt="Landing Page" width="500">
</div>
The overview section includes an image gallery with a sidebar that contains the product information, style selectors and add to cart capabilities. The image gallery will rerender when a different style is selected and the sidebar will rerender when a new product is selected.
<table>
  <tr>
    <td>
      <img src="screenshots/Overview-Expanded.png" alt="Zoom View Screenshot" width="500">
    </td>
    <td>
      <b>Landing Page:</b>  Explanation.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>


### Built with:
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Firebase](https://firebase.google.com/)
* [Framer-motion](https://www.npmjs.com/package/framer-motion)
* [Tailwind](https://tailwindcss.com/)
* [Socket.io](https://socket.io/)
* [MongoDB](https://www.mongodb.com/)


<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started:
  - Install dependencies in Client:
    1. cd into blueocean/client
    2. `npm install`
  -  Make a copy of `example.env` and rename to `.env`
  - Install dependencies in Server:
    1. cd into blueocean/server
    2. `npm install`

  3. Create a .gitignore file and place in:
    -node_modules
    -client/dist
    -.env

  4. `npm run server-dev`

  5. `npm run client-dev`:
    -listens on PORT set in `.env` or 3000

  6. Launch site: http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>


# Server

cd into server
npm i
npm run server
-runs on localhost:5001

# Client

cd into client
npm i
npm start
-runs on localhost:3000



# Socket setup

## Client
npm i socket.io-client

## Server
npm i socket.io