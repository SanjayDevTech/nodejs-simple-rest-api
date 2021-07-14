# nodejs-simple-rest-api

## Deployment:

-   Docker build
-   Deploy to heroku with ENV VARIABLES (DB, URI)
-   DB = Mongodb database name
-   URI = Mongodb URI string in the format `user@password:url`

---

## Models:

### User Model:

```kt
data class User(
    val email: String,
    val name: String,
    val password: String?,
)
```

### Post Model:

```kt
data class Post(
    val _id: String,
    val title: String,
    val content: String,
    val email: String,
    val created: Long,
    val updated: Long,
)
```

---

## Request:

```kt
data class PostRequest(
    val content: String,
    val title: String,
    val email: String,
    val password: String
)
```

---

## Response:

```kt
data class Response<out T>(
    val status: Boolean,
    val errorMessage: String,
    val value: T,
)
```

---

## API

### GET /auth

_List all users_

Response:

```kt
// List of users but without password field
val value: List<User>
```

### GET /auth/:emailId

_Check if the user with email exists_

Response:

```kt
// true if user exists
val value: Boolean
```

### POST /auth/login

_Login with email and password_

Request:

```kt
// only email & password (not name)
User
```

Response:

```kt
// User object with password to store in local db
val value: User
```

### POST /auth/register

_Register with email, name and password_

Request:

```kt
User
```

Response:

```kt
// email is returned back
val value: String
```

### GET /post

_List all posts available, if email given list all posts published by that user_

Query Params:

```kt
// user email optional
val email: String
```

Response:

```kt
val value: List<Post>
```

### GET /post/:postId

_Returns the post by id_

Response:

```kt
val value: Post
```

### POST /post/:postId

_Updates the existing post_

Request:

```kt
PostRequest
```

Response:

```kt
// post id
val value: String
```

### PUT /post

_Publish new post_

Request:

```kt
PostRequest
```

Response:

```kt
// post id
val value: String
```

### DELETE /post/:postId

_Delete the post_

Request:

```kt
// current user
User
```

Response:

```kt
val value: Boolean
```
