# Neuroscience Club API
## Contribution
> [!NOTE]
> This will be changed once we have to present.

**Front Page Dev**: Matt\
**Admin Page Dev**: Han\
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
**What?**\
Endpoint to authenticate if the user logging in has the correct credentials to use the API.

**Info**\
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
```
This will set a cookie on the admins browser that holds a valid SessionID that valid for 1h. Then the user will have to login again.

### GET /execs
**What?**\
Endpoint to get all exec information form the database.

**Info**\
A basic get request that returns a list of all the execs information.

### GET /execs/:id
> [!NOTE]
> Honestly in my opinion, this if fucking useless. I am planning on removing this feature in the future.

**What?**\
Endpoint to get specific exec information from the database.

**Info**\
A get request that returns an object containing the specified user's ID.
The `:id` is of type *string*.

### POST /execs/add
**What?**\
Endpoint to add a new exec into the database.

**Info**\
This endpoint takes in a JSON containing `name`, `stream`, `postion`. 
The endpoints also take in two optional body variables `linkedin` and `profilePic`.

> [!NOTE]
> Later in development, postition will have checks and limited options. More Social Media options will also be added.

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
**What?**\
Endpoint to delete an existing exec in the database.

**Info**\
This endpoint takes the execID and deletes the exec info if the exec info exists in the database.
The `:id` is of type *string*.

### GET /events
**What?**\
Endpoint to get all event information form the database.

**Info**\
A basic get request that returns a list of all the events.

### GET /events/:id
**What?**\
Endpoint to get specific event information from the database.

**Info**\
A get request that returns an object containing the specified event.\
The `:id` is of type *string*.

### POST /events/add
**What?**\
Endpoint to add a new events into the database.

**Info**\
This endpoint takes in a JSON containing `name`, `date`, `description`, `status`, `bannerURL`.\
Here are the types:
```ts
interface addEventType{
    name: string,
    date: string,
    description: string,
    status: boolean,
    bannerURL: string
}
```
Example:
```json
{
    "name" : "Online Webinar",
    "date" : "01-05-2025",
    "description" : "An online webinar about a topic",
    "status": false,
    "bannerURL": "www.event.com/img.png"
}
```

### GET /events/images/:id
**What?**\
Endpoint to get all images added into an event album.

**Info**\
A get reqest that returns a list all the images added to the event.\
The `:id` is of type *string*.

### POST /events/images/:id
**What?**\
Endpoint to insert image into an event album.

**Info**\
Endpoint takes in a JSON containting a single body variable `url`.\
Here is the type:
```ts
interface addImageType{
    url: string
}
```
Example:
```json
{
    "url" : "https://www.imagewebsite.com/image.png"
}
```

### POST /events/delete/:id
**What?**\
Endpoint to delete exsisting event into the database. 

**Info**\
A post request that deletes an exsisting event. This endpoint does not take any JSON and returns the deleted event. \
The `:id` is of type *string*.

### GET /announcement
**What?**\
Endpoint to get all announcements form the database.

**Info**\
A basic get request that returns a list of all the announcement.

### GET /announcement/add
**What?**\
Endpoint to add a new events into the database.

**Info**\
This endpoint takes in a JSON containing `heading`, `body`.\
There is a `date` that recodrs the date and time of when the reqest is sent.\
Here are the types:
```ts
export interface announcementAddType{
    heading : string,
    body: string
}
```
Example:
```json
{
    "heading" : "Test Announcemnt 2",
    "body" : "I dont really know what im doing so bare with me."
}
```

### POST /announcement/delete/:id
**What?**\
Endpoint to delete exsisting announcemnet into the database. 

**Info**\
A post request that deletes an exsisting anouncemnts. This endpoint does not take any JSON and returns the deleted announcemnet. \
The `:id` is of type *string*.