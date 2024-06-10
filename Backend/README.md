# Capstone-Backend: Animal Shelter App  

## Entities/Relationships
### User
**Details/Endpoints**  
Relationships:  
+ One-to-many with applications  
+ Many-to-many with pets (favorites)  
  
Endpoints:  
1. Get all users at "/users"  
2. Get user by id at "/users/{id}"  
3. Get user by username at "/users?username=string"  
4. Create user at "/users"  
5. Update user by username at "/users/{username}"  
6. Add pet to user at "/users/{username}/pets/{petId}/add"  
7. Delete pet from user at "/users/{username}/pets/{petId}/delete"   
8. Delete user by username at "/users/{username}" 
     
Extra Details:  
+ Contains embedded address object and role enums used to generate jwt    

### Pet  
**Details/Endpoints**  
Relationships:  
+ One-to-one with microchips    
+ Many-to-many with users (favorites)   
+ Many-to-many with applications  
  
Endpoints:  
1. Get all pets at "/pets"  
2. Get pet by id at "/pets/{id}"  
3. Get pet by type at "/pets?type=string"  
4. Get pet by username at "/pets/users/{username}"  
5. Get pet by microchip at "pets/microchips/{microchipId}"  
6. Create pet at "/pets"  
7. Update pet by id at "/pets/{id}"  
8. Delete pet by id at "/pets/{id}"  
  
### Application  
**Details/Endpoints**  
Relationships:  
+ Many-to-many with pets    
+ Many-to-one with users  
  
Endpoints:  
1. Get all applications at "/applications"  
2. Get application by id at "/applications/{id}"   
3. Get pet by username at "/applications/users/{username}"  
4. Create application at "applications"  
6. Update application by id at "/applications/{id}"  
7. Delete application by id at "/applications/{id}"   
8. Get applications by keyword search in responses at "/applications?keyword=string" (JPQL)  
  
### Microchip
**Details/Endpoints**  
Relationships:      
+ One-to-one with pets 
  
Endpoints:  
1. Get all microchips at "/microchips"  
2. Get microchip by id at "/microchips/{id}"  
3. Get microchips by status at "/microchips?available=boolean"  
4. Create microchips (takes list) at "microchips"  
6. Update microchip by id at "/microchips/{id}"   
7. Delete microchip by id at "/microchips/{id}"   
  
### Additional Endpoints
**Auth Controller**  
1. User login at "/login" - verifies credentials and generates a jwt  
2. User sign up at "/signup" - sets user role to "USER"
3. Admin user sign up at "/admin/signup" - requires admin user login to access and generates a new user with "ADMIN" and "USER" roles

## Testing
**Details**. 
+ Final: 51 total tests completed/passing (happy paths)
+ 24 controller tests
+ 28 service tests
+ Note: ran into some issues with testing last minute due to Spring
+ utils created for object mapper (convert objects to json string) and for mock constants used in testing  

## AOP
**Details**  
@Before  
+ Info logging for trigger time before a method 
+ Runs for all methods  
@AfterReturning  
+ Info logging return value to string after successful execution  
+ Runs for controller methods due to error when trying to parse null values from repository or service layers  
@AfterThrowing  
+ Error logging after exception is thrown  
+ Runs for all methods  

## Global Exception Handling 
**Rest Exception Handlers**
+ Annotated with @RestControllerAdvice to handle exceptions for controller  
+ Exception types handled:  
1. MethodArgumentNotValidException - for handling validation issues with @RequestBody  
2. HttpClientErrorException - for handling not found errors when unable to locate a requested object  
3. DuplicateKeyException - for handling errors around prohibited duplicates (i.e. unavailable usernames or emails)  
4. IllegalArgumentException - for handling invalid arguments from the request  
5. UsernameNotFoundException - for handling username not found when needed  

**Spring Security/Authentication Exception Handler**
+ Custom AuthenticationEntryPoint exception handler added to format error message in matching format
+ Handles unauthorized requests (i.e. bad credentials)  

## Utils
**InitScript**
+ Uses an event listener on application ready to pre-load user and pet data
+ Initializes 2 users (one admin, one normal user) and 6 pets  

**JwtUtil**
+ Used to handle utility methods dealing with the json web tokens (will be used in the JwtRequestFilter)
+ Methods functions: 
1. Generate token with authenticated user details/roles 
2. Extract all claims (details about the user) stored on the token with a parser
3. Get sign in key using Base64 (binary-to-text encoding) using secret key stored in application.properties 
4. Get username from token via claims  
5. Get expiration date from token set by application/properties  
6. Checks if token is expired with boolean return
7. Validates token with a username check and expiration date check  


