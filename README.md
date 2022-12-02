<h1 align="center">
  <br>
  Braking Friendships
  <br>
</h1>

<h4 align="center">
  <br>
  A real-time/multiplayer card game that allows up to 4 player gameplay (Featuring - Exploding Kittens)
  <br>
</h4>

<a href="https://reactjs.org/">![-react](https://user-images.githubusercontent.com/103979716/199112745-aea0ac0c-11f8-40be-a7b5-08300e3945a5.svg)</a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction">![-javascript](https://user-images.githubusercontent.com/103979716/199113123-04739e76-7bf1-4ce8-a19b-68228ebabc5f.svg)</a>
<a href="https://expressjs.com/">![-express](https://user-images.githubusercontent.com/103979716/199112780-09753942-cce4-4551-9b0d-91d391a5d0fe.svg)</a>
<a href="https://tailwindcss.com/">![-tailwind](https://user-images.githubusercontent.com/103979716/205179159-3d7bb4cd-7bf7-4834-aba6-aaacd5c182b0.svg)</a>
<a href="https://socket.io/">![-socket io (1)](https://user-images.githubusercontent.com/103979716/205179477-cc07e317-b77a-4b44-a57e-7ca011ff4802.svg)</a>
<a href="https://firebase.google.com/">![-firebase](https://user-images.githubusercontent.com/103979716/205181943-6501e316-fa60-4a9f-b241-afa1c098a44f.svg)</a>
<a href="https://www.npmjs.com/package/framer-motion">![-framer-motion](https://user-images.githubusercontent.com/103979716/205181960-9a53a8cc-93de-457e-8da8-47d1e7691610.svg)</a>
<a href="https://www.mongodb.com/">![-mongodb](https://user-images.githubusercontent.com/103979716/205179494-e3fe89a2-6bcb-47d5-a0c1-b7cb47991ed0.svg)</a>

<h2 align="center">Contributors</h2>
<a href="https://github.com/joshgarza">Josh Garza</a>,
<a href="https://github.com/jonahchoi">Jonah Choi</a>,
<a href="https://github.com/hieungo89">Hieu Ngo</a>,
<a href="https://github.com/Fernando-Gamboa">Fernando Gamboa</a>,
<a href="https://github.com/jredboyz">Joseph Redmond</a>,
<a href="https://github.com/ericpei1">Eric Pei</a>

<br></br>
<!-- ABOUT THE PROJECT -->
<h2>About the Project</h2>
Our team built a fully functional web application for an online card game featuring Exploding Kittens with all the features such as login, profile, lobby, gameplay, and chat.

### This project includes the following sections:
1. Main Page
2. Game Lobby
3. Gameplay
4. Chat Feature
5. Login/Signup
6. Profile

<p align="right">(<a href="#top">back to top</a>)</p>

## App Features
<!-- LANDING PAGE -->
### Main Page:
<div align="center">
  <img src="https://user-images.githubusercontent.com/104481165/204183849-d216b26d-f091-4d6e-b932-6c5f629bcf50.png" alt="Landing Page" width="500">
</div>
This is the main page of the website. Here contains the Navigation Bar on top, with the options to create a game room, join a game room, or join a random game room.
<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204184281-320224f3-93f2-4aeb-ba9e-34d17f609bb9.png" alt="Nav Bar" width="500">
    </td>
    <td>
      <b>Navigation Bar:</b>  The navigation bar inclues the company logo, profile, and login process. The navigation bar changes depending on user's login status. Users with an account can acces their profile and search for other users.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GAME LOBBY -->
### Game Lobby:
<div align="center">
  <img src="https://user-images.githubusercontent.com/103979716/205190128-1546abd0-3262-483a-be15-1fc36c71c715.png" alt="Game Lobby" width="500">
</div>
<br></br>
The game lobby allows users to communicate with each other and prepare to enter the gameplay. Up to 4 players are allowed to be in the game lobby at any time.
<br></br>
<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/103979716/205190923-0ad2d99c-a92a-4667-ba5f-09c07dc9969a.png" alt="SCREENSHOT" width="250">
    </td>
    <td>
      <b>Lobby for joining players:</b>  Joining players do not have the option to start the game, that's a host privilege
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GAMEPLAY -->
### Gameplay:
<div align="center">
  <img src="https://user-images.githubusercontent.com/104481165/204189936-9e702755-875f-4271-a775-aa6615f4f4b1.png" alt="Gameplay" width="500">
  <img src="https://user-images.githubusercontent.com/104597125/204372071-e50c4333-67b1-44cc-afbb-0997a5012805.gif" alt="Card Animation" width="500">
</div>
The design of the gameplay contains animations and all the logic that are needed to allow the smooth flow of the game.
<table>
  <tr>
    <td>
      <img src="SOURCE" alt="SCREENSHOT" width="500">
    </td>
    <td>
      <b>Title:</b>  Explanation.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CHAT -->
### Chat Feature:
<div align="center">
  <img src="https://user-images.githubusercontent.com/104481165/204187763-62f2bc73-4d1c-4d54-9b4f-273d5dfa34f1.png" alt="Chat" width="500">
</div>
<br></br>
Chat feature is available in the game lobby and during gameplay. The game chat allows players to communicate with each other more effectively while being immersed in the game. The chat notifies user's with a live notification badge, removing the need the keep the chat component open at all times but while being at ease that no message will be missed.
<br></br>
<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/103979716/205186880-e2b95e14-9e90-4596-bf57-d843f07aa209.png" alt="chat lobby" width="500">
    </td>
    <td>
      <b>Lobby Chat:</b>  The chat bar opens on the right side of the screen and can be collapsed to allow players more versatlity and control. Chat displays an interactive icon to show any new messages.
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/103979716/205187690-935aa0eb-cf4c-426d-bd0c-997e7138b0c0.png" alt="chat gameplay" width="500">
    </td>
    <td>
      <b>Gameplay Chat:</b>  Gameplay chat is also on the right side and can be toggled to close as needed.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LOGIN FEATURE -->
### Login/Signup:
<div align="center">
  <img src="https://user-images.githubusercontent.com/104481165/204165920-53d1b3b4-efb4-430a-81db-08a1a29992c0.png" alt="Login" width="500">
</div>
  Users have the ability to login and/or signup for an account.
<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204165920-53d1b3b4-efb4-430a-81db-08a1a29992c0.png" alt="Zoom View Screenshot" width="500">
    </td>
    <td>
      <b>Login Page:</b>  User can login with their email and password. If user forgot password, they can reset it with the 'forget password' button. User can signup for a new account by clicking the 'signup' button.
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204165932-b302ee74-4c7b-4e59-bb70-8a429b89cd3f.png" alt="Zoom View Screenshot" width="500">
    </td>
    <td>
      <b>Account Registration Page:</b>  In order to register for an account, user needs to input a username, email, password, and confirm password.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- PROFILE FEATURE -->
### Profile:
<div align="center">
  <img src="https://user-images.githubusercontent.com/104481165/204163788-b6bb9c17-47cc-499c-b8fc-cf2cb598c907.png" alt="Profile Page" width="500">
</div>
The profile page is only available for users who has an account. The user can access their profile page to see their username, avatar, game info, and friends. User also has the ability to change their username and avatar.
<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204163938-3902fa09-64d9-46a6-bdb9-2d03e4585cb4.png" alt="Guest Account" width="500">
    </td>
    <td>
      <b>Guest Account:</b>  Guest accounts have a defaulted avatar with a random guest ID number. They have the option to login to be able to view their profile.
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204164028-25fa396b-e1b4-4310-a9d7-60dbe9dab7d3.png" alt="User Account" width="500">
    </td>
    <td>
      <b>User Account:</b>  User account will show the user's avatar and their username in the landing page. They also have the option to search for other users and add them as friend.
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204165158-3dcf901d-4c76-4c45-b189-8b43662b454b.png" alt="Search Profile" width="500">
    </td>
    <td>
      <b>Edit Username/Avatar:</b> User can edit their username. New username must be different than the ones from the database. Users can also choose from one of the 9 avatars ta
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204164150-0ba2878e-c299-44c0-a90b-84dd6b6df87f.png" alt="Friend's Profile" width="500">
    </td>
    <td>
      <b>Friend's Profile:</b> Clicking on a friend's profile in the user's profile page will render the page to view the friend's profile.
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204164321-a7d4ad8b-ed7d-4382-93a6-fa96aad8cb40.png" alt="Search Profile" width="500">
    </td>
    <td>
      <b>Search:</b>  User can search for other users by their username. User can then view the profile page upon clicking on the username.
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/104481165/204164338-3eef63d2-3f95-4436-875d-292828fd49d8.png" alt="Search Profile" width="500">
    </td>
    <td>
      <b>Add Friend:</b>  Searched profile page has the option to add the user as a friend. This will add the profile to the user's friend list.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started:
  - Install dependencies in Client:
    1. cd into blueocean/client
    2. `npm install`
  -  Make a copy of `example.env` and rename to `.env`
  - Install dependencies in Server:
    1. cd into blueocean/server
    2. `npm install`
  - Run Servers:
    1. In client - `npm run start`
        - client run on PORT 3000
    2. In server - `npm run server`
        - server runs on PORT 5001

  - Launch site: http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>
