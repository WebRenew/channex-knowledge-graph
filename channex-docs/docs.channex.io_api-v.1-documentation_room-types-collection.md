---
url: "https://docs.channex.io/api-v.1-documentation/room-types-collection"
title: "Room Types Collection | Channex.io"
---

**Room Type** represents an accommodation inventory at your property. A villa, room or bed at a hostel dormitory can be a Room Type.

If your property uses rooms instead of the traditional room type then just create a room type for each room. If you have vacation rentals you need to make a room type for the property since creating a property alone is not enough.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#room-types-list)    Room Types List

Retrieve a list of Room Types associated with user Properties.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/room_types
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "type": "room_type",\
      "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",\
      "attributes": {\
        "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",\
        "title": "Standard Room",\
        "occ_adults": 3,\
        "occ_children": 0,\
        "occ_infants": 0,\
        "default_occupancy": 2,\
        "count_of_rooms": 20,\
        "room_kind": "room",\
        "capacity": null,\
        "content": {\
          "description": "Some Room Type Description Text",\
          "photos": [\
            {\
              "author": "Author Name",\
              "description": "Room View",\
              "id": "198a19d4-42c0-48d8-a55c-c7836b2c1f7e",\
              "kind": "photo",\
              "position": 0,\
              "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
              "room_type_id": "994d1375-dbbd-4072-8724-b2ab32ce781b",\
              "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
            }\
          ]\
        }\
      },\
      "relationships": {\
        "facilities": {\
          "data": []\
        },\
        "property": {\
          "data": {\
            "type": "property",\
            "id": "716305c4-561a-4561-a187-7f5b8aeb5920"\
          }\
        }\
      }\
    }\
  ],
  "meta": {
    "page": 1,
    "total": 1,
    "limit": 10
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#pagination)    Pagination

By default, this method returns the first 10 elements. To get more details, you should use [Pagination](https://docs.channex.io/api-v.1-documentation/api-reference#pagination) arguments.
Information about count of entities and current pagination position contained at `meta` section at response object.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#filter)    Filter

You can use a filter to retrieve Room Types for a specific property:

`GET https://staging.channex.io/api/v1/room_types?filter[property_id]=PROPERTY_ID`

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#undefined-1)

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Room Type objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API key provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#room-type-options)    Room Type Options

Method to get a list of all room types associated with current account without additional details and pagination limits.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/room_types/options
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "default_occupancy": 2,\
        "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",\
        "property_id": "2941337f-50d6-4189-ae13-f76efaf9c515",\
        "title": "Standard Room"\
      },\
      "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",\
      "type": "room_type"\
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

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#get-room-type-by-id)    Get Room Type by ID

Retrieve specific Room Types by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/room_types/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "room_type",
    "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",
    "attributes": {
      "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",
      "title": "Standard Room",
      "occ_adults": 3,
      "occ_children": 0,
      "occ_infants": 0,
      "default_occupancy": 2,
      "count_of_rooms": 20,
      "room_kind": "room",
      "capacity": null,
      "content": {
        "description": "Some Room Type Description Text",
        "photos": [\
          {\
            "author": "Author Name",\
            "description": "Room View",\
            "id": "198a19d4-42c0-48d8-a55c-c7836b2c1f7e",\
            "kind": "photo",\
            "position": 0,\
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
            "room_type_id": "994d1375-dbbd-4072-8724-b2ab32ce781b",\
            "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
          }\
        ]
      }
    },
    "relationships": {
      "facilities": {
        "data": []
      },
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Room Type object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Room Type.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Room Type with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#create-room-type)    Create Room Type

Create a new Room Type.

Availability of all rooms created will be defaulted to 0, to set availability you will need to use the [Availability and Rates API](https://docs.channex.io/api-v.1-documentation/ari#update-availability)

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/room_types
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "room_type": {
    "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "title": "Standard Room",
    "count_of_rooms": 20,
    "occ_adults": 3,
    "occ_children": 0,
    "occ_infants": 0,
    "default_occupancy": 2,
    "facilities": [],
    "room_kind": "room",
    "capacity": null,
    "content": {
      "description": "Some Room Type Description Text",
      "photos": [\
        {\
          "author": "Author Name",\
          "description": "Room View",\
          "kind": "photo",\
          "position": 0,\
          "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
        }\
      ]
    }
  }
}
```

**Success Response Example**

Status Code: `201 Created`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "room_type",
    "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",
    "attributes": {
      "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",
      "title": "Standard Room",
      "occ_adults": 3,
      "occ_children": 0,
      "occ_infants": 0,
      "default_occupancy": 2,
      "count_of_rooms": 20,
      "room_kind": "room",
      "capacity": null,
      "content": {
        "description": "Some Room Type Description Text",
        "photos": [\
          {\
            "author": "Author Name",\
            "description": "Room View",\
            "id": "198a19d4-42c0-48d8-a55c-c7836b2c1f7e",\
            "kind": "photo",\
            "position": 0,\
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
            "room_type_id": "994d1375-dbbd-4072-8724-b2ab32ce781b",\
            "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
          }\
        ]
      }
    },
    "relationships": {
      "facilities": {
        "data": []
      },
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#fields)    Fields

**property\_id** `[required]`

String with a valid UUID of the Property to associate with the created Room Type.

**title** `[required]`

Any non-empty string with maximum length of 255 symbols.
Note: The Room Type will be represented in the system under that title.

**count\_of\_rooms** `[required]`

Any positive integer number.
**Note: This field affects billing if the property is a Vacation Rental. It is the amount of Units to sell of this type.**

**occ\_adults** `[required]`

Any positive integer number.
Note: How many Adult bed spaces have in this Room Type.

**occ\_children** `[required]`

Any positive integer number.
Note: How many Child only bed spaces in this Room Type. Children can sleep in adult beds also. If no Child only beds then set this to 0.

**occ\_infants** `[required]`

Any positive integer number.
Note: How many Infants cots available in this Room Type.

**default\_occupancy** `[required]`

Any positive integer number lower or equal to `occ_adults`.
Note: How many guests can stay in the room by default (without extra spaces). Keep in mind, this field can not be greater than `occ_adults` value. Typically this value is set equal to amount of adults.

**facilities** `[optional]`

List of [Room Type Facility](https://docs.channex.io/api-v.1-documentation/facilities-collection#room-type-facilities-list) IDs associated with Property.

**room\_kind** `[optional]`

String. Type of Room. Enumerable. Possible values: `room`, `dorm`.

**capacity** `[optional]`

Integer. Count of beds at one physical room. Applicable only for Room Type with kind equal to `dorm`.

**content** `[optional]`

Object with content information for property. Content object can contain:
`description` \- optional text field with Property description. By default Description will be equal to `null`.
`photos` \- optional list of photos associated with Property. Each photo is object with next fields:
`url` \- photo URL
`position` \- integer value to represent photo position at list, Photo with position equal to 0 is used as Cover Photo for Room Type
`description` \- Photo text description
`author` \- Name of photo Author
`kind` \- one of three possible values: photo, ad (advertising), menu (restaurant menu photo).
More information about Photo API is [here](https://docs.channex.io/api-v.1-documentation/photos-collection).

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Room Type object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#update-room-type)    Update Room Type

Update a Room Type.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/room_types/:id
```

Example:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/room_types/af08bc1d-8074-476c-bdb7-cec931edaf6a
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "room_type": {
    "title": "Standard Room",
    "count_of_rooms": 20,
    "occ_adults": 3,
    "occ_children": 0,
    "occ_infants": 0,
    "default_occupancy": 2,
    "facilities": [],
    "content": {
      "description": "Some Room Type Description Text",
      "photos": [\
        {\
          "author": "Author Name",\
          "description": "Room View",\
          "kind": "photo",\
          "position": 0,\
          "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
        }\
      ]
    }
  }
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "room_type",
    "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",
    "attributes": {
      "id": "994d1375-dbbd-4072-8724-b2ab32ce781b",
      "title": "Standard Room",
      "occ_adults": 3,
      "occ_children": 0,
      "occ_infants": 0,
      "default_occupancy": 2,
      "count_of_rooms": 20,
      "room_kind": "room",
      "capacity": null,
      "content": {
        "description": "Some Room Type Description Text",
        "photos": [\
          {\
            "author": "Author Name",\
            "description": "Room View",\
            "id": "198a19d4-42c0-48d8-a55c-c7836b2c1f7e",\
            "kind": "photo",\
            "position": 0,\
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
            "room_type_id": "994d1375-dbbd-4072-8724-b2ab32ce781b",\
            "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
          }\
        ]
      }
    },
    "relationships": {
      "facilities": {
        "data": []
      },
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#fields-1)    Fields

This method use same fields as Create Room Type method.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Room Type object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Room Type with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#decrease-occupancy-options-and-connected-channels)    Decrease occupancy options and connected channels

Sometimes you can have necessity to decrease occupancy options for adults (example: change Adults occupancy from 3 to 2). In that case, if removed occupancy option is mapped to Channel, Channex will return Validation Error. This behaviour allow us to prevent any mistakes from client side. But, in case if you understand what you would like to do, you can trigger update operation with `force` flag:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT /api/v1/room_types/:id?force=true
```

In that case, Channex will remove occupancy option and all associated mappings from Channels.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#remove-room-type)    Remove Room Type

Remove a Room Type.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-request-5)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-success-response-5)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/room-types-collection#tab-error-response-5)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/room_types/:id
```

Example:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/room_types/af08bc1d-8074-476c-bdb7-cec931edaf6a
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#flags)    Flags

Because the system does not allow to remove room types associated with a channel, we expose an additional feature flag - force. To remove RoomType and un-map it from a channel.

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/room_types/:id?force=true
```

Example:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/room_types/af08bc1d-8074-476c-bdb7-cec931edaf6a?force=true
```

Please, be careful with this method, once a room type is removed we can't restore it and any channel mapping information.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/room-types-collection\#returns-4)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Room Type with provided ID is not present at system.

[PreviousGroup Users Collection](https://docs.channex.io/api-v.1-documentation/group-users-collection) [NextRate Plans Collection](https://docs.channex.io/api-v.1-documentation/rate-plans-collection)

Last updated 9 months ago

Was this helpful?