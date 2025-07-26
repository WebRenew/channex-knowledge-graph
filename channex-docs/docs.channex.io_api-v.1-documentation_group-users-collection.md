---
url: "https://docs.channex.io/api-v.1-documentation/group-users-collection"
title: "Group Users Collection | Channex.io"
---

**Group User** is an association between a Group and a User, represents who can manage a group and all properties under the group with which role and access rights.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#group-users-list)    Group Users List

Retrieve list of Group Users associated with a Group.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/group_users?filter[group_id]=GROUP_ID
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "id": "776533f2-c10e-49d8-bddc-14b3e27c2a00",\
      "type": "group_user"\
      "attributes": {\
        "id": "776533f2-c10e-49d8-bddc-14b3e27c2a00",\
        "overrides": null,\
        "group_id": "52397a6e-c330-44f4-a293-47042d3a3607",\
        "role": "owner",\
        "user_id": "c9cfa184-5095-4ef2-bbe2-e723ffb49184"\
      },\
      "relationships": {\
        "group": {\
          "data": {\
            "id": "52397a6e-c330-44f4-a293-47042d3a3607",\
            "type": "group"\
          }\
        },\
        "user": {\
          "data": {\
            "id": "c9cfa184-5095-4ef2-bbe2-e723ffb49184",\
            "type": "user",\
            "email": "user@channex.io",\
            "name": "Channex User"\
          }\
        }\
      }\
    }\
  ]
}
```

**Unauthorised Error Response**

Status Code: `401 Unauthorized`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "unauthorized",
    "title": "Unauthorized"
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Group User objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#invite-user-to-group)    Invite User to Group

Create a new Group User. By inviting a User into a Group, you are automatically granting access for this user to all properties in the Group.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/group_users
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "invite": {
    "group_id": "52397a6e-c330-44f4-a293-47042d3a3607",
    "user_email": "other_user@channex.io",
    "role": "user",
    "overrides": {}
  }
}
```

**Success Response Example**

Status Code: `201 Created`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "id": "776533f2-c10e-49d8-bddc-14b3e27c2a00",
    "type": "group_user"
    "attributes": {
      "id": "776533f2-c10e-49d8-bddc-14b3e27c2a00",
      "overrides": null,
      "group_id": "52397a6e-c330-44f4-a293-47042d3a3607",
      "role": "owner",
      "user_id": "c9cfa184-5095-4ef2-bbe2-e723ffb49184"
    },
    "relationships": {
      "group": {
        "data": {
          "id": "52397a6e-c330-44f4-a293-47042d3a3607",
          "type": "group"
        }
      },
      "user": {
        "data": {
          "id": "c9cfa184-5095-4ef2-bbe2-e723ffb49184",
          "type": "user",
          "email": "user@channex.io",
          "name": "Channex User"
        }
      }
    }
  }
}
```

**Bad Request Error Response**

Status Code: `400 Bad Request`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "bad_request",
    "title": "Bad Request",
    "details": "User already invited"
  }
}
```

**Unauthorised Error Response**

Status Code: `401 Unauthorized`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "unauthorized",
    "title": "Unauthorized"
  }
}
```

**Forbidden Error Response**

Status Code: `403 Forbidden`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "forbidden",
    "title": "Forbidden"
  }
}
```

**Validation Error Response**

Status Code: `422 Unprocessable Entity`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "validation_error",
    "title": "Validation Error",
    "details": {
      "user_email": [\
        "can't be blank"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#fields)    Fields

**group\_id** `[required]`

String with valid UUID for Group object what you would use as target for invitation.

**user\_email** `[required]`

String with a valid email address of invited user.
Note: If user is not registered at our system, we are create they account automatically and send email with instructions to on-board into channex.io.

**role** `[required]`

String with a valid role name.
Right now you can use 2 roles - `owner` and `user`.

**overrides** `[optional]`

JSON Object with access policies overrides.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Group User object in the answer.

**Bad Request Error**
Method can return a Bad Request Error result with `400 Bad Request` HTTP Code if provided user already invited.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Forbidden Error**
Method can return a Forbidden Error result with `403 Forbidden` HTTP Code if current user not have permissions to invite user into provided property.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#get-group-user-by-id)    Get Group User by ID

Retrieve a Group User by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/group_users/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "id": "776533f2-c10e-49d8-bddc-14b3e27c2a00",
    "type": "group_user"
    "attributes": {
      "id": "776533f2-c10e-49d8-bddc-14b3e27c2a00",
      "overrides": null,
      "property_id": "52397a6e-c330-44f4-a293-47042d3a3607",
      "role": "owner",
      "user_id": "c9cfa184-5095-4ef2-bbe2-e723ffb49184"
    },
    "relationships": {
      "group": {
        "data": {
          "id": "52397a6e-c330-44f4-a293-47042d3a3607",
          "type": "group"
        }
      },
      "user": {
        "data": {
          "id": "c9cfa184-5095-4ef2-bbe2-e723ffb49184",
          "type": "user",
          "email": "user@channex.io",
          "name": "Channex User"
        }
      }
    }
  }
}
```

**Validation Error Response**

Status Code: `401 Unauthorized`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "unauthorized",
    "title": "Unauthorized"
  }
}
```

**Forbidden Error Response**

Status Code: `403 Forbidden`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "forbidden",
    "title": "Forbidden"
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Group User object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Forbidden Error**
Method can return a Forbidden Error result with `403 Forbidden` HTTP Code if current user not have permissions to call this action.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#update-group-user)    Update Group User

Update the Group User information.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/group_users/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "group_user": {
    "role": "user",
    "overrides": null
  }
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "id": "776533f2-c10e-49d8-bddc-14b3e27c2a00",
    "type": "group_user"
    "attributes": {
      "id": "776533f2-c10e-49d8-bddc-14b3e27c2a00",
      "overrides": null,
      "group_id": "52397a6e-c330-44f4-a293-47042d3a3607",
      "role": "owner",
      "user_id": "c9cfa184-5095-4ef2-bbe2-e723ffb49184"
    },
    "relationships": {
      "group": {
        "data": {
          "id": "52397a6e-c330-44f4-a293-47042d3a3607",
          "type": "group"
        }
      },
      "user": {
        "data": {
          "id": "c9cfa184-5095-4ef2-bbe2-e723ffb49184",
          "type": "user",
          "email": "user@channex.io",
          "name": "Channex User"
        }
      }
    }
  }
}
```

**Unauthorised Error Response**

Status Code: `401 Unauthorized`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "unauthorized",
    "title": "Unauthorized"
  }
}
```

**Forbidden Error Response**

Status Code: `403 Forbidden`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "forbidden",
    "title": "Forbidden"
  }
}
```

**Resource Not Found Error Response**

Status Code: `404 Not Found`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "resource_not_found",
    "title": "Resource Not Found"
  }
}
```

**Validation Error Response**

Status Code: `422 Unprocessable Entity`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "validation_error",
    "title": "Validation Error",
    "details": {
      "role": [\
        "can't be blank"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#fields-1)    Fields

Through this method you can update only two fields - role and overrides. Please see Invite User to Group for more detailed information.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Group User object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Forbidden Error**
Method can return a Forbidden Error result with `403 Forbidden` HTTP Code if current user not have permissions to call this action.

**Resource Not Found Error**
Method can return a Resource Not Found Error result with `404 Not Found` HTTP Code if requested Group User is not defined.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#withdraw-group-user-access)    Withdraw Group User Access

Revoke Group User access to a specific Group.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/group-users-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/group_users/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "meta": {
    "message": "Success"
  }
}
```

**Bad Request Error Response**

Status Code: `400 Bad Request`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "bad_request",
    "details": "User can not withdraw themself",
    "title": "Bad Request"
  }
}
```

**Unauthorised Error Response**

Status Code: `401 Unauthorized`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "unauthorized",
    "title": "Unauthorized"
  }
}
```

**Forbidden Error Response**

Status Code: `403 Forbidden`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "forbidden",
    "title": "Forbidden"
  }
}
```

**Resource Not Found Error Response**

Status Code: `404 Not Found`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "resource_not_found",
    "title": "Resource Not Found"
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/group-users-collection\#returns-4)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful.

**Bad Request Error**
Method can return a Bad Request Error result with `400 Bad Request` HTTP Code if user will try to remove them self.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Forbidden Error**
Method can return a Forbidden Error result with `403 Forbidden` HTTP Code if current user not have permissions to call this action.

**Resource Not Found Error**
Method can return a Resource Not Found Error result with `404 Not Found` HTTP Code if requested Group User is not defined.

[PreviousGroups Collection](https://docs.channex.io/api-v.1-documentation/groups-collection) [NextRoom Types Collection](https://docs.channex.io/api-v.1-documentation/room-types-collection)

Last updated 5 years ago

Was this helpful?