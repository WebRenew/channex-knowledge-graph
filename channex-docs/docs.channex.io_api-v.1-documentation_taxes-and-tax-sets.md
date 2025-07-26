---
url: "https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets"
title: "Taxes and Tax Sets | Channex.io"
---

To represent Taxes associated with Property and Rate Plans at Channex.io you can use Taxes and Tax Sets.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#taxes)    **Taxes**

Entity which represent specific tax applicable to your Rate Plan or Property. Example: VAT 20%, City Tax 1 EUR per Guest per Night or any other.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#tax-sets)    Tax Sets

Entity which represent group of Taxes applicable to your Rate Plan or Property.

Each property can have many Tax Sets and Taxes, but only one can be selected as Default Tax Set. Default Tax Set will be applied to each new Rate Plan automatically.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#taxes-list)    Taxes List

Retrieve list of Taxes associated with user.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/taxes
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "applicable_after": null,\
        "applicable_before": null,\
        "currency": null,\
        "id": "6d30137e-74a1-41f6-aa96-2c0371e94dbf",\
        "is_inclusive": true,\
        "logic": "percent",\
        "max_nights": null,\
        "rate": "10.00",\
        "skip_nights": null,\
        "title": "10% VAT",\
        "type": "tax"\
      },\
      "relationships": {\
        "property": {\
          "data": {\
            "type": "property",\
            "id": "716305c4-561a-4561-a187-7f5b8aeb5920"\
          }\
        }\
      },\
      "id": "6d30137e-74a1-41f6-aa96-2c0371e94dbf",\
      "type": "tax"\
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Tax objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#get-tax-by-id)    Get Tax by ID

Retrieve specific Tax associated with User by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/taxes/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "applicable_after": null,
      "applicable_before": null,
      "currency": null,
      "id": "6d30137e-74a1-41f6-aa96-2c0371e94dbf",
      "is_inclusive": true,
      "logic": "percent",
      "max_nights": null,
      "rate": "10.00",
      "skip_nights": null,
      "title": "10% VAT",
      "type": "tax"
    },
    "relationships": {
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
        }
      }
    },
    "id": "6d30137e-74a1-41f6-aa96-2c0371e94dbf",
    "type": "tax"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Tax object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Tax.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Tax with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#create-tax)    Create Tax

Create a new Tax.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/taxes
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "tax": {
    "title": "VAT",
    "logic": "percent",
    "type": "tax",
    "rate": "20.00",
    "is_inclusive": true,
    "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "skip_nights": 1,
    "max_nights": 10,
    "applicable_date_ranges": [\
      {\
        "after": "2024-01-01",\
        "before": "2024-12-31"\
    ]
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
      "applicable_date_ranges": [\
        {\
          "after": "2024-01-01",\
          "before": "2024-12-31"\
      ]
      "currency": null,
      "id": "6d30137e-74a1-41f6-aa96-2c0371e94dbf",
      "is_inclusive": true,
      "logic": "percent",
      "max_nights": 10,
      "rate": "20.00",
      "skip_nights": 1,
      "title": "20% VAT",
      "type": "tax"
    },
    "relationships": {
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
        }
      }
    },
    "id": "6d30137e-74a1-41f6-aa96-2c0371e94dbf",
    "type": "tax"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#fields)    Fields

**title** `[required]`

Any non-empty string with maximum length of 255 symbols.
Note: The Group will be represented in the system under that title.

**logic** `[required]`

One of possible values: `percent` , `per_room`, `per_room_per_night`, `per_person`, `per_person_per_night`, `per_night`, `per_booking`

**type** `[required]`

One of possible values: `tax`, `fee`, `city tax`.

**rate** `[required]`

String value with amount applicable to tax. If `logic` is `percent`, can be between 0 and 100 only. At other cases, represent fixed amount of tax.

**currency** `[required]` **\***

Required only of `logic` is not `percent`. Should a valid currency code. Represent Tax amount currency.

**is\_inclusive** `[required]`

Boolean value. Represent include tax into room price or should be added atop.

**property\_id** `[required]`

UUID. Relation to associated Property.

**skip\_nights** `[optional]`

Positive Integer value. Represent count of days what should be skipped at tax calculation. Useful for long-stay taxes, which should be applied from 8 day of stay.

**max\_nights** `[optional]`

Positive Integer value. Represent max count of days what should be used as a taxable base for this Tax. Useful for long-stay or short-stay taxes when tax should be applied only for first 7 days of stay.

**applicable\_date\_ranges** `[optional]`

List of applicable date ranges, represented as an object:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "after": "2024-01-01",
  "before": "2024-12-31"
}
```

Where `after` and `before` is a valid date at ISO format.

This ranges define a ranges of dates when this tax should be applied. Useful to define periodical City Tax or Touristic Tax which is applicable for High Season. Example: Touristic Tax should be collected from 1 June to 31 August. At other dates this Tax is not applied.

You can define up to 20 date ranges.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-2)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Tax object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#update-tax)    Update Tax

Update a Tax.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/taxes/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "tax": {
    "title": "New Tax Title"
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
      "applicable_after": null,
      "applicable_before": null,
      "currency": null,
      "id": "6d30137e-74a1-41f6-aa96-2c0371e94dbf",
      "is_inclusive": true,
      "logic": "percent",
      "max_nights": null,
      "rate": "20.00",
      "skip_nights": null,
      "title": "New Tax Title",
      "type": "tax"
    },
    "relationships": {
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
        }
      }
    },
    "id": "6d30137e-74a1-41f6-aa96-2c0371e94dbf",
    "type": "tax"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Tax object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Tax with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#remove-tax)    Remove Tax

Remove a Tax.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/taxes/:id
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-4)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Tax with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#tax-sets-list)    Tax Sets List

Retrieve list of Tax Sets associated with user.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-5)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-5)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-5)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/tax_sets
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "currency": "USD",\
        "id": "b70b756d-0b81-431d-a35c-f3dee28a00a7",\
        "taxes": [\
          {\
            "applicable_after": null,\
            "applicable_before": null,\
            "currency": null,\
            "id": "c1fb94b3-ce95-4233-be0e-2748b3728715",\
            "is_inclusive": true,\
            "logic": "percent",\
            "max_nights": null,\
            "rate": "10.00",\
            "skip_nights": null,\
            "taxes": [],\
            "title": "10% IVA",\
            "type": "tax"\
          },\
          {\
            "applicable_after": null,\
            "applicable_before": null,\
            "currency": null,\
            "id": "a3c4f3c8-841c-4492-b5ff-ce9ca92c1c83",\
            "is_inclusive": false,\
            "logic": "percent",\
            "max_nights": null,\
            "rate": "3.00",\
            "skip_nights": null,\
            "taxes": [],\
            "title": "3% TBID",\
            "type": "tax"\
          }\
        ],\
        "title": "Tax Set Title"\
      },\
      "relationships": {\
        "property": {\
          "data": {\
            "type": "property",\
            "id": "716305c4-561a-4561-a187-7f5b8aeb5920"\
          }\
        }\
      },\
      "id": "b70b756d-0b81-431d-a35c-f3dee28a00a7",\
      "type": "tax_set"\
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-5)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Tax Set objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#get-tax-set-by-id)    Get Tax Set by ID

Retrieve specific Tax Set associated with User by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-6)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-6)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-6)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/tax_sets/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "currency": "USD",
      "id": "b70b756d-0b81-431d-a35c-f3dee28a00a7",
      "associated_rate_plan_ids": ["77229f71-8c8f-4d79-92ed-749002407267"],
      "taxes": [\
        {\
          "applicable_after": null,\
          "applicable_before": null,\
          "currency": null,\
          "id": "c1fb94b3-ce95-4233-be0e-2748b3728715",\
          "is_inclusive": true,\
          "logic": "percent",\
          "max_nights": null,\
          "rate": "10.00",\
          "skip_nights": null,\
          "taxes": [],\
          "title": "10% IVA",\
          "type": "tax",\
          "level": 0\
        },\
        {\
          "applicable_after": null,\
          "applicable_before": null,\
          "currency": null,\
          "id": "a3c4f3c8-841c-4492-b5ff-ce9ca92c1c83",\
          "is_inclusive": false,\
          "logic": "percent",\
          "max_nights": null,\
          "rate": "3.00",\
          "skip_nights": null,\
          "taxes": [],\
          "title": "3% TBID",\
          "type": "tax"\
          "level": 0\
        }\
      ],
      "title": "Tax Set Title"
    },
    "relationships": {
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
        }
      }
    },
    "id": "b70b756d-0b81-431d-a35c-f3dee28a00a7",
    "type": "tax_set"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-6)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Tax Set object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Tax Set.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Tax Set with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#create-tax-set)    Create Tax Set

Create a new Tax Set.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-7)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-7)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-7)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/tax_sets
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "tax_set": {
    "title": "Tax Set Title",
    "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "associated_rate_plan_ids": ["77229f71-8c8f-4d79-92ed-749002407267"],
    "taxes": [\
      {\
        "id": "c1fb94b3-ce95-4233-be0e-2748b3728715",\
        "level": 0\
      },\
      {\
        "id": "a3c4f3c8-841c-4492-b5ff-ce9ca92c1c83",\
        "level": 0\
      }\
    ],
    "currency": "USD"
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
      "currency": "USD",
      "id": "b70b756d-0b81-431d-a35c-f3dee28a00a7",
      "associated_rate_plan_ids": ["77229f71-8c8f-4d79-92ed-749002407267"],
      "taxes": [\
        {\
          "applicable_after": null,\
          "applicable_before": null,\
          "currency": null,\
          "id": "c1fb94b3-ce95-4233-be0e-2748b3728715",\
          "is_inclusive": true,\
          "logic": "percent",\
          "max_nights": null,\
          "rate": "10.00",\
          "skip_nights": null,\
          "taxes": [],\
          "title": "10% IVA",\
          "type": "tax",\
          "level": 0\
        },\
        {\
          "applicable_after": null,\
          "applicable_before": null,\
          "currency": null,\
          "id": "a3c4f3c8-841c-4492-b5ff-ce9ca92c1c83",\
          "is_inclusive": false,\
          "logic": "percent",\
          "max_nights": null,\
          "rate": "3.00",\
          "skip_nights": null,\
          "taxes": [],\
          "title": "3% TBID",\
          "type": "tax",\
          "level": 0\
        }\
      ],
      "title": "Tax Set Title"
    },
    "relationships": {
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
        }
      }
    },
    "id": "b70b756d-0b81-431d-a35c-f3dee28a00a7",
    "type": "tax_set"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#fields-1)    Fields

**title** `[required]`

Any non-empty string with maximum length of 255 symbols.
Note: The Tax Set will be represented in the system under that title.

**property\_id** `[required]`

UUID of Property which is associated with Tax Set.
Note: If it is first `Tax Set` for `Property`, it will be automatically installed as `default_tax_set` for this property.

**currency** `[required]` **\***

String. Should a valid currency code. Represent Tax Set currency.

**taxes** `[required]`

List of object with associated taxes IDs. Can contain another taxes inside.

Taxes in the request should look like:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "id": "c1fb94b3-ce95-4233-be0e-2748b3728715" // TAX UUID
}
```

However, if one tax needs to be calculated **after** another, you can use the `level` field to define the calculation order:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "id": "c1fb94b3-ce95-4233-be0e-2748b3728715", // TAX UUID
  "level": 0
}
```

**Example:**
Assume you have a **Cleaning Fee** of $10.00 per night and **VAT** of 20%. VAT should be calculated **on top of** the Cleaning Fee.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
Night Price:      100.00 USD
Cleaning Fee:     10.00 USD
VAT (20%):        20% of 100.00 + 20% of 10.00 = 22.00 USD
```

To achieve this, you define the order using the `level` field.
In this example, you'll use two levels: `level 1` for the Cleaning Fee and `level 0` for VAT.

Our calculation logic processes taxes from the **deepest level (highest number)** to the **top level (lowest number)**.
So we first calculate **level 1**, then calculate **level 0** based on:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
Night Price + all amounts from level 1
```

**Final request example:**

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
[\
    {\
        "id": "c1fb94b3-ce95-4233-be0e-2748b3728715", // Cleaning Fee\
        "level": 1\
    },\
    {\
        "id": "a3c4f3c8-841c-4492-b5ff-ce9ca92c1c83", // VAT 20%\
        "level": 0\
    }\
]
```

**associated\_rate\_plan\_ids** `[optional]`

List of Strings which represent Rate Plan UUID which should be associated with created / updated Tax Set.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-7)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Tax Set object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#update-tax-set)    Update Tax Set

Update a Tax Set.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-8)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-8)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-8)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/tax_set/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "tax": {
    "title": "New Tax Set Title",
    "associated_rate_plan_ids": ["77229f71-8c8f-4d79-92ed-749002407267"]
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
      "currency": "USD",
      "id": "b70b756d-0b81-431d-a35c-f3dee28a00a7",
      "associated_rate_plan_ids": ["77229f71-8c8f-4d79-92ed-749002407267"],
      "taxes": [\
        {\
          "applicable_after": null,\
          "applicable_before": null,\
          "currency": null,\
          "id": "c1fb94b3-ce95-4233-be0e-2748b3728715",\
          "is_inclusive": true,\
          "logic": "percent",\
          "max_nights": null,\
          "rate": "10.00",\
          "skip_nights": null,\
          "taxes": [],\
          "title": "10% IVA",\
          "type": "tax",\
          "level": 0\
        },\
        {\
          "applicable_after": null,\
          "applicable_before": null,\
          "currency": null,\
          "id": "a3c4f3c8-841c-4492-b5ff-ce9ca92c1c83",\
          "is_inclusive": false,\
          "logic": "percent",\
          "max_nights": null,\
          "rate": "3.00",\
          "skip_nights": null,\
          "taxes": [],\
          "title": "3% TBID",\
          "type": "tax",\
          "level": 0\
        }\
      ],
      "title": "New Tax Set Title"
    },
    "relationships": {
      "property": {
        "data": {
          "type": "property",
          "id": "716305c4-561a-4561-a187-7f5b8aeb5920"
        }
      }
    },
    "id": "b70b756d-0b81-431d-a35c-f3dee28a00a7",
    "type": "tax_set"
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-8)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Tax Set object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Tax Set with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#remove-tax-set)    Remove Tax Set

Remove a Tax Set.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-request-9)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-success-response-9)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets#tab-error-response-9)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/tax_sets/:id
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets\#returns-9)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Tax Set with provided ID is not present at system.

[PreviousFacilities Collection](https://docs.channex.io/api-v.1-documentation/facilities-collection) [NextApplications API](https://docs.channex.io/api-v.1-documentation/applications-api)

Last updated 10 days ago

Was this helpful?