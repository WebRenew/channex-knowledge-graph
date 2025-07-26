---
url: "https://docs.channex.io/api-v.1-documentation/hotel-policy-collection"
title: "Hotel Policy Collection | Channex.io"
---

**Hotel Policy** is entity to represent general rules applicable at Property.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#hotel-policy-list)    Hotel Policy List

Retrieve list of Hotel Policies associated with user Properties.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/hotel_policies
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "checkin_time": "14:00",\
        "checkout_time": "13:00",\
        "currency": "GBP",\
        "id": "cfe101bf-126c-4031-8d73-27739929329a",\
        "internet_access_cost": null,\
        "internet_access_coverage": "entire_property",\
        "internet_access_type": "wifi",\
        "is_adults_only": false,\
        "max_count_of_guests": 20,\
        "parking_is_private": true,\
        "parking_reservation": "needed",\
        "parking_type": "on_site",\
        "pets_non_refundable_fee": "0.00",\
        "pets_policy": "allowed",\
        "refundable_deposit": "0.00",\
        "smoking_policy": "no_smoking",\
        "title": "Hotel Policy"\
      },\
      "id": "cfe101bf-126c-4031-8d73-27739929329a",\
      "type": "hotel_policy"\
    }\
  ],
  "meta": {
    "limit": 10,
    "page": 1,
    "total": 1
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#pagination)    Pagination

By default, this method return first 10 element. To get more details, you should use [Pagination](https://docs.channex.io/api-v.1-documentation/api-reference#pagination) arguments.
Information about count of entities and current pagination position contained at `meta` section at response object.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Hotel Policy objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#get-hotel-policy-by-id)    Get Hotel Policy by ID

Retrieve specific Hotel Policy by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/hotel_policies/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "checkin_time": "14:00",
      "checkout_time": "13:00",
      "currency": "GBP",
      "id": "cfe101bf-126c-4031-8d73-27739929329a",
      "internet_access_cost": null,
      "internet_access_coverage": "entire_property",
      "internet_access_type": "wifi",
      "is_adults_only": false,
      "max_count_of_guests": 20,
      "parking_is_private": true,
      "parking_reservation": "needed",
      "parking_type": "on_site",
      "pets_non_refundable_fee": "0.00",
      "pets_policy": "allowed",
      "refundable_deposit": "0.00",
      "smoking_policy": "no_smoking",
      "title": "Hotel Policy"
    },
    "id": "cfe101bf-126c-4031-8d73-27739929329a",
    "type": "hotel_policy"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Hotel Policy object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Hotel Policy.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Hotel Policy with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#create-hotel-policy)    Create Hotel Policy

Create new Hotel Policy.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/hotel_policies
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "hotel_policy": {
    "title": "Hotel Policy",
    "currency": "GBP",
    "is_adults_only": false,
    "max_count_of_guests": 20,
    "checkin_time": "14:00",
    "checkout_time": "13:00",
    "internet_access_type": "wifi",
    "internet_access_cost": null,
    "internet_access_coverage": "entire_property",
    "parking_type": "on_site",
    "parking_reservation": "needed",
    "parking_is_private": true,
    "pets_policy": "allowed",
    "pets_non_refundable_fee": "0.00",
    "pets_refundable_deposit": "0.00",
    "smoking_policy": "no_smoking"
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
      "checkin_time": "14:00",
      "checkout_time": "13:00",
      "currency": "GBP",
      "id": "cfe101bf-126c-4031-8d73-27739929329a",
      "internet_access_cost": null,
      "internet_access_coverage": "entire_property",
      "internet_access_type": "wifi",
      "is_adults_only": false,
      "max_count_of_guests": 20,
      "parking_is_private": true,
      "parking_reservation": "needed",
      "parking_type": "on_site",
      "pets_non_refundable_fee": "0.00",
      "pets_policy": "allowed",
      "refundable_deposit": "0.00",
      "smoking_policy": "no_smoking",
      "title": "Hotel Policy"
    },
    "id": "cfe101bf-126c-4031-8d73-27739929329a",
    "type": "hotel_policy"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#fields)    Fields

**title** `[required]`

String with Hotel Policy title.

**currency** `[required]`

3 symbols long string with Currency Alphabetic code based at [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).

**is\_adults\_only** `[optional]`

Boolean value to represent allow Property children or not.

**max\_count\_of\_guests** `[required]`

Any positive number that represent how many guests can stay at Property at same time.

**checkin\_time** `[required]`

Default checkin time in `HH:MM` format.

**checkout\_time** `[required]`

Default checkout time in `HH:MM` format.

**internet\_access\_type** `[required]`

One of predefined values: `none`, `wifi`, `wired`.

**internet\_access\_coverage** `[required]`

One of predefined values: `entire_property`, `public_areas`, `all_rooms`, `some_rooms`, `business_centre`.

**internet\_access\_cost** `[optional]`

Null or position number.
Field represent cost of internet access. If internet access is free, leave this field empty by passing null value.

**parking\_type** `[required]`

One of predefined values: `on_site`, `nearby`, `none`.

**parking\_reservation** `[required]`

One of predefined values: `not_available`, `not_needed`, `needed`.

**parking\_is\_private** `[required]`

Boolean value to represent type of parking.

**pets\_policy** `[required]`

One of predefined values: `allowed`, `not_allowed`, `by_arrangements`, `assistive_only`.

**pets\_non\_refundable\_fee** `[required]`

Positive number.
If your property charge non refundable fee for pets accommodation, provide it amount here.

**pets\_refundable\_deposit** `[required]`

Positive number.
If your property charge refundable deposit for pets accommodation, provide it amount here.

**smoking\_policy** `[required]`

One of predefined values: `no_smoking`, `permitted_areas_only`, `allowed`.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Hotel Policy object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#update-hotel-policy)    Update Hotel Policy

Update Hotel Policy.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/hotel_policies/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "hotel_policy": {
    "title": "Hotel Policy",
    "currency": "GBP",
    "is_adults_only": false,
    "max_count_of_guests": 20,
    "checkin_time": "14:00",
    "checkout_time": "13:00",
    "internet_access_type": "wifi",
    "internet_access_cost": null,
    "internet_access_coverage": "entire_property",
    "parking_type": "on_site",
    "parking_reservation": "needed",
    "parking_is_private": true,
    "pets_policy": "allowed",
    "pets_non_refundable_fee": "0.00",
    "pets_refundable_deposit": "0.00",
    "smoking_policy": "no_smoking"
  }
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "hotel_policy": {
    "title": "Hotel Policy",
    "currency": "GBP",
    "is_adults_only": false,
    "max_count_of_guests": 20,
    "checkin_time": "14:00",
    "checkout_time": "13:00",
    "internet_access_type": "wifi",
    "internet_access_cost_type": "free",
    "internet_access_cost": null,
    "internet_access_coverage": "entire_property",
    "parking_type": "on_site",
    "parking_reservation": "needed",
    "parking_is_private": true,
    "pets_policy": "allowed",
    "pets_non_refundable_fee": "0.00",
    "pets_refundable_deposit": "0.00",
    "smoking_policy": "no_smoking"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#fields-1)    Fields

This method use same fields as Create Hotel Policies method.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Hotel Policy object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Hotel Policy with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#remove-hotel-policy)    Remove Hotel Policy

Remove Hotel Policy.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/hotel_policies/:id
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotel-policy-collection\#returns-4)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Hotel Policy with provided ID is not present at system.

[PreviousPhotos Collection](https://docs.channex.io/api-v.1-documentation/photos-collection) [NextFacilities Collection](https://docs.channex.io/api-v.1-documentation/facilities-collection)

Last updated 4 years ago

Was this helpful?