---
url: "https://docs.channex.io/api-v.1-documentation/groups-collection"
title: "Groups Collection | Channex.io"
---

**Group** is an entity to combine your properties together to make management easier. You can combine properties to one or many groups.

A Property must be a member of a group, you cannot remove from a group unless it is a member of another group

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#groups-list)    Groups List

Retrieve list of Groups associated with user.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/groups
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "type": "group",\
      "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
      "attributes": {\
        "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
        "title": "User Group"\
      },\
      "relationships": {\
        "properties": {\
          "data": [\
            {\
              "id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
              "type": "property",\
              "attributes": {\
                "id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
                "title": "Property A"\
              }\
            },\
            {\
              "id": "1b0e7c64-93b7-49f2-8b3c-99568f78b907",\
              "type": "property",\
              "attributes": {\
                "id": "1b0e7c64-93b7-49f2-8b3c-99568f78b907",\
                "title": "Property B"\
              }\
            }\
          ]\
        }\
      }\
    },\
    {\
      "type": "group",\
      "id": "e1804b27-ca56-4bb6-9fac-8ed9662d3af7",\
      "attributes": {\
        "id": "e1804b27-ca56-4bb6-9fac-8ed9662d3af7",\
        "title": "test"\
      },\
      "relationships": {\
        "properties": {\
          "data": []\
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Group objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#get-group-by-id)    Get Group by ID

Retrieve specific Group associated with User by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/groups/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "group",
    "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",
    "attributes": {
      "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",
      "title": "User Group"
    },
    "relationships": {
      "properties": {
        "data": [\
          {\
            "id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
            "type": "property",\
            "attributes": {\
              "id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
              "title": "Property A"\
            }\
          },\
          {\
            "id": "1b0e7c64-93b7-49f2-8b3c-99568f78b907",\
            "type": "property",\
            "attributes": {\
              "id": "1b0e7c64-93b7-49f2-8b3c-99568f78b907",\
              "title": "Property B"\
            }\
          }\
        ]
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

**Not Found Error**

Status Code: `404 Not Found`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "not_found",
    "title": "Resouce Not Found"
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Group object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Property.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Group with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#create-group)    Create Group

Create a new Group.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/groups
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "group": {
    "title": "South London Group"
  }
}
```

**Success Response Example**

Status Code: `201 Created`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "group",
    "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",
    "attributes": {
      "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",
      "title": "South London Group"
    },
    "relationships": {
      "properties": {
        "data": []
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

**Validation Error Response**

Status Code: `422 Unprocessable Entity`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "validation_error",
    "title": "Validation Error",
    "details": {
      "title": [\
        "can't be blank"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#fields)    Fields

**title** `[required]`

Any non-empty string with maximum length of 255 symbols.
Note: The Group will be represented in the system under that title.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Group object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#update-group)    Update Group

Update a Group.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/groups/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "group": {
    "title": "North London Group"
  }
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "group",
    "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",
    "attributes": {
      "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",
      "title": "North London Group"
    },
    "relationships": {
      "properties": {
        "data": []
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

**Not Found Error**

Status Code: `404 Not Found`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "resource_not_found"
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
      "title": [\
        "can't be blank"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#fields-1)    Fields

**title** `[required]`

Any non-empty string with maximum length of 255 symbols.
Note: The Group will be represented in the system under that title.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Group object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Group with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#remove-group)    Remove Group

Remove a Group.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/groups/:id
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

**Not Found Error**

Status Code: `404 Not Found`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "resource_not_found"
    "title": "Resource Not Found"
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#returns-4)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Bad Request Error** Method can return a Bad Request Error result with `400 Bad Request` HTTP Code if the Group you would like to remove has at least one Property attached.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Group with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#associate-property-with-group)    Associate Property With Group

Associate a Property with a Group.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-request-5)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-success-response-5)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-error-response-5)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/groups/:group_id/properties/:property_id
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

**Not Found Error**

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
      "hotel_id": [\
        "Only one GroupHotel entity per Group and Hotel pair allowed!"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#returns-5)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Group or Property with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if Property is already associated with a Group.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#remove-property-from-group)    Remove Property From Group

Remove a Property from a Group.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-request-6)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-success-response-6)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/groups-collection#tab-error-response-6)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/groups/:group_id/properties/:property_id
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

**Not Found Error**

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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/groups-collection\#returns-6)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Bad Request Error** Method can return a Bad Request Error result with `400 Bad Request` HTTP Code if the Property you would like to remove from Group not attached to any other Group.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Group or Property with provided ID is not present at system.

[PreviousProperty Users Collection](https://docs.channex.io/api-v.1-documentation/property-users-collection) [NextGroup Users Collection](https://docs.channex.io/api-v.1-documentation/group-users-collection)

Last updated 5 years ago

Was this helpful?