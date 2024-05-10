API Documentation
Authentication
Register User
Registers a new user.

URL: /api/v1/user/register
Method: POST
Request Body:
name: String (required)
email: String (required)
phone: Number (required)
password: String (required)
Login User
Logs in an existing user.

URL: /api/v1/user/login
Method: POST
Request Body:
email: String (required)
password: String (required)
Logout User
Logs out the current user.

URL: /api/v1/user/logout
Method: GET
Authentication: Required
Get User Profile
Retrieves the profile of the authenticated user.

URL: /api/v1/user/me
Method: GET
Authentication: Required
Tasks
Create Task
Creates a new task.

URL: /api/v1/task/post
Method: POST
Request Body:
title: String
description: String
dueDate: Date
priority: String
Delete Task
Deletes a task by its ID.

URL: /api/v1/task/delete/:id
Method: DELETE
Authentication: Required
Update Task
Updates a task by its ID.

URL: /api/v1/task/update/:id
Method: PUT
Request Body:
title: String
description: String
status: String
archived: Boolean
priority: String
dueDate: Date
Authentication: Required
Get User's Tasks
Retrieves all tasks belonging to the authenticated user.

URL: /api/v1/task/mytask
Method: GET
Authentication: Required
Get Single Task
Retrieves a single task by its ID.

URL: /api/v1/task/single/:id
Method: GET
Authentication: Required
