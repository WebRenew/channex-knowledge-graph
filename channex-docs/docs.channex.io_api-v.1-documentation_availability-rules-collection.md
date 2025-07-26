---
url: "https://docs.channex.io/api-v.1-documentation/availability-rules-collection"
title: "Availability Rules Collection | Channex.io"
---

Availability Rules is a way to setup Availability Overrides for specific Room Types and Channels. This feature can be useful if you would like to close out some specific channel, decrease Availability or set Max Availability for it.

Example of use cases:

- Stop sales for Christmas vacation at Channel A

- Set Max Availability for Room Type A at Channel B


## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#get-list-of-availabilty-rules)    Get List of Availabilty Rules

Retrieve a list of Availability Rules associated with user Properties.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/channel_availability_rules?filter[property_id]={PROPERTY_ID}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "data": [\
        {\
            "attributes": {\
                "id": "98a6b45d-49aa-4080-8bfc-9ec94fe24d81",\
                "type": "close_out",\
                "value": null,\
                "title": "Demo",\
                "days": [\
                    "mo",\
                    "tu",\
                    "we",\
                    "th",\
                    "fr",\
                    "sa",\
                    "su"\
                ],\
                "end_date": "2025-05-30",\
                "start_date": "2025-05-21",\
                "affected_channels": [\
                    "a2a767c0-187a-4476-9b23-8cceebe917d4"\
                ],\
                "affected_room_types": [\
                    "61660d47-e87f-44b1-a095-f74f73cf6da2"\
                ]\
            },\
            "id": "98a6b45d-49aa-4080-8bfc-9ec94fe24d81",\
            "type": "channel_availability_rule",\
            "relationships": {\
                "property": {\
                    "data": {\
                        "id": "18535b75-26a0-4716-ae99-0578006639c5",\
                        "type": "property"\
                    }\
                }\
            }\
        }\
    ],
    "meta": {
        "total": 1,
        "limit": 4,
        "order_by": "inserted_at",
        "page": 1,
        "order_direction": "desc"
    }
}
```

**Unauthorised Error Response**

Status Code: `401 Unauthorized`

Copy

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "unauthorized",
    "title": "Unauthorized"
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#pagination)    Pagination

By default, this method returns the first 10 elements. To get more details, you should use [Pagination](https://docs.channex.io/api-v.1-documentation/api-reference#pagination) arguments.
Information about count of entities and current pagination position contained at `meta` section at response object.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Room Type objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API key provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#get-availability-rule-by-id)    Get Availability Rule by ID

Retrieve specific Availability Rule by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/channel_availability_rules/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "id": "98a6b45d-49aa-4080-8bfc-9ec94fe24d81",
    "type": "channel_availability_rule",
    "attributes": {
        "id": "98a6b45d-49aa-4080-8bfc-9ec94fe24d81",
        "type": "close_out",
        "value": null,
        "title": "Demo",
        "days": [\
            "mo",\
            "tu",\
            "we",\
            "th",\
            "fr",\
            "sa",\
            "su"\
        ],
        "end_date": "2025-05-30",
        "start_date": "2025-05-21",
        "affected_channels": [\
            "a2a767c0-187a-4476-9b23-8cceebe917d4"\
        ],
        "affected_room_types": [\
            "61660d47-e87f-44b1-a095-f74f73cf6da2"\
        ]
    },
    "relationships": {
        "property": {
            "data": {
                "id": "18535b75-26a0-4716-ae99-0578006639c5",
                "type": "property"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Availability Rules object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Availability Rule.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Availability Rule with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#create-availability-rule)    Create Availability Rule

Create a new Availability Rule.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/channel_availability_rules
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "channel_availability_rule": {
    "title": "Demo",
    "type": "close_out",
    "affected_channels": [\
      "aa771972-ca6c-4985-a4ea-1aad29a0c2fd"\
    ],
    "affected_room_types": [\
      "ae1c960d-5123-4be1-94ad-b50b181fc259"\
    ],
    "days": ["mo", "tu", "we", "th", "fr", "sa", "su"],
    "start_date": "2025-05-21",
    "end_date": "2025-05-31",
    "property_id": "18535b75-26a0-4716-ae99-0578006639c5"
  }
}
```

**Success Response Example**

Status Code: `201 Created`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "id": "98a6b45d-49aa-4080-8bfc-9ec94fe24d81",
    "type": "channel_availability_rule",
    "attributes": {
        "id": "98a6b45d-49aa-4080-8bfc-9ec94fe24d81",
        "type": "close_out",
        "value": null,
        "title": "Demo",
        "days": [\
            "mo",\
            "tu",\
            "we",\
            "th",\
            "fr",\
            "sa",\
            "su"\
        ],
        "end_date": "2025-05-30",
        "start_date": "2025-05-21",
        "affected_channels": [\
            "a2a767c0-187a-4476-9b23-8cceebe917d4"\
        ],
        "affected_room_types": [\
            "61660d47-e87f-44b1-a095-f74f73cf6da2"\
        ]
    },
    "relationships": {
        "property": {
            "data": {
                "id": "18535b75-26a0-4716-ae99-0578006639c5",
                "type": "property"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#fields)    Fields

**property\_id** `[required]`

String with a valid UUID of the Property to associate with the created Availability Rule.

**affected\_channels** `[required]`

List of valid UUID of Channels which should be affected.

**affected\_room\_types** `[required]`

List of valid UUID of Room Types which should be affected.

**type** `[required]`

Enumerable. Possible values:

- `close_out`

- `availability_offset`

- `max_availability`


**value**

Integer. Required ONLY if `type` set to `availability_offset` or `max_availability`.

If `type` equal to `availability_offset`, `value` will be extracted from current Room Type availability. As result, OTA Availability for selected room type will be calculated as:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
Room Availability - Value = OTA Availabiltiy
```

If `type` equal to `max_availability`, `value` will be used as max possible value for OTA Availability.

**start\_date** `[required]`

Date. Should be provided as ISO 8601 format `YYYY-MM-DD`.

**end\_date**

Optional. Date. Should be provided as ISO 8601 format `YYYY-MM-DD`. If it is empty, Availability Rule will have affect to all dates after `start_date`.

**days**

Optional. List of day of weeks what should be affected. Supported values: `"mo", "tu", "we", "th", "fr", "sa", "su"`.

This field allow to setup Rule which will be applicable for every Sunday or Monday. By default it is empty and applicable for each day.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Availability Rule object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#update-availability-rule)    Update Availability Rule

Update a Room Type.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/channel_availability_rules/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "channel_availability_rule": {
    "title": "Demo",
    "type": "close_out",
    "affected_channels": [\
      "aa771972-ca6c-4985-a4ea-1aad29a0c2fd"\
    ],
    "affected_room_types": [\
      "ae1c960d-5123-4be1-94ad-b50b181fc259"\
    ],
    "days": ["mo", "tu", "we", "th", "fr", "sa", "su"],
    "start_date": "2025-05-21",
    "end_date": "2025-05-31",
    "property_id": "18535b75-26a0-4716-ae99-0578006639c5"
  }
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "id": "98a6b45d-49aa-4080-8bfc-9ec94fe24d81",
    "type": "channel_availability_rule",
    "attributes": {
        "id": "98a6b45d-49aa-4080-8bfc-9ec94fe24d81",
        "type": "close_out",
        "value": null,
        "title": "Demo",
        "days": [\
            "mo",\
            "tu",\
            "we",\
            "th",\
            "fr",\
            "sa",\
            "su"\
        ],
        "end_date": "2025-05-30",
        "start_date": "2025-05-21",
        "affected_channels": [\
            "a2a767c0-187a-4476-9b23-8cceebe917d4"\
        ],
        "affected_room_types": [\
            "61660d47-e87f-44b1-a095-f74f73cf6da2"\
        ]
    },
    "relationships": {
        "property": {
            "data": {
                "id": "18535b75-26a0-4716-ae99-0578006639c5",
                "type": "property"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#fields-1)    Fields

This method use same fields as Create Availability Rule method.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Availability Rule object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if API Key with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/availability-rules-collection\#remove-availability-rule)    Remove Availability Rule

Remove an Availability Rule.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/availability-rules-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/channel_availability_rules/:id
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

[PreviousReviews Collection](https://docs.channex.io/api-v.1-documentation/reviews-collection) [NextStripe Tokenization App](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app)

Last updated 1 month ago

Was this helpful?