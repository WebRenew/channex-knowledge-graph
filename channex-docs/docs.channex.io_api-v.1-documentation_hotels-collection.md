---
url: "https://docs.channex.io/api-v.1-documentation/hotels-collection"
title: "Properties Collection | Channex.io"
---

**Property** is a physical premises – hotels, motels, lodges, cabins, chalets, luxury apartments and other types of buildings. Usually each property has a unique address.

Don't combine multiple properties into one, it's better they are all created separately with their own address and details

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#properties-list)    Properties List

Retrieve list of properties associated with user.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/properties
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "type": "property",\
      "id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
      "attributes": {\
        "id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
        "title": "Demo Hotel",\
        "is_active": true,\
        "email": "hotel@channex.io",\
        "phone": "01267237037",\
        "currency": "GBP",\
        "country": "GB",\
        "state": "Demo State",\
        "city": "Demo Town",\
        "address": "Demo Street",\
        "zip_code": "SA23 2JH",\
        "latitude": null,\
        "longitude": null,\
        "timezone": "Europe/London",\
        "property_type": "hotel",\
        "content": {\
          "description": "Some Property Description Text",\
          "photos": [{\
            "author": "Author Name",\
            "description": "Room View",\
            "id": "4355439c-df23-4f12-bffd-26476e31dd4a",\
            "kind": "photo",\
            "position": 0,\
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
            "room_type_id": null,\
            "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
          }],\
          "important_information": null\
        },\
        "logo_url": null,\
        "acc_channels_count": 0\
      },\
      "relationships": {\
        "groups": {\
          "data": [\
            {\
              "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
              "type": "group",\
              "attributes": {\
                "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
                "title": "User Group"\
              }\
            }\
          ]\
        },\
        "facilities": {\
            "data": []\
        }\
      }\
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#pagination-and-filters)    Pagination and Filters

By default, this method return first 10 element. To get more details, you should use Pagination arguments.
Information about count of entities and current pagination position contained at `meta` section at response object.

This endpoint accept filters for fields: `id`, `title`, `is_active`.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Property objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#property-options)    Property Options

Method to get list of all properties associated with current account without additional details and pagination limits.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/properties/options
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
        "title": "Demo Hotel",\
        "currency": "GBP"\
      },\
      "id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
      "type": "properties"\
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

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#create-property)    Create Property

Create a new Property.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/properties
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "property": {
    "title": "Demo Hotel",
    "currency": "GBP",
    "email": "hotel@channex.io",
    "phone": "01267237037",
    "zip_code": "SA23 2JH",
    "country": "GB",
    "state": "Demo State",
    "city": "Demo Town",
    "address": "Demo Street",
    "longitude": "-0.2416781",
    "latitude": "51.5285582",
    "timezone": "Europe/London",
    "facilities": [],
    "property_type": "hotel",
    "group_id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",
    "settings": {
      "allow_availability_autoupdate_on_confirmation": true,
      "allow_availability_autoupdate_on_modification": false,
      "allow_availability_autoupdate_on_cancellation": false,
      "min_stay_type": "both",
      "min_price": null,
      "max_price": null,
      "state_length": 500,
      "cut_off_time": "00:00:00",
      "cut_off_days": 0,
      "max_day_advance": null
    }
    "content": {
      "description": "Some Property Description Text",
      "photos": [{\
        "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/",\
        "position": 0,\
        "author": "Author Name",\
        "kind": "photo",\
        "description": "Room View"\
      }],
      "important_information": "Some important notes about property"
    },
    "logo_url": "https://hotel.domain/logo.png",
    "website": "https://some-hotel-website.com"
  }
}
```

**Success Response Example**

Status Code: `201 Created`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "property",
    "id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "attributes": {
      "id": "716305c4-561a-4561-a187-7f5b8aeb5920",
      "title": "Demo Hotel",
      "is_active": true,
      "email": "hotel@channex.io",
      "phone": "01267237037",
      "currency": "GBP",
      "country": "GB",
      "state": "Demo State",
      "city": "Demo Town",
      "address": "Demo Street",
      "zip_code": "SA23 2JH",
      "longitude": "-0.2416781",
      "latitude": "51.5285582",
      "timezone": "Europe/London",
      "property_type": "hotel",
      "content": {
        "description": "Some Property Description Text",
        "photos": [{\
          "author": "Author Name",\
          "description": "Room View",\
          "id": "4355439c-df23-4f12-bffd-26476e31dd4a",\
          "kind": "photo",\
          "position": 0,\
          "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
          "room_type_id": null,\
          "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
        }],
        "important_information": null
      },
      "logo_url": null,
      "acc_channels_count": 0,
      "settings": {
        "allow_availability_autoupdate_on_confirmation": true,
        "allow_availability_autoupdate_on_modification": true,
        "allow_availability_autoupdate_on_cancellation": true,
        "min_stay_type": "both",
        "max_price": null,
        "min_price": null,
        "state_length": 500,
        "cut_off_time": "00:00:00",
        "cut_off_days": 0,
        "max_day_advance": null
      }
    },
    "relationships": {
      "groups": {
        "data": [\
          {\
            "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
            "type": "group",\
            "attributes": {\
              "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
              "title": "User Group"\
            }\
          }\
        ]
      },
      "facilities": {
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#fields)    Fields

**title** `[required]`

Any non-empty string with maximum length of 255 symbols.
Note: The property will be represented in the system under that title.

**currency** `[required]`

3 symbols long string with Currency Alphabetic code based at [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
Note: This currency will be used as default currency for nested Property entities and provided as default property currency to 3rd party services.

**email** `[optional]`

String with a valid email address.
Note: This email address will be provided to 3rd party services as contact email address for that property.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**phone** `[optional]`

String with maximum length of 32 symbols. Can contain digits, spaces, brackets and special characters.
Note: This phone will be provided to 3rd party services as contact email address for that property.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**zip\_code** `[optional]`

String with maximum length of 32 symbols.
Note: This zip\_code will be provided to 3rd party services as part of contact address for that property.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**country** `[optional]`

2 symbols long string with Country Alpha-2 code based at [ISO-3166-1](https://www.iso.org/iso-3166-country-codes.html).
Note: This country will be provided to 3rd party services as part of contact address for that property.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**state** `[optional]`

String with maximum length of 255 symbols.
Note: This state will be provided to 3rd party services as part of contact address for that property.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**city** `[optional]`

String with maximum length of 255 symbols.
Note: This city will be provided to 3rd party services as part of contact address for that property.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**address** `[optional]`

String with maximum length of 255 symbols.
Note: This address will be provided to 3rd party services as part of contact address for that property.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**longitude** `[optional]`

Decimal number represented as String with maximum length of 10 symbols. Can have maximum 7 decimal chars.
Minimum value: -180.
Maximum value: +180.
Note: This field is part of property coordinates.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**latitude** `[optional]`

Decimal number represented as String with maximum length of 9 symbols. Can have maximum 7 decimal chars.
Minimum value: -90.
Maximum value: +90.
Note: This field is part of property coordinates.
Field is optional at initial setup step, but required when you try connect first 3rd party service.

**timezone** `[optional]`

Timezone name from ISO 8601. All possible values you can find at Time zone database ( [https://www.iana.org/time-zones](https://www.iana.org/time-zones)). More info about Time Zone database is here - [https://en.wikipedia.org/wiki/Tz\_database](https://en.wikipedia.org/wiki/Tz_database).

**facilities** `[optional]`

List of [Property Facility](https://docs.channex.io/api-v.1-documentation/facilities-collection#property-facilities-list) IDs associated with Property.

**property\_type** `[optional]`

Recommended you set this value since it affects billing. Set to "hotel" for hotels or "apartment" for vacation rentals.

One of possible values:

- apart\_hotel

- apartment

- boat

- camping

- capsule\_hotel

- chalet

- country\_house

- farm\_stay

- guest\_house

- holiday\_home

- holiday\_park

- homestay

- hostel

- hotel

- inn

- lodge

- motel

- resort

- riad

- ryokan

- tent

- villa


**group\_id** `[optional]`

String with valid UUID for Group object what you would like to use as Base Group for created Property.
Field is optional, if it is not provided, system automatically assign Default User Group as Base Group for Property.

**settings** `[optional]`

Object with Property settings. Should contain next fields:

`allow_availability_autoupdate` \- option to allow increase and decrease Availability when bookings is came into Channex. **\[deprecated\]**

`allow_availability_autoupdate_on_confirmation` \- option to allow decrease Availability when new bookings is came into Channex. Recommended Setting is true

`allow_availability_autoupdate_on_modification` \- option to allow increase and decrease Availability when booking modification is came into Channex. Recommended Setting is false

`allow_availability_autoupdate_on_cancellation` \- option to allow decrease Availability when booking cancellation is came into Channex. Recommended Setting is false

`min_stay_type` \- option to control simplified Min Stay restrictions. Can be useful for situation when your system support only one of Min Stay Types (Arrival or Through).
If your system work only with Min Stay Arrival or only with Min Stay Through you can setup that setting into `arrival` or `through` mode, as result we will simplify ARI updates and allow provide min stay changes under `min_stay` key and automatically setup correct selection for Min Stay type at Channel mappings. Possible values: `both`, `arrival`, `through`.

`min_price` \- setup minimum price per property. When user try to setup price less than min\_price, system increase it up to minimum. Can be represented as a String with fraction part ("100.00") or as an Integer in lowest currency item (cents for USD as example, 10000 for 100.00 USD).

`max_price` \- setup maximum price per property. When user try to setup price greater than max\_price, system decrease it up to maximum. Can be represented as a String with fraction part ("100.00") or as an Integer in lowest currency item (cents for USD as example, 10000 for 100.00 USD).

`state_length` \- setup length of inventory table for Property. Min value is 100 days, max value is 730 days.

`cut_off_time` \- setup cut off time for current property. Allow time value with 30 minutes steps.
At specific time, we automatically launch task and close inventory for today + `cut_off_days` or for current date.

`cut_off_days` \- integer value for count of days which should be closed by CutOffDays.

`max_day_advance` \- integer value or \`null\`. Represent max count of days opened for sale. If you set value to 30, we will automatically set Availability to 0 for all dates after 30 days from current moment.
Be careful with this setting, when you apply max\_day\_advance, we override existed Availability values to 0 and can't restore it without Full Sync.

**content** `[optional]`

Object with content information for property. Content object can contain:
`description` \- optional text field with Property description. By default Description will be equal to `null`.
`important_information` \- optional text field with some important information about Property. Will be included into Booking confirmation emails.
`photos` \- optional list of photos associated with Property. Each photo is object with next fields:
`url` \- photo URL
`position` \- integer value to represent photo position at list, Photo with position equal to 0 is used as Cover Photo for property
`description` \- Photo text description
`author` \- Name of photo Author
`kind` \- one of three possible values: photo, ad (advertising), menu (restaurant menu photo).
More information about Photo API is [here](https://docs.channex.io/api-v.1-documentation/photos-collection).

**logo\_url** `[optional]`

String. Valid URL to property logo. Logo will be copied into our media storage.

**website** `[optional]`

String. Valid URL to property website.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#read-only-fields)    Read only fields

`acc_cannels_count`

Integer. Count of connected channels. Aggregate.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Property object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#get-property-by-id)    Get Property by ID

Retrieve specific property associated with User by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/properties/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "property",
    "id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "attributes": {
      "id": "716305c4-561a-4561-a187-7f5b8aeb5920",
      "title": "Demo Hotel",
      "is_active": true,
      "email": "hotel@channex.io",
      "phone": "01267237037",
      "currency": "GBP",
      "country": "GB",
      "state": "Demo State",
      "city": "Demo Town",
      "address": "Demo Street",
      "zip_code": "SA23 2JH",
      "latitude": null,
      "longitude": null,
      "timezone": "Europe/London",
      "property_type": "hotel",
      "content": {
        "description": "Some Property Description Text",
        "photos": [{\
          "author": "Author Name",\
          "description": "Room View",\
          "id": "4355439c-df23-4f12-bffd-26476e31dd4a",\
          "kind": "photo",\
          "position": 0,\
          "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
          "room_type_id": null,\
          "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
        }],
        "important_information": null
      },
      "settings": {
        "allow_availability_autoupdate_on_confirmation": true,
        "allow_availability_autoupdate_on_modification": true,
        "allow_availability_autoupdate_on_cancellation": true,
        "min_stay_type": "both",
        "max_price": null,
        "min_price": null,
        "max_day_advance": null
      },
      "logo_url": null,
      "acc_channels_count": 0
    },
    "relationships": {
      "groups": {
        "data": [\
          {\
            "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
            "type": "group",\
            "attributes": {\
              "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
              "title": "User Group"\
            }\
          }\
        ]
      },
      "facilities": {
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Property object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Property.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#update-property)    Update Property

Update property information.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/properties/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "property": {
    "title": "Demo Hotel",
    "currency": "GBP",
    "email": "hotel@channex.io",
    "phone": "01267237037",
    "zip_code": "SA23 2JH",
    "country": "GB",
    "state": "Demo State",
    "city": "Demo Town",
    "address": "Demo Street"
    "longitude": "-0.2416781",
    "latitude": "51.5285582",
    "timezone": "Europe/London",
    "facilities": [],
    "property_type": "hotel",
    "content": {
      "description": "Some Property Description Text",
      "photos": [{\
        "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/",\
        "position": 0,\
        "author": "Author Name",\
        "kind": "photo",\
        "description": "Room View"\
      }]
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
    "type": "property",
    "id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "attributes": {
      "id": "716305c4-561a-4561-a187-7f5b8aeb5920",
      "title": "Demo Hotel",
      "is_active": true,
      "email": "hotel@channex.io",
      "phone": "01267237037",
      "currency": "GBP",
      "country": "GB",
      "state": "Demo State",
      "city": "Demo Town",
      "address": "Demo Street",
      "zip_code": "SA23 2JH",
      "latitude": null,
      "longitude": null,
      "timezone": "Europe/London",
      "property_type": "hotel",
      "content": {
        "description": "Some Property Description Text",
        "photos": [{\
          "author": "Author Name",\
          "description": "Room View",\
          "id": "4355439c-df23-4f12-bffd-26476e31dd4a",\
          "kind": "photo",\
          "position": 0,\
          "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",\
          "room_type_id": null,\
          "url": "https://img.channex.io/af08bc1d-8074-476c-bdb7-cec931edaf6a/"\
        }],
        "important_information": null
      },
      "settings": {
        "allow_availability_autoupdate_on_confirmation": true,
        "allow_availability_autoupdate_on_modification": true,
        "allow_availability_autoupdate_on_cancellation": true,
        "min_stay_type": "both",
        "max_price": null,
        "min_price": null,
        "state_length": 500,
        "max_day_advance": null
      },
      "logo_url": null,
      "acc_channels_count": 0
    },
    "relationships": {
      "groups": {
        "data": [\
          {\
            "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
            "type": "group",\
            "attributes": {\
              "id": "f5338935-7fe0-40eb-9d7e-4dbf7ecc52c7",\
              "title": "User Group"\
            }\
          }\
        ]
      },
      "facilities": {
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#fields-1)    Fields

This method uses the same fields as [Create Property](https://channex.gitbook.io/api/api-v.1-documentation/hotels-collection#create-property) method.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Property object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong Bearer Token provided or User not have access to requested Property.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/hotels-collection\#remove-property)    Remove Property

Remove a Property.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-request-5)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-success-response-5)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/hotels-collection#tab-error-response-5)

Request:

`DELETE /api/v1/properties/:id`

**Success Response Example**

Status Code: `200 OK`

Copy

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

**Validation Error**

Status Code: `422 Unprocessable Entity`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "errors": {
        "code": "validation_error",
        "title": "Validation Error",
        "details": {
            "property": [\
                "has channel(s)"\
            ]
        }
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

Please, be careful, Remove Property operation can't be reverted. Property will be removed from the system and you can't restore it, you will need to create it again from scratch.

Please, keep in mind, to prevent accidents we are block ability to remove Property if it have at least 1 Channel. In case if you understand what are you doing, you can remove Property with `force` flag option to remove Property even if it have associated channels.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE /api/v1/properties/:id?force=true
```

[PreviousProperty Size Limits](https://docs.channex.io/api-v.1-documentation/property-size-limits) [NextProperty Users Collection](https://docs.channex.io/api-v.1-documentation/property-users-collection)

Last updated 2 months ago

Was this helpful?