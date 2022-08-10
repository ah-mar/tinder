# App Description

The app is a tinder clone app made in react native using expo.

## App Structure

The app initialises from App.js. The stack navigator divides the app into 5 screens

- Login Screen
- Home Screen
- Modal Screen
- Match Screen
- Chat Screen
- Message Screen

Login screen is the initial screen. It render Tinder Logo and and a Login button. Clicking the login button redirect the user the Google auth screen. The auth token returned is used to sign in to the firebase. if login is successfull, the listener in useAuth updates the user details in context. The user is redirected to Home Screeen by stack navigator.

Home Screen - render a header with 3 buttons, footer with 2 buttons and Swiper deck with usercards. The 3 buttons in header corresponds to logout, Modal screen and Chat Screen. The footer has 2 buttons to accept and reject. The swiper show the card deck and also implememnt the accept and reject functionality on right and left swipe respectively.
The data for the swiper comes from the firebase, conditionally filtering profiles which have already been rejected or selected.
Rejected functionality is implemented with swipeLeft function which add rejected user data in the firebase.
Accepeted functioanlity is implemented with SwipeRight function which add selected used data to swipes collection in firebase. Further a check is done whether slected user is matched, which if successful redirect user to Match Screen, which can be used to start a chat with user.
HomeScreen also implements profile details check after intial rendering, where user profile is checked in firebase and the user is redirected to modal screen if no initial info is found in the firebase.

Modal Screen - render a user data form to get phootoUrl, occupation and age from user. This data and id and display name for the google auth provider is then stored in he database. If successfull, the user is redirected back to HomeScreen.

Match Screen - render a match message, both user photos and button to redirect user to chats screen. The profile data is received from params passed by navigator.

Chat Screen - renders Chat header and ChatList component. The component get list of user matches from the database and render a list of ChatRow components in a Flatlist. CHatRow component render matched user image, displayname and their last message. Clicking on a chat row will redirect user to message screen.

Message Screen- render a header wwith matched user details, a footer with input form to send messsage and body which render Sender Message and Receiver Message as Flatlist. Sender and Receiver message differ in styling to differentiate both messages.

## Providers

The app use multiple Providers

- Tailwind provider for using tailwind CSS classes
- AuthProvider in React context api for authentication
- SaferAreaProvider for providing safe area in both ios and Android.

## State Management

Context management API is used for storing global state such as user auth.

## Database

The app use firebase database for storing user information, their selected and rejected profiles, their matches and it associated chat.
User are stored in collection called users where each user has a document containing all the user information, their swipes and passes details. Each Swipe and passes collection contain document for each user with user information.
Matches are stored in matches collection. Each matched couple is stored in one document which store their individual profiles in an object, thir ids in an array and their messages in collection. Each message is a document with message , timestamp and user details.

TODO - use data are duplicated in so many places that a SQL database might be better for storing this information.

## CSS and Styling

The app use tailwind CSS utility classes for styling. Tailwind is implemented by use of tailwindcss-react-native package. Icons are used from expo vector icons.
