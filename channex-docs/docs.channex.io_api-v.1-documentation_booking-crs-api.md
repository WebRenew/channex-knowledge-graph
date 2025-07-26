---
url: "https://docs.channex.io/api-v.1-documentation/booking-crs-api"
title: "Booking CRS API | Channex.io"
---

This feature is still in Beta and you should be careful to modify OTA bookings with any changes.

API is Experimental and can be changed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/booking-crs-api\#intro)    Intro

Booking CRS is an API and UI which allows the user to create, modify and cancel bookings at Channex.io.

This API is designed to cover few use cases such us:

- keep information about Booking up to date if some changes is applied to Booking at PMS side

- push information about Bookings created via Offline sources to be able process it over regular pipeline


By using those API you are able to:

- create a new Bookings

- modify existing Bookings (even if it came over OTA)

- cancel existing Bookings (even if it came over OTA)

- enrich existing Bookings by custom meta-information to exchange it with integrated partners such us Smart Lock service, Housekeeping Apps and etc.


Custom Information

Booking CRS API allow you to put custom information through `meta` field at next objects:

- `booking`

- `customer`

- `room`


You are able to put any information inside this fields in format what is suitable for your use-case.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/booking-crs-api\#overrides-logic)    Overrides Logic

The Booking CRS API allows you to update bookings that originate from OTAs (Online Travel Agencies). This feature helps keep bookings up to date when modifications are made on the property side. However, it's essential to understand the logic behind this functionality.

Channex operates using Booking Revisions, which act as snapshots of a booking at a given time. Each time an OTA provides an update, a new revision is created, and the existing booking is updated. These snapshots do not inherit data from previous revisions.

However, when you start using the Booking CRS API to modify OTA bookings, the system shifts to a **diff-based logic** for those bookings.

Each time we receive a new revision from an OTA and the affected booking has any revisions from the CRS API, we update the incoming data by calculating the difference between the **previous OTA revision** and the **current revision**.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/booking-crs-api\#example)    Example

1. An OTA sends a booking for **August 25, 2025**, for a **Double Room**, under the name **John Doe**.

2. The **PMS (Property Management System)** moves the booking from a **Double Room** to a **Single Room** and updates the customer name to **Hanna Doe**.

3. The OTA later sends a modification where the customer changes their name to **Alice Cooper**, but the date remains **August 25, 2025**, and the room type remains **Double Room**.


**How the system processes this:**

- When we receive the OTA modification, we compare it with the original booking and calculate the differences.

- In this case, the only change from the OTA is the **customer name**.

- As a result, we take the **latest CRS revision** (which has the Single Room) and apply the new customer name from the OTA update.


**Final outcome:** The booking will be for **August 25, 2025**, in a **Single Room**, under the name **Alice Cooper**.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/booking-crs-api\#edge-cases)    Edge Cases

1. **OTA Overrides Your Changes**



- If you change the room type from **Double** to **Single** via CRS and then receive an OTA modification that sets the room type to **Triple**, the final booking will reflect the **Triple Room** as per the OTA update.


2. **Date Changes from OTA**



- If the guest modifies their booking dates via the OTA (e.g., changes the arrival date or extends their stay), the system will reset the selected room type to the **original room type** from the latest OTA revision.


## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/booking-crs-api\#faq)    FAQ

**What happens after you make any edits to a booking?**

We will create a modification and the booking will be sent to the PMS as usual

**What happens if the OTA will send a modification after you have modified it?**

We will check the last OTA booking vs the new version and only save the changes, it will not revert your changes that you made. More details below

**Why use this feature?**

If you would like Channex to have the same booking data as your PMS, it will be possible to connect applications in the future that need to read and edit bookings. Example: check-in apps. door locks, Revenue Management, Upselling etc.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/booking-crs-api\#api-methods)    API Methods

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/booking-crs-api\#create-booking)    Create Booking

Property should have Booking CRS App installed to have access for Booking CRS API

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/booking-crs-api#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/booking-crs-api#tab-success-response)

`POST /api/v1/bookings`

Payload:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "booking": {
    "property_id": "60c85c87-4119-4129-ba33-f63a5d617479",
    "ota_reservation_code": "113",
    "ota_name": "Offline",
    "arrival_date": "2025-10-10",
    "departure_date": "2025-10-11",
    "arrival_hour": "18:00",
    "services": [\
      {\
        "is_inclusive": true,\
        "name": "Cancellation Fee",\
        "nights": 0,\
        "persons": 0,\
        "price_mode": "Per stay",\
        "price_per_unit": "6.75",\
        "total_price": "6.75",\
        "type": "Cancellation Fee"\
      }\
    ],
    "deposits": [\
      {\
        "amount": "100.00",\
        "currency": "GBP",\
        "charget_at": "2019-05-05T19:20:32.001023",\
        "type": "credit_card",\
        "notes": "Card ending 1234",\
        "meta": {}\
      }\
    ],
    "payment_collect": "ota",
    "payment_type": "bank_transfer",
    "currency": "GBP",
    "ota_commission": "2.00",
    "notes": "guest notes",
    "meta": null,
    "customer": {
      "name": "John",
      "zip": "ZIP123456",
      "address": "Sonner str. 38",
      "mail": "john@doe.com",
      "country": "GB",
      "city": "London",
      "phone": "+44 123 123456",
      "surname": "Doe"
    },
    "rooms": [\
      {\
        "room_type_id": "6db77022-a078-49be-9270-cdb01d731730",\
        "rate_plan_id": "6b27f60c-e0ef-4600-aeb5-3fcb6ff2a54e",\
        "days": {\
          "2025-10-10": "100.00"\
        },\
        "services": [],\
        "taxes": [\
          {\
            "is_inclusive": true,\
            "name": "VAT (20%)",\
            "nights": 1,\
            "persons": 2,\
            "price_mode": "Per booking",\
            "price_per_unit": "13.33",\
            "total_price": "13.33",\
            "type": "Value Added Tax (VAT)",\
            "version": null\
          }\
        ],\
        "guests": [\
          {\
            "name": "John",\
            "surname": "Doe"\
          }\
        ],\
        "occupancy": {\
          "adults": 1,\
          "children": 0,\
          "infants": 0,\
          "ages": []\
        }\
      }\
    ]
  }
}
```

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "data": {
        "attributes": {
            "id": "38add208-1bc5-4be4-9063-8968ad489681",
            "status": "new",
            "booking_id": "38add208-1bc5-4be4-9063-8968ad489681",
            "unique_id": "OFL-113",
            "revision_id": "c1e2198a-92e6-4c27-b964-f63c60d3243a"
        },
        "id": "38add208-1bc5-4be4-9063-8968ad489681",
        "type": "booking"
    }
}
```

To get more information about fields, please take a look into our [Public Booking API](https://docs.channex.io/api-v.1-documentation/bookings-collection).

Operation to create Booking and save it inside database is asynchronous, as result, if you trigger request immediately after receiving response you can get 404 Error.

Create Booking operation working based at regular logic and will trigger all associated web-hooks and availability changes (depending to Property settings).

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/booking-crs-api\#update-booking)    Update Booking

Property should have Booking CRS App installed to have access for Booking CRS API.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/booking-crs-api#tab-request-1)

Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/booking-crs-api#tab-response)

`PUT /api/v1/bookings/:booking_id`

Payload:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "booking": {
    "status": "modified",
    "property_id": "60c85c87-4119-4129-ba33-f63a5d617479",
    "ota_reservation_code": "113",
    "ota_name": "Offline",
    "arrival_date": "2025-10-10",
    "departure_date": "2025-10-11",
    "arrival_hour": "18:00",
    "services": [\
      {\
        "is_inclusive": true,\
        "name": "Cancellation Fee",\
        "nights": 0,\
        "persons": 0,\
        "price_mode": "Per stay",\
        "price_per_unit": "6.75",\
        "total_price": "6.75",\
        "type": "Cancellation Fee"\
      }\
    ],
    "deposits": [\
      {\
        "amount": "100.00",\
        "currency": "GBP",\
        "charget_at": "2019-05-05T19:20:32.001023",\
        "type": "credit_card",\
        "notes": "Card ending 1234",\
        "meta": {}\
      }\
    ],
    "payment_collect": "ota",
    "payment_type": "bank_transfer",
    "currency": "GBP",
    "ota_commission": "2.00",
    "notes": "guest notes",
    "meta": null,
    "customer": {
      "name": "John",
      "zip": "ZIP123456",
      "address": "Sonner str. 38",
      "mail": "john@doe.com",
      "country": "GB",
      "city": "London",
      "phone": "+44 123 123456",
      "surname": "Doe"
    },
    "rooms": [\
      {\
        "room_type_id": "6db77022-a078-49be-9270-cdb01d731730",\
        "rate_plan_id": "6b27f60c-e0ef-4600-aeb5-3fcb6ff2a54e",\
        "days": {\
          "2025-10-10": "100.00"\
        },\
        "services": [],\
        "taxes": [\
          {\
            "is_inclusive": true,\
            "name": "VAT (20%)",\
            "nights": 1,\
            "persons": 2,\
            "price_mode": "Per booking",\
            "price_per_unit": "13.33",\
            "total_price": "13.33",\
            "type": "Value Added Tax (VAT)",\
            "version": null\
          }\
        ],\
        "guests": [\
          {\
            "name": "John",\
            "surname": "Doe"\
          }\
        ],\
        "occupancy": {\
          "adults": 1,\
          "children": 0,\
          "infants": 0,\
          "ages": []\
        }\
      }\
    ]
  }
}
```

**Success Response**

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "data": {
        "attributes": {
            "id": "38add208-1bc5-4be4-9063-8968ad489681",
            "status": "modified",
            "booking_id": "38add208-1bc5-4be4-9063-8968ad489681",
            "unique_id": "OFL-113",
            "revision_id": "c1e2198a-92e6-4c27-b964-f63c60d3243a"
        },
        "id": "38add208-1bc5-4be4-9063-8968ad489681",
        "type": "booking"
    }
}
```

Operation to create Booking and save it inside database is asynchronous, as result, if you trigger request immediately after receiving response you can get 404 Error.

Update Booking operation working based at regular logic and will trigger all associated web-hooks and availability changes (depending to Property settings).

[12KB\\
\\
booking\_crs.yml](https://2514252617-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LWLG7_BCMgWd3mn6DYg%2Fuploads%2FJxy80XJMkl9LwtB3SxY1%2Fbooking_crs.yml?alt=media&token=a1332ba6-3be5-4409-b051-683cc44f2b52)

Booking CRS OpenSpec collection

[PreviousBookings Collection](https://docs.channex.io/api-v.1-documentation/bookings-collection) [NextChannel API](https://docs.channex.io/api-v.1-documentation/channel-api)

Last updated 1 month ago

Was this helpful?