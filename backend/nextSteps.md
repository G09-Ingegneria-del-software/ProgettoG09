# Next steps

## Authentication system
For the authentication, two more endpoint are needed: 
- Login
- Logout

To handle all the login thingy we are going to use not external library. Each time a user logs in correctly, we will issue a JWT that will be added to headers. Then user needs to replay this token for every other call, so we know that it is signed in the site. 

To logout the user asks for it, and then the server delete the token from headers. 

So to archieve this we need: 
- Function to create JWT (V)
- Function to check JWT (V)
- Function to login (V)
- Function to logout (V)
- Function to check if token is logged (V)
- Middleware to check token validity before letting user do stuff (TODO)