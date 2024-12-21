# Neuroscience Club API
## Contribution
> [!NOTE]
> This will be changed once we have to present.
**Front Page Dev**: Matt
**Admin Page Dev**: Han
**Backend Dev**: Austin 

## About
> [!NOTE]
> This will be changed once we have to present
This is the backend for the Neuroscience Club website.

## Documentation
> [!WARNING]
> Still very unstable and features yet to be added.

API url: [neuroscienceclubbackend-production.up.railway.app](neuroscienceclubbackend-production.up.railway.app)

### POST /auth
**What?**
Endpoint to authenticate if the user logging in has the correct credentials to use the API.

**Info**
This endpoint takes a JSON containing the `username` and `password`.
Here are the types:
```ts
interface authType{
    username: string,
    password: string
}
```
Example:
```json
{
    "username": "username",
    "password": "password"
}
This will set a cookie on the admins browser that holds a valid SessionID that valid for 1h. Then the user will have to login again.
```

### GET /execs
**What?**
Endpoint to get all exec information form the database.

**Info**
A basic get request that returns a list of all the execs information.

### GET /execs/:id
> [!NOTE]
> Honestly in my opinion, this if fucking useless. I am planning on removing this feature in the future.
**What?**
Endpoint to get specific exec information from the database.

**Info**
A get request that returns an object containing the specified user's ID.
The `:id` is of type *string*.

### POST /execs/add
**What?**
Endpoint to add a new exec into the database.

**Info**
This enpoint takes in a JSON containing `name`, `stream`, `postion`. 
The endpoints also takes in two optional body variables `linkedin` and `profilePic`.
Here are the types:
```ts
interface addExecType{
    name: string,
    stream: string,
    position: string,
    linkedin?: string
    profilePic?: string
}
```
Example:
```json
{
    "name" : "John",
    "stream" : "Computer Science",
    "position" : "Event Exec",
    "linkedin" : "https://linkden.something.com/john",
    "profilePic" : "soomething.com/john.png"
}
```

### POST /execs/delete/:id
**What?**
Endpoint to delete an exsisting exec in the database.

**Info**
This endpoint takes the execID and deletes the exec info if the exec info exsists in the database.
The `:id` is of type *string*.