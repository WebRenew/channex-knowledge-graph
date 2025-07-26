---
url: "https://docs.channex.io/api-v.1-documentation/applications-api"
title: "Applications API | Channex.io"
---

Channex.io provide functionality extensions what is called "Applications".

This Applications provide ability to work with OTA Messages and Reviews, setup integration with Zapier or Make.com, add Payment Application or Stripe Tokenization app.

Please, take a look into our [Applications page](https://app.channex.io/applications) to get full list of available Applications.

Some of applications if free of charge, but some is paid. Please, take a look Application details.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/applications-api\#get-list-of-applications)    Get List of Applications

Retrieve list of available Applications.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET /api/v1/applications
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "data": [\
        {\
            "attributes": {\
                "code": "apaleo",\
                "id": "2fac68cf-9790-496f-b63b-19236510d242",\
                "description": null,\
                "title": "Apaleo",\
                "is_configurable": true,\
                "logo_url": "https://app.channex.io/application_assets/apaleo.png",\
                "price": null,\
                "representation_settings": null,\
                "vr_price": null\
            },\
            "id": "2fac68cf-9790-496f-b63b-19236510d242",\
            "type": "application"\
        },\
        {\
            "attributes": {\
                "code": "booking_crs",\
                "id": "bdcd403b-b62e-46c4-997e-3dced2ae7a37",\
                "description": null,\
                "title": "Booking CRS",\
                "is_configurable": true,\
                "logo_url": null,\
                "price": null,\
                "representation_settings": null,\
                "vr_price": null\
            },\
            "id": "bdcd403b-b62e-46c4-997e-3dced2ae7a37",\
            "type": "application"\
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

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/applications-api\#get-list-of-installed-applications)    Get List of Installed Applications

Retrieve list of installed Applications.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET /api/v1/applications/installed
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "data": [\
        {\
            "attributes": {\
                "id": "12ca008c-95e9-4668-942a-d255b618c00e",\
                "settings": null,\
                "property_id": "c19a05af-8c8c-4754-8c8a-8132845d4cac",\
                "application_id": "8587fbf6-a6d1-46f8-8c12-074273284917",\
                "application_code": "channex_messages"\
            },\
            "id": "12ca008c-95e9-4668-942a-d255b618c00e",\
            "type": "application_installation"\
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

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/applications-api\#install-application)    Install Application

Method to add Application into Property

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/applications/install

{
    "application_installation": {
        "property_id": "18535b75-26a0-4716-ae99-0578006639c5",
        "application_code": "channex_messages"
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
            "id": "7db569e1-3fb3-49a7-884b-690140827c50",
            "settings": {},
            "property_id": "18535b75-26a0-4716-ae99-0578006639c5",
            "is_active": true,
            "application_id": "0dbb54b2-1321-43dd-9fe9-30d54e19ff33",
            "application_code": "channex_messages"
        },
        "id": "7db569e1-3fb3-49a7-884b-690140827c50",
        "type": "application_installation",
        "relationships": {
            "rate_plans": {
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

At one of previous version we suggest to use `application_id` for installation process, but now, we are recommend to use `application_code` what can be safety saved as Constant at your environment.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/applications-api\#application-configuration)    Application configuration

Please, keep in mind, some of application require additional configuration after installation (such us Payment App). Please, contact with our support team to get full API information to configure application.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/applications-api\#uninstall-application)    Uninstall Application

Remove installed application

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/applications-api#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE /api/v1/applications/:application_installation_id/uninstall
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

[PreviousTaxes and Tax Sets](https://docs.channex.io/api-v.1-documentation/taxes-and-tax-sets) [NextMessages Collection](https://docs.channex.io/api-v.1-documentation/messages-collection)

Last updated 23 days ago

Was this helpful?