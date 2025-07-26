---
url: "https://docs.channex.io/api-v.1-documentation/webhook-collection"
title: "Webhook Collection | Channex.io"
---

You can create **Webhooks** to be notified about any changes of the property's ARI or about booking and some OTA specific webhooks.
**Webhooks** are Push-notifications. When any changes happens, we send a POST request with JSON payload to the provided endpoint.

**Webhook UI**

We have an UI available to view, add and edit webhooks also so you can lessen your development efforts if you wish to manually set up instead of via API.

Link: [`https://staging.channex.io/webhooks`](https://staging.channex.io/webhooks)

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#list-of-webhook-events-available)    List of webhook events available

- `ari`
This will send you any ARI changes like changed availability or prices, useful if you allow users to change ARI in the Channex interface or mobile app and also to integrate any RM system

- `booking`
If you wish to get all booking changes then this is the one, you will get notification for any booking revision new, modified and cancelled.

- `booking_new`
Will be triggered only for Booking Revisions with status `new`.

- `booking_modification`
Will be triggered only for Booking Revisions with status `modified`.

- `booking_cancellation`
Will be triggered only for Booking Revisions with status `cancelled`.

- `booking_unmapped_room
` This will let you know if any bookings were created which were not mapped

- `booking_unmapped_rate
` Similar to unmapped room but this means room is mapped but rate is not

- `non_acked_booking`
Will be triggered when Booking Revision will be not acknowledged at 30 minutes after first receiving.

- `message
` If you use the messaging API this is required to push messages to you in real time

- `sync_error
` You can see any sync errors on your dashboard

- `sync_warning`
Will be triggered if some non-critical errors will be returned by OTA on sync.

- `rate_error`
Will be triggered if error associated with Rate values will be returned by OTA on sync.

- `reservation_request
` Airbnb specific, You can see a reservation request and can accept or deny.

- `alteration_request
` Airbnb specific, You can see an alteration request and can accept or deny.

- `accepted_reservation`
Airbnb specific, will be triggered when Reservation request will be accepted.

- `declined_reservation`
Airbnb specific, will be triggered when Reservation request will be declined.

- `inquiry`
Airbnb specific, You can see an inquiry request at Dashboard and Messages App.

- `review
` This will let you know if any new review is came.

- `updated_review`
Will be triggered when Review object will be updated (Guest feedback will be received).

- `new_channel`
Will be triggered when new Channel will be created for Property.

- `updated_channel`
Will be triggered when Channel is updated.

- `disconnected_channel`
Will be triggered when Channel is disconnected by automatic rules or User action.

- `disconnect_listing`
Will be triggered when Listing is disconnected from Airbnb Channel.


## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#webhooks-list)    Webhooks List

Retrieve a list of Webhooks associated with users Properties.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/webhooks
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "id": "a9a88747-767e-458c-99e0-9212fcfb0b39",\
      "type": "webhook",\
      "attributes": {\
        "request_params": null,\
        "headers": null,\
        "is_active": true,\
        "send_data": true,\
        "id": "a9a88747-767e-458c-99e0-9212fcfb0b39",\
        "event_mask": "*",\
        "callback_url": "https://YOUR-WEBSITE.COM/api/push_message"\
      },\
      "relationships": {\
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#pagination)    Pagination

By default, this method returns the first 10 elements. To get more details, you should use [Pagination](https://docs.channex.io/api-v.1-documentation/api-reference#pagination) arguments.
Information about count of entities and current pagination position contained at `meta` section at response object.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a list of Webhook objects in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#get-webhook-by-id)    Get Webhook by ID

Retrieve specific webhook associated with User by ID.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/webhooks/:id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "id": "a9a88747-767e-458c-99e0-9212fcfb0b39",
    "type": "webhook",
    "attributes": {
      "request_params": null,
      "headers": null,
      "is_active": true,
      "send_data": true,
      "id": "a9a88747-767e-458c-99e0-9212fcfb0b39",
      "event_mask": "*",
      "callback_url": "https://YOUR-WEBSITE.COM/api/push_message"
    },
    "relationships": {
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

**Not Found Error Response**

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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Webhook object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided or User not have access to requested Webhook.

**Not Found Error**
Method can return a Not Found Error result with `404 Not Found` HTTP Code if Webhook with provided ID is not exists.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#create-webhook)    Create Webhook

Create a new Webhook.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/webhooks
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "webhook": {
    "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "callback_url": "https://YOUR-WEBSITE.COM/api/push_message",
    "event_mask": "*",
    "request_params": {},
    "headers": {},
    "is_active": true,
    "send_data": true
  }
}
```

**Success Response Example**

Status Code: `201 Created`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "webhook",
    "id": "227d4b09-7eef-4c7e-bc72-44c0c40b5299",
    "attributes": {
      "request_params": {},
      "headers": {},
      "is_active": true,
      "send_data": true,
      "id": "227d4b09-7eef-4c7e-bc72-44c0c40b5299",
      "event_mask": "*",
      "callback_url": "https://website.com/api/push_message"
    },
    "relationships": {
      "property": {
        "data": {
          "type": "property",
          "id": "52397a6e-c330-44f4-a293-47042d3a3607"
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
      "property_id": [\
        "can't be blank"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#fields)    Fields

**property\_id** `[required]`

String with valid UUID of Property object what you would like to associate with created Webhook.

**callback\_url** `[required]`

Valid URL address.
Note: This URL will be called via POST request when trigger event is happened.

**event\_mask** `[required]`

Non-empty string with event mask.
Take a look a list of supported webhook events at [List of webhook events](https://docs.channex.io/api-v.1-documentation/webhook-collection#list-of-webhook-events-available) section.
For `ari` event event mask support filtering by restriction, room type id and rate plan id. In that case, event mask should looks like: `event:restrictions:room_type_ids:rate_plan_ids` where restrictions, room\_type\_ids and rate\_plan\_ids can contain several comma separated values.
Real example to listen rate changes at Rate Plan with ID equal to `96a44e07-2158-43e4-8baa-8f6f56922ba8`:
`ari:rate:*:96a44e07-2158-43e4-8baa-8f6f56922ba8`

**request\_params** `[optional]`

JSON Object with specific GET arguments for query.

**headers** `[optional]`

JSON Object with request headers.
Note: If you would like use URL endpoint protected via authentication, you can define request headers at this field.
Example: `{"Authorization": "Basic user:password"}`

**is\_active** `[optional]`

Boolean value.
Note: This field represent active status of Webhook. Only Webhooks with `is_active` field equal to `true` value can receive notifications.
Receive `false` as default value.

**send\_data** `[optional]`

Boolean value.
Note: This field is a flag to send payload data in push callback. If value is `false` we are call callback url without any information about changes.
Receive `false` as default value.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `201 Created` HTTP Code if operation is successful. Will contain a Webhook object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#update-webhook)    Update Webhook

Update a Webhook.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT https://staging.channex.io/api/v1/webhooks/:id
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "webhook": {
    "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "callback_url": "https://YOUR-WEBSITE.COM/api/push_message",
    "event_mask": "ari",
    "request_params": {},
    "headers": {},
    "is_active": true,
    "send_data": true
  }
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "type": "webhook",
    "id": "227d4b09-7eef-4c7e-bc72-44c0c40b5299",
    "attributes": {
      "request_params": {},
      "headers": {},
      "is_active": true,
      "id": "227d4b09-7eef-4c7e-bc72-44c0c40b5299",
      "event_mask": "ari",
      "callback_url": "https://website.com/api/push_message"
    },
    "relationships": {
      "property": {
        "data": {
          "type": "property",
          "id": "52397a6e-c330-44f4-a293-47042d3a3607"
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
      "property_id": [\
        "can't be blank"\
      ]
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#fields-1)    Fields

This method use same fields as Create Webhook method.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Webhook object in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Webhook with provided ID is not present at system.

**Validation Error**
Method can return a Validation Error result with `422 Unprocessable Entity` HTTP Code if any validation rule is failed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#remove-webhook)    Remove Webhook

Remove a Webhook.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
DELETE https://staging.channex.io/api/v1/webhooks/:id
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

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#returns-4)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a Meta object with message in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Webhook with provided ID is not present at system.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#test-webhook)    Test Webhook

Test a Webhook by sending test query to your endpoint.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-request-5)

Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/webhook-collection#tab-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/webhooks/test
```

Query body (JSON):

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "webhook": {
    "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "callback_url": "https://YOUR-WEBSITE.COM/api/push_message",
    "event_mask": "*",
    "request_params": {},
    "headers": {},
    "is_active": true,
    "send_data": true
  }
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "status_code": 200,
  "body": "{\n  \"success\": true\n}"
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#returns-5)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code with body and status code of request results to your endpoint.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#payloads)    Payloads

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#no-data-version)    No Data Version

The message is provided to the provided webhook endpoint, depending on the webhook settings ( `send_data`). If `send_data` is `true`, Channex will push the message payload, if `false` message payload will be removed and target endpoint will only receive `event`, `user_id` and `property_id` fields.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "booking_new",
  "property_id": "90958ec0-9214-4796-873e-4add0d834670",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#ari-availability-rates-and-restrictions)    ARI (Availability, Rates & Restrictions)

Triggered when any changes have happened at the property State or inventory table. We provide information about changed prices, restrictions and availability.

Note: We have included the user ID of who generated the changes, this can be useful if you would like to ignore changes made by your own app.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "ari",
  "payload": [\
    {\
      "availability": 5,\
      "booked": 7,\
      "date": "2021-12-02",\
      "rate_plan_id": "04c607e4-644d-45ea-ab1a-da920ee36e50",\
      "room_type_id": "27e24739-239c-4619-9c30-0dc390f5d7ac",\
      "stop_sell": false\
    }\
  ],
  "property_id": "90958ec0-9713-1196-873e-4add0d834670",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#booking)    Booking

Triggered when Channex receives a booking revision (New, Cancelled or Modified).

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "booking",
  "payload": {
    "booking_id": "e10de9d1-3e2c-431c-b88c-ffca9ed5db5d",
    "property_id": "90958ec0-9713-1196-873e-4add0d834670",
    "revision_id": "80b3b60c-5e24-35c5-ad1b-da67cd704093"
  },
  "property_id": "90958ec0-9713-1396-873e-4add0d834670",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

This event was originally designed to trigger a Pull booking revision operation from the PMS. When this event arrives, we expect the PMS will call `api/v1/booking_revisions/:id`, to pull the new revision and ack it.

Alternatively the PMS can call the Feed endpoint also to get list of all unack bookings.

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#booking-unmapped-room)    Booking Unmapped Room

Triggered when Channex receives a booking revision but can’t map it with existing Room Types. This can happen if the channel is not mapped correctly or if the OTA provides ID which has no mapping.

This event is designed to notify PMS about potential problems at mapping and usually used to trigger notification to support team at PMS side to investigate problems with mapping.

Please, keep in mind, to prevent any potential problems with overbookings, Mapping Issues should be solved in short time-frame and should have high priority.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "booking_unmapped_room",
  "payload": {
    "booking_id": "4995a8d5-552b-4d6c-acc5-cc8ca45bd32a",
    "booking_revision_id": "8a5c7299-611e-4b57-a703-7e146b538750"
  },
  "property_id": "a88cdfa3-2e25-1bcc-ab18-2d4f899ca49b",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#booking-unmapped-rate)    Booking Unmapped Rate

Triggered when Channex receives a booking revision but can’t map it with existing Rate Plans.

This trigger will not come if revision has not mapped Room Type error. Booking Unmapped Room event will mute Booking Unmapped Rate, because when we have no mapped Room it also means rate is not mapped.

This event is designed to notify PMS about potential problems at mapping, but in that case, we can map Room (and correctly process Availability changes), but can’t map to Rate Plan.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "booking_unmapped_rate",
  "payload": {
    "booking_id": "4995a8d5-552b-4d6c-acc5-cc8ca45bd32a",
    "booking_revision_id": "8a5c7299-611e-4b57-a703-7e146b538750"
  },
  "property_id": "a88cdfa3-2e25-3bcc-ab18-2d4f899ca49b",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#message)    Message

Triggered when new chat message from a guest is registered at Channex.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "message",
  "payload": {
    "booking_id": "b4671a17-4440-4da4-9c72-f6afa2d61908",
    "have_attachment": false,
    "attachments": [],
    "id": "9d7e25a0-7602-4454-b3c0-a42afad0fde0"
    "message": "Message content",
    "message_thread_id": "8a632561-ebd3-4dd6-b669-06f560b4510d",
    "ota_message_id": "9f157e80-5275-11ec-a8dd-7d6269b894d7"
  },
  "property_id": "12da6232-a2db-41ac-ba1c-31c934b91c19",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#sync-error)    Sync Error

Triggered when sync error has happened at a connected channel.

Originally designed to notify PMS about potential problems at existed connections.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "sync_error",
  "payload": {
    "channel": "Agoda"
    "channel_event_id": "e7883431-3df6-412f-8c07-0d5e1d983e0f"
    "channel_id": "d691462b-45d1-4655-9076-072210f2ceca"
    "channel_name": "Agoda"
    "error_type": "general_error"
    "property_name": "Hotel Name"
  },
  "property_id": "d69a591e-9be3-4822-cc95-7374ed13a673",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#reservation-request)    Reservation Request

Triggered when Channex receives a Reservation Request from Airbnb.

Contains information about requested reservation.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "reservation_request",
  "payload": {
    "bms": BOOKING_MESSAGE,
    "resolved": false
  },
  "property_id": "4b70ec18-9ec1-4f77-8408-628b6477e824",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

Where BOOKING\_MESSAGE is structure equal to regular Booking Revision structure.

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#review)    Review

Triggered when Channex receives a Review.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "event": "review",
  "payload": {
    "id": "8b5e56bf-515c-4981-8c2a-8d19f6073c23",
    "reply": null,
    "content": null,
    "channel_id": "e990a463-9524-41ec-b741-d19fcd024e06",
    "scores": [\
      {\
        "category": "value",\
        "score": 10.0\
      },\
      {\
        "category": "clean",\
        "score": 10.0\
      },\
      {\
        "category": "location",\
        "score": 10.0\
      },\
      {\
        "category": "comfort",\
        "score": 7.5\
      },\
      {\
        "category": "facilities",\
        "score": 10.0\
      },\
      {\
        "category": "staff",\
        "score": 10.0\
      }\
    ],
    "ota": "BookingCom",
    "property_id": "4b70ec18-9ec1-4f77-8408-628b6477e824",
    "expired_at": "2024-11-03T07:35:21.000000",
    "is_hidden": false,
    "is_replied": false,
    "ota_overall_score": 10.0,
    "ota_reservation_id": "4874110092",
    "ota_review_id": "OyQHKvMWfda",
    "ota_scores": [\
      {\
        "category": "value",\
        "score": 10.0\
      },\
      {\
        "category": "clean",\
        "score": 10.0\
      },\
      {\
        "category": "location",\
        "score": 10.0\
      },\
      {\
        "category": "comfort",\
        "score": 7.5\
      },\
      {\
        "category": "facilities",\
        "score": 10.0\
      },\
      {\
        "category": "staff",\
        "score": 10.0\
      }\
    ],
    "overall_score": 10.0,
    "raw_content": null,
    "received_at": "2024-08-05T07:35:21.000000",
    "reviewer_name": null,
    "booking_id": "66101c21-178f-41b8-adb6-09a8b783dc69",
    "live_feed_event_id": "69121b1e-90d3-4903-8370-5468fc4f39cf",
    "ota_inserted_at": null,
    "reply_scheduled_at": null,
    "reply_sent_at": null
  },
  "property_id": "4b70ec18-9ec1-4f77-8408-628b6477e824",
  "user_id": null,
  "timestamp": "2021-12-24T00:00:00.0000Z"
}
```

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/webhook-collection\#webhook-message-sequence)    Webhook message sequence

Before you start any integration with webhooks, you should to know -

Sequence of incoming webhook calls can be different from sequence of events which trigger that calls. Webhooks may come out of order.

**Explanation**

At property A we have 2 state changes event:
Change availability for Room Type A from 0 to 1.
Change availability for Room Type A from 1 to 0.

This events triggers 2 webhook calls with `ari` type. But when Channex sends the first webhook we might catch some network issue at middle level and message failed with a timeout error. This is a temporary error and webhook will be rescheduled. Second webhook had no issues and was sent successfully and would arrive first.

PMS receives webhook #2 with Availability 0.
First webhook is queued for 2nd attempt to be sent to the target endpoint and this time all went well and we deliver that webhook.

PMS receive webhook #1 with Availability 1.

As a result, if PMS will interpret incoming results, this can cause problems. Instead use information from payload, we suggest to use webhooks as a trigger to execute logic to pull ARI info from Channex.

So, in case with Availability changes, we suggest instead using data from payload, trigger a pull request to get values for changed dates.

[PreviousAvailability and Rates](https://docs.channex.io/api-v.1-documentation/ari) [NextBookings Collection](https://docs.channex.io/api-v.1-documentation/bookings-collection)

Last updated 2 months ago

Was this helpful?