# Capstone-Frontend: Animal Shelter App

## Features
### Authentication/Authorization
**Login/Sign up**. 
+ Working log in / sign up page that communicates with the backend to validate the user credentials or create a new account
+ User will be signed in directly after sign up
+ a json web token is sent from the backend and stored to local storage (required to send requests to the backend)
  
### Main
**Header** 
+ Includes nav bar with a response hamburger menu for smaller screen sizes
+ Logo links to home 
+ Nav bar links include Home, Adopt, and About Us
+ Clickable profile icon with the first letter of the username (links to profile details/edit)
+ Logout button navigates the user back to login and clears any stored data
+ Dark mode toggle
+ Header is fixed
  
**Home**  
+ showcases a carousel of cards intended to mimic latest news
+ section underneath is reserved for featured pets (didn't get to set up)
  
**Dark Mode**  
+ dark mode selection persists throughout session
+ toggle remains "checked" even if the page refreshes
  
**Footer**  
+ Footer is fixed
+ displays fake address, clickable socials (#), shelter name, and credits to the site
+ An admin user will see an admin toggle in the footer to masquerade as a user (details below)
  
**Adopt**  
+ this section allows the user to view pets by type or view all
+ view by all, dogs, cats, and other each have their own container and get data from the backend based on type
+ pets can be favorited by the user by individual hearts that are solid when favorited 
+ a heart icon displays the count of favorites and can be clicked on to go to user favorites
+ each pet can be clicked on to view details
+ there is an apply link on the pet details page that leads users to the application form
  
**Profile**  
+ users can view profile details, edit their account, or delete their account from this page
+ there is also a link to the user favorites and their applications
  
**Applications**  
+ Users can submit applications via a form that sends to the backend and stores their responses
+ Upon successful submission, the users see a success page and option to be directed to see all of their applications
+ The applications page shows the pet/timestamps of each application and can be clicked on to view the response details
+ The application can be deleted from the details page which communicates with the backend database


## Admin Access Experience
**json web token**  
+ the jwt provided at login or sign up is decoded by a jwt react library and the roles of the user are used to determine access level
+ details of the specific path are saved to session storage

**admin sign up**  
+ creating a new admin user requires admin access so the link is only available from the admin path
+ any users created with this form are also admin users
+ once signed up, the user lands on a success page that allows them to switch to the new account or continue in the current

**admin homepage**  
+ displays four main routes: 
1. modify pet information
2. view pending applications (built out but will be adding improvements)
3. view microchip database > has a search and sorting feature that dynamically loads results
4. create admin user 

**admin mode toggle**  
+ Located at the footer
+ allows the admin user to toggle between admin view and user view
+ is not shown to users without admin access  
