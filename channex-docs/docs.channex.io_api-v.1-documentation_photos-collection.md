---
url: "https://docs.channex.io/api-v.1-documentation/photos-collection"
title: "Photos Collection | Channex.io"
---

**Photo** is entity to represent photo associated with Property and Room Type (optional).

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#photos-list)    Photos List

Retrieve list of Photos associated with user Properties.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/photos
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "author": null,\
        "description": null,\
        "id": "ae75d43e-21c5-46b6-a593-5046791f7841",\
        "kind": "ad",\
        "position": 0,\
        "property_id": "52397a6e-c330-44f4-a293-47042d3a3607",\
        "room_type_id": null,\
        "url": "https://img.channex.io/312fa6cb-8151-409b-b612-773e271a76df/"\
      },\
      "id": "ae75d43e-21c5-46b6-a593-5046791f7841",\
      "type": "photo"\
    }\
  ],
  "meta": {}
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Photo objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#get-photo-by-id)    Get Photo by ID

Retrieve specific Photo by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/photos/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "author": null,
      "description": null,
      "id": "ae75d43e-21c5-46b6-a593-5046791f7841",
      "kind": "ad",
      "position": 0,
      "property_id": "52397a6e-c330-44f4-a293-47042d3a3607",
      "room_type_id": null,
      "url": "https://img.channex.io/312fa6cb-8151-409b-b612-773e271a76df/"
    },
    "id": "ae75d43e-21c5-46b6-a593-5046791f7841",
    "type": "photo"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Photo object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Photo.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Photo with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#create-photo)    Create Photo

Create new Photo.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/photos
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "photo": {
    "author": "Author Name",
    "description": "Room View",
    "kind": "photo",
    "position": 0,
    "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/",
    "property_id": "52397a6e-c330-44f4-a293-47042d3a3607",
    "room_type_id": null
  }
}
```

**Success Response Example**

Status Code: `201 Created`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "author": "Author Name",
      "description": "Room View",
      "id": "656d8cab-beaa-45a3-8ddb-44684816edba",
      "kind": "photo",
      "position": 0,
      "property_id": "52397a6e-c330-44f4-a293-47042d3a3607",
      "room_type_id": null,
      "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"
    },
    "id": "656d8cab-beaa-45a3-8ddb-44684816edba",
    "type": "photo"
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
      "url": [\
        "can't be blank"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#fields)    Fields

**property\_id** `[required]`

String with valid UUID of Property object what you would like to associate with created Photo.

**url** `[required]`

Valid URL address of Photo image.

**room\_type\_id** `[optional]`

String with valid UUID of Room Type object what you would like to associate with created Photo.
If `room_type_id` is `null`, Photo will be associated only with Property.

**kind** `[optional]`

One of three possible values: `photo`, `ad` (advertising), `menu` (restaurant menu photo).
By default value kind will be equal to `photo`.

**author** `[optional]`

Name of photo author.

**description** `[optional]`

Text with Photo description.

**position** `[optional]`

Any positive integer number.
This field represent Photo position at list of Property or Room Type Photos. Photo with position equal to 0 is used as Cover Photo.
Position should be uniq per `property_id` and `room_type_id` combination.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Photo object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#upload-photo)    Upload Photo

To upload Photos and create it you should use next API:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/photos/upload

--form 'photo=@"paht_to_photo/photo.jpg"
```

In response you will get a link to temporary photo:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "url": "https://ams3.digitaloceanspaces.com/temporaryphotos/a66edb22-47da-4da8-bab5-3b6f4056256f.jpg"
}
```

Then you can use this `url` in Create Photo API call.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#update-photo)    Update Photo

Update Photo.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/photos/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "photo": {
    "author": "Author Name",
    "description": "Room View",
    "kind": "photo",
    "position": 0,
    "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/",
    "property_id": "52397a6e-c330-44f4-a293-47042d3a3607",
    "room_type_id": null
  }
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "author": "Author Name",
      "description": "Room View",
      "id": "656d8cab-beaa-45a3-8ddb-44684816edba",
      "kind": "photo",
      "position": 0,
      "property_id": "52397a6e-c330-44f4-a293-47042d3a3607",
      "room_type_id": null,
      "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"
    },
    "id": "656d8cab-beaa-45a3-8ddb-44684816edba",
    "type": "photo"
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
      "url": [\
        "can't be blank"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#fields-1)    Fields

This method use same fields as Create Photo method.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Photo object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Photo with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#remove-photo)    Remove Photo

Remove Photo.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/photos-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/photos/:id
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
    "code": "resource_not_found"
    "title": "Resource Not Found"
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#returns-4)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Photo with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/photos-collection\#batch-operations)    Batch operations

API methods to create or update [Property](https://docs.channex.io/api-v.1-documentation/hotels-collection) or [Room Type](https://docs.channex.io/api-v.1-documentation/room-types-collection) have implementation of Photo batch operations.
To create Property with Photos, you can pass list of Photo arguments as value into `content.photos` key of affected object.

Batch operations support logic to create new Photo entity associated with parent object, update existed photos or drop it.

To update Photo at batch operation, you must provide photo with it ID.

To drop Photo at batch operation, you can pass additional optional key: `is_removed` with value equal to `true` at Photo object what are you like to remove.

Baseline loading.

Progressive loading.

[PreviousChannel API](https://docs.channex.io/api-v.1-documentation/channel-api) [NextHotel Policy Collection](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection)

Last updated 3 months ago

Was this helpful?