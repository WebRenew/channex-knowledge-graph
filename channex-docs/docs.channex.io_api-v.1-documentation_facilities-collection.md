---
url: "https://docs.channex.io/api-v.1-documentation/facilities-collection"
title: "Facilities Collection | Channex.io"
---

A **Facility** is an entity to represent facilities, amenities, inventory available for Guest coming to your Property.

We have 2 list of facilities - Property Facilities and Room Type Facilities.

Each Facility associated with Facility Category.

Each Property and Room Type can have they own list of Facilities.

Channex provides around 181 default facilities. If you can't find a required facility on our list, please contact us.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/facilities-collection\#property-facilities-list)    Property Facilities List

Method to get a list of Facilities.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/property_facilities
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "id": "4d7cc1cd-d79f-407b-9be4-eb0af95e1bd5",\
        "category": "general",\
        "title": "Baby safety gates"\
      },\
      "id": "4d7cc1cd-d79f-407b-9be4-eb0af95e1bd5",\
      "type": "facility"\
    }\
  ],
  "meta": {
    "page": 1,
    "total": 181,
    "limit": 1
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/facilities-collection\#pagination)    Pagination

By default, this method returns the first 10 elements. To get more details, you should use the [Pagination](https://docs.channex.io/api-v.1-documentation/api-reference#pagination) arguments.
Information about count of entities and current pagination position contained at `meta` section at response object.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/facilities-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Facilities objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/facilities-collection\#property-facility-options)    Property Facility Options

Method to get list of all facility without additional details and pagination limits.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/property_facilities/options
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "id": "4d7cc1cd-d79f-407b-9be4-eb0af95e1bd5",\
        "category": "general",\
        "title": "Baby safety gates"\
      },\
      "id": "4d7cc1cd-d79f-407b-9be4-eb0af95e1bd5",\
      "type": "facility"\
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

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/facilities-collection\#room-type-facilities-list)    Room Type Facilities List

Method to get a list of Room Type Facilities.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/room_facilities
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "id": "4d7cc1cd-d79f-407b-9be4-eb0af95e1bd5",\
        "category": "general",\
        "title": "Baby safety gates"\
      },\
      "id": "4d7cc1cd-d79f-407b-9be4-eb0af95e1bd5",\
      "type": "facility"\
    }\
  ],
  "meta": {
    "page": 1,
    "total": 181,
    "limit": 1
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/facilities-collection\#pagination-1)    Pagination

By default, this method returns the first 10 elements. To get more details, you should use the [Pagination](https://docs.channex.io/api-v.1-documentation/api-reference#pagination) arguments.
Information about count of entities and current pagination position contained at `meta` section at response object.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/facilities-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Facilities objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/facilities-collection\#room-type-facility-options)    Room Type Facility Options

Method to get list of all facility without additional details and pagination limits.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/facilities-collection#tab-success-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/room_facilities/options
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "id": "4d7cc1cd-d79f-407b-9be4-eb0af95e1bd5",\
        "category": "general",\
        "title": "Baby safety gates"\
      },\
      "id": "4d7cc1cd-d79f-407b-9be4-eb0af95e1bd5",\
      "type": "facility"\
    }\
  ]
}
```

[PreviousHotel Policy Collection](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection) [NextTaxes and Tax Sets](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets)

Last updated 4 years ago

Was this helpful?