---
url: "https://docs.channex.io/api-v.1-documentation/reviews-collection"
title: "Reviews Collection | Channex.io"
---

At Channex you are able to work with OTA Reviews. It is unified API to work with reviews from Airbnb and Booking.com.

This API has 2 parts - Reviews and Scores.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#enable-reviews-on-the-property)    Enable reviews on the Property

Go here to applications: [https://app.channex.io/applications](https://app.channex.io/applications)

Add the `Messages & Reviews` app to the property, then the API and UI for chat will be available.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#data-structures)    Data Structures

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#review)    Review

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "content": "Guest review content",
  "guest_name": "Guest Name",
  "id": "a82d22ce-20c8-45c3-b49b-8e080a13560a",
  "inserted_at": "2022-06-06T04:27:42.553115",
  "is_hidden": false,
  "is_replied": false,
  "ota": "AirBNB",
  "ota_reservation_id": "HMSZMHHF2X",
  "overall_score": 8.0,
  "received_at": "2022-06-06T04:27:39.366000",
  "reply": null,
  "scores": [\
    {\
      "category": "accuracy",\
      "score": 8.0\
    },\
    {\
      "category": "checkin",\
      "score": 8.0\
    },\
    {\
      "category": "communication",\
      "score": 8.0\
    },\
    {\
      "category": "cleanliness",\
      "score": 6.0\
    },\
    {\
      "category": "value",\
      "score": 10.0\
    },\
    {\
      "category": "location",\
      "score": 10.0\
    }\
  ],
  "tags": [\
    "guest_review_host_positive_spotless_furniture_and_linens",\
    "guest_review_host_positive_squeaky_clean_bathroom",\
    "guest_review_host_positive_pristine_kitchen",\
    "guest_review_host_positive_looked_like_photos",\
    "guest_review_host_positive_matched_description",\
    "guest_review_host_positive_had_listed_amenities_and_services",\
    "guest_review_host_positive_responsive_host",\
    "guest_review_host_positive_clear_instructions",\
    "guest_review_host_positive_flexible_check_in",\
    "guest_review_host_positive_felt_at_home",\
    "guest_review_host_positive_always_responsive",\
    "guest_review_host_positive_local_recommendations",\
    "guest_review_host_positive_proactive",\
    "guest_review_host_positive_helpful_instructions",\
    "guest_review_host_positive_considerate",\
    "guest_review_host_positive_peaceful",\
    "guest_review_host_positive_private",\
    "guest_review_host_positive_lots_to_do",\
    "guest_review_host_positive_walkable"\
  ],
  "updated_at": "2022-06-06T04:27:42.553115"
}
```

`content` Text field with guest Review text.

`guest_name` String with guest Name. Can be empty.

`is_hidden` Boolean status marker specific for Airbnb reviews. If `true`, that mean review is created but will be visible when Property Owner provide they feedback to Guest.

`is_replied` Boolean status marker which represent has Review reply from Property Owner or not.

`ota` String. Name of OTA associated with Review.

`ota_reservation_id` String which contain code of Reservation associated with Review.

`overall_score` Float value which represent Overall score of Review. Max is 10.

`reply` String with reply Property Owner to Guest Review

`scores` List with detailed information about scores provided by Guest.

`tags` List of Strings with codes of Review Tags. (Only for Airbnb).

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#score)    Score

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "id": "9e9ac4cd-5856-4469-9bce-dbce8f5a435f",
  "count": 1121,
  "overall_score": 9.15,
  "scores": {
    "accuracy": {
      "count": 18,
      "score": 9.78
    },
    "checkin": {
      "count": 18,
      "score": 9.88
    },
    "clean": {
      "count": 1113,
      "score": 9.55
    },
    "comfort": {
      "count": 1098,
      "score": 9.45
    },
    "communication": {
      "count": 18,
      "score": 9.88
    },
    "facilities": {
      "count": 1099,
      "score": 9.15
    },
    "location": {
      "count": 1114,
      "score": 9.41
    },
    "staff": {
      "count": 1097,
      "score": 9.67
    },
    "value": {
      "count": 1118,
      "score": 9.21
    }
  },
  "inserted_at": "2022-06-01T09:43:20.106161",
  "updated_at": "2022-06-05T23:01:07.935270"
}
```

`count` Integer value to represent count of scores for Property.

`overall_score` Float value to represent overall score. Max is 10.

`scores` Map with score categories where each key is associated with object with `count` and `score` values. Key represent score category.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#ota-score)    OTA Score

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "id": "383a4180-1df5-40f3-a086-de41509da8d5",
  "channel_id": "305757c7-15c2-4517-8414-7ee6fb69cfc4",
  "count": 1104,
  "ota": "BookingCom",
  "overall_score": 9.14,
  "scores": {
    "clean": {
      "count": 1096,
      "score": 9.55
    },
    "comfort": {
      "count": 1099,
      "score": 9.45
    },
    "facilities": {
      "count": 1100,
      "score": 9.15
    },
    "location": {
      "count": 1097,
      "score": 9.4
    },
    "staff": {
      "count": 1098,
      "score": 9.67
    },
    "value": {
      "count": 1101,
      "score": 9.21
    }
  }
}
```

`channel_id` UUID Reference to Channel entity associated with OTA Score.

`count` Integer value to represent count of Reviews from guests.

`ota` String to represent type of OTA.

`overall_score` Float to represent overall score. Max is 10.

`scores` Map with score categories where each key is associated with object with `count` and `score` values. Key represent score category.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#score-categories-mappings)    Score categories mappings

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#review-categories)    Review Categories

**Booking.com**

**Airbnb**

**Channex**

clean

cleanliness

clean

facilities

facilities

location

location

location

services

services

staff

staff

value

value

value

accuracy

accuracy

communication

communication

checkin

checkin

comfort

comfort

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#reviews)    Reviews

Simple API to read and reply to reviews.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#get-reviews-list)    Get Reviews List

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-request)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-success-response)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/reviews
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": [\
    {\
      "attributes": {\
        "content": "Guest review test",\
        "guest_name": "Guest Name",\
        "id": "5d9aa0d9-a888-46b5-bde8-13cc7a15161c",\
        "inserted_at": "2022-06-06T05:00:41.020781",\
        "is_hidden": false,\
        "is_replied": false,\
        "ota": "BookingCom",\
        "ota_reservation_id": "2328423042",\
        "overall_score": 10.0,\
        "received_at": "2022-06-06T05:45:23.000000",\
        "reply": null,\
        "scores": [\
          {\
            "category": "clean",\
            "score": 10\
          },\
          {\
            "category": "comfort",\
            "score": 7.5\
          },\
          {\
            "category": "facilities",\
            "score": 10\
          },\
          {\
            "category": "location",\
            "score": 10\
          },\
          {\
            "category": "staff",\
            "score": 10\
          },\
          {\
            "category": "value",\
            "score": 7.5\
          }\
        ],\
        "tags": [],\
        "updated_at": "2022-06-06T05:00:41.020781"\
      },\
      "id": "5d9aa0d9-a888-46b5-bde8-13cc7a15161c",\
      "relationships": {\
        "booking": {\
          "data": {\
            "id": "203f359b-08d6-4e5c-b64c-1aa67cfb775d",\
            "type": "booking"\
          }\
        },\
        "channel": {\
          "data": {\
            "id": "9d571186-b4d0-4792-84b7-af04ab1e28e1",\
            "type": "channel"\
          }\
        },\
        "property": {\
          "data": {\
            "id": "2b4832de-ad00-489b-8acc-b5051ea86d94",\
            "type": "property"\
          }\
        }\
      },\
      "type": "review"\
    }\
  ],
  "meta": {
      "limit": 10,
      "order_by": "received_at",
      "order_direction": "desc",
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

**Forbidden Error**

Status Code: `403 Forbidden`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "forbidden",
    "title": "Forbidden"
  }
}
```

This error happened, when Property is not have installed Messages Application.

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#returns)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a `Reviews` list in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided or User not have access to requested Booking.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Booking with provided ID is not present at system.

**Forbidden Error**
Method can return a Forbidden Error result with `403 Forbidden` HTTP Code if Property, associated with requested Booking, is not connected to Messages Application.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#get-review-by-id)    **Get Review by ID**

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-request-1)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-success-response-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/reviews/:review_id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "content": "Guest review test",
      "guest_name": "Guest Name",
      "id": "5d9aa0d9-a888-46b5-bde8-13cc7a15161c",
      "inserted_at": "2022-06-06T05:00:41.020781",
      "is_hidden": false,
      "is_replied": false,
      "ota": "BookingCom",
      "ota_reservation_id": "2328423042",
      "overall_score": 10.0,
      "received_at": "2022-06-06T05:45:23.000000",
      "reply": null,
      "scores": [\
        {\
          "category": "clean",\
          "score": 10\
        },\
        {\
          "category": "comfort",\
          "score": 7.5\
        },\
        {\
          "category": "facilities",\
          "score": 10\
        },\
        {\
          "category": "location",\
          "score": 10\
        },\
        {\
          "category": "staff",\
          "score": 10\
        },\
        {\
          "category": "value",\
          "score": 7.5\
        }\
      ],
      "tags": [\
        "guest_review_host_positive_spotless_furniture_and_linens",\
        "guest_review_host_positive_squeaky_clean_bathroom",\
        "guest_review_host_positive_pristine_kitchen",\
        "guest_review_host_positive_looked_like_photos",\
        "guest_review_host_positive_matched_description",\
        "guest_review_host_positive_had_listed_amenities_and_services",\
        "guest_review_host_positive_responsive_host",\
        "guest_review_host_positive_clear_instructions",\
        "guest_review_host_positive_flexible_check_in",\
        "guest_review_host_positive_felt_at_home",\
        "guest_review_host_positive_always_responsive",\
        "guest_review_host_positive_local_recommendations",\
        "guest_review_host_positive_proactive",\
        "guest_review_host_positive_helpful_instructions",\
        "guest_review_host_positive_considerate",\
        "guest_review_host_positive_peaceful",\
        "guest_review_host_positive_private",\
        "guest_review_host_positive_lots_to_do",\
        "guest_review_host_positive_walkable"\
      ],
      "updated_at": "2022-06-06T05:00:41.020781"
    },
    "id": "5d9aa0d9-a888-46b5-bde8-13cc7a15161c",
    "relationships": {
      "booking": {
        "data": {
          "id": "203f359b-08d6-4e5c-b64c-1aa67cfb775d",
          "type": "booking"
        }
      },
      "channel": {
        "data": {
          "id": "9d571186-b4d0-4792-84b7-af04ab1e28e1",
          "type": "channel"
        }
      },
      "property": {
        "data": {
          "id": "2b4832de-ad00-489b-8acc-b5051ea86d94",
          "title": "PROPERTY TITLE",
          "type": "property"
        }
      }
    },
    "type": "review"
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

**Forbidden Error**

Status Code: `403 Forbidden`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "forbidden",
    "title": "Forbidden"
  }
}
```

This error happened, when Property is not have installed Messages Application.

**Not Found Error**

Status Code: `404 Not Found`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "code": "not_found",
    "title": "Not Found"
  }
}
```

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#returns-1)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a `Review` list in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided or User not have access to requested Booking.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Booking with provided ID is not present at system.

**Forbidden Error**
Method can return a Forbidden Error result with `403 Forbidden` HTTP Code if Property, associated with requested Booking, is not connected to Messages Application.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#reply-to-review)    Reply to Review

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-request-2)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-success-response-2)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-error-response-2)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/reviews/:review_id/reply
```

Payload:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "reply": {
    "reply": "Reply to guest review"
  }
}
```

**Success Response Example**

Status Code: `200 OK`

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

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#returns-2)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a `Review` in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided or User not have access to requested Message Thread.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Message Thread with provided ID is not present at system.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#send-guest-review)    Send Guest Review

Method specific only to Airbnb reviews.

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-request-3)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-success-response-3)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-error-response-3)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST https://staging.channex.io/api/v1/reviews/:review_id/guest_review
```

Payload:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "review": {
    "scores": [\
      {\
        "category": "respect_house_rules",\
        "rating": 5\
      },\
      {\
        "category": "communication",\
        "rating": 5\
      },\
      {\
        "category": "cleanliness",\
        "rating": 5\
      }\
    ],
    "private_review": "private feedback",
    "public_review": "public feedback",
    "is_reviewee_recommended": true,
    "tags": ["host_review_guest_positive_neat_and_tidy"]
  }
}
```

**Success Response Example**

Status Code: `200 OK`

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

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#returns-3)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a `Review` in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided or User not have access to requested Message Thread.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Message Thread with provided ID is not present at system.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#tags)    Tags

Tag

Category

Description

`host_review_guest_positive_neat_and_tidy`

`cleanliness`

Neat & tidy

`host_review_guest_positive_kept_in_good_condition`

`cleanliness`

Kept in good condition

`host_review_guest_positive_took_care_of_garbage`

`cleanliness`

Took care of garbage

`host_review_guest_negative_ignored_checkout_directions`

`cleanliness`

Ignored check-out directions

`host_review_guest_negative_garbage`

`cleanliness`

Excessive garbage

`host_review_guest_negative_messy_kitchen`

`cleanliness`

Messy kitchen

`host_review_guest_negative_damage`

`cleanliness`

Damaged property

`host_review_guest_negative_ruined_bed_linens`

`cleanliness`

Ruined bed linens

`host_review_guest_negative_arrived_early`

`respect_house_rules`

Arrived too early

`host_review_guest_negative_stayed_past_checkout`

`respect_house_rules`

Stayed past checkout

`host_review_guest_negative_unapproved_guests`

`respect_house_rules`

Unapproved guests

`host_review_guest_negative_unapproved_pet`

`respect_house_rules`

Unapproved pet

`host_review_guest_negative_did_not_respect_quiet_hours`

`respect_house_rules`

Didn’t respect quiet hours

`host_review_guest_negative_unapproved_filming`

`respect_house_rules`

Unapproved filming or photography

`host_review_guest_negative_unapproved_event`

`respect_house_rules`

Unapproved event

`host_review_guest_negative_smoking`

`respect_house_rules`

Smoking

`host_review_guest_positive_helpful_messages`

`communication`

Helpful messages

`host_review_guest_positive_respectful`

`communication`

Respectful

`host_review_guest_positive_always_responded`

`communication`

Always responded

`host_review_guest_negative_unhelpful_messages`

`communication`

Unhelpful responses

`host_review_guest_negative_disrespectful`

`communication`

Disrespectful

`host_review_guest_negative_unreachable`

`communication`

Unreachable

`host_review_guest_negative_slow_responses`

`communication`

Slow responses

`guest_review_host_positive_looked_like_photos`

`accuracy`

Looked like the photos

`guest_review_host_positive_matched_description`

`accuracy`

Matched the description

`guest_review_host_positive_had_listed_amenities_and_services`

`accuracy`

Had listed amenities & services

`guest_review_host_negative_smaller_than_expected`

`accuracy`

Smaller than expected

`guest_review_host_negative_did_not_match_photos`

`accuracy`

Didn’t match the photos

`guest_review_host_negative_needs_maintenance`

`accuracy`

Needs maintenance

`guest_review_host_negative_unexpected_fees`

`accuracy`

Unexpected fees

`guest_review_host_negative_excessive_rules`

`accuracy`

Excessive rules

`guest_review_host_negative_unexpected_noise`

`accuracy`

Unexpected noise

`guest_review_host_negative_inaccurate_location`

`accuracy`

Inaccurate location

`guest_review_host_negative_missing_amenity`

`accuracy`

Missing amenity or service

`guest_review_host_positive_responsive_host`

`checkin`

Responsive Host

`guest_review_host_positive_clear_instructions`

`checkin`

Clear instructions

`guest_review_host_positive_easy_to_find`

`checkin`

Easy to find

`guest_review_host_positive_easy_to_get_inside`

`checkin`

Easy to get inside

`guest_review_host_positive_flexible_check_in`

`checkin`

Flexible check-in

`guest_review_host_negative_hard_to_locate`

`checkin`

Hard to locate

`guest_review_host_negative_unclear_instructions`

`checkin`

Unclear instructions

`guest_review_host_negative_trouble_with_lock`

`checkin`

Trouble with lock

`guest_review_host_negative_unresponsive_host`

`checkin`

Unresponsive Host

`guest_review_host_negative_had_to_wait`

`checkin`

Had to wait

`guest_review_host_negative_hard_to_get_inside`

`checkin`

Hard to get inside

`guest_review_host_positive_felt_at_home`

`checkin`

Felt right at home

`guest_review_host_positive_spotless_furniture_and_linens`

`cleanliness`

Spotless furniture & linens

`guest_review_host_positive_free_of_clutter`

`cleanliness`

Free of clutter

`guest_review_host_positive_squeaky_clean_bathroom`

`cleanliness`

Squeaky-clean bathroom

`guest_review_host_positive_pristine_kitchen`

`cleanliness`

Pristine kitchen

`guest_review_host_negative_dirty_or_dusty`

`cleanliness`

Dirty or dusty

`guest_review_host_negative_noticeable_smell`

`cleanliness`

Noticeable smell

`guest_review_host_negative_stains`

`cleanliness`

Stains

`guest_review_host_negative_excessive_clutter`

`cleanliness`

Excessive clutter

`guest_review_host_negative_messy_kitchen`

`cleanliness`

Messy kitchen

`guest_review_host_negative_hair_or_pet_hair`

`cleanliness`

Hair or pet hair

`guest_review_host_negative_dirty_bathroom`

`cleanliness`

Dirty bathroom

`guest_review_host_negative_trash_left_behind`

`cleanliness`

Trash left behind

`guest_review_host_negative_broken_or_missing_lock`

`accuracy`

Broken or missing lock on door

`guest_review_host_negative_unexpected_guests`

`accuracy`

Unexpected guest(s) in space

`guest_review_host_negative_incorrect_bathroom`

`accuracy`

Incorrect bathroom type

`guest_review_host_positive_always_responsive`

`communication`

Always responsive

`guest_review_host_positive_local_recommendations`

`communication`

Local recommendations

`guest_review_host_positive_proactive`

`communication`

Proactive

`guest_review_host_positive_helpful_instructions`

`communication`

Helpful instructions

`guest_review_host_positive_considerate`

`communication`

Considerate

`guest_review_host_negative_slow_to_respond`

`communication`

Slow to respond

`guest_review_host_negative_not_helpful`

`communication`

Not helpful

`guest_review_host_negative_missing_house_instructions`

`communication`

Missing house instructions

`guest_review_host_negative_unclear_checkout_tasks`

`communication`

Unclear checkout tasks

`guest_review_host_negative_inconsiderate`

`communication`

Inconsiderate

`guest_review_host_negative_excessive_checkout_tasks`

`communication`

Excessive checkout tasks

`guest_review_host_positive_peaceful`

`location`

Peaceful

`guest_review_host_positive_beautiful_surroundings`

`location`

Beautiful surroundings

`guest_review_host_positive_private`

`location`

Private

`guest_review_host_positive_great_restaurants`

`location`

Great restaurants

`guest_review_host_positive_lots_to_do`

`location`

Lots to do

`guest_review_host_positive_walkable`

`location`

Walkable

`guest_review_host_negative_noisy`

`location`

Noisy

`guest_review_host_negative_not_much_to_do`

`location`

Not much to do

`guest_review_host_negative_bland_surroundings`

`location`

Bland surroundings

`guest_review_host_negative_not_private`

`location`

Not private

`guest_review_host_negative_inconvenient_location`

`location`

Inconvenient location

`accuracy_other`

`accuracy`

`accuracy` rating that does not fall under other predefined subcategories.

`check_in_other`

`checkin`

`checkin` rating that does not fall under other predefined subcategories.

`cleanliness_other`

`cleanliness`

`cleanliness` rating that does not fall under other predefined subcategories.

`communication_other`

`communication`

`communication` rating that does not fall under other predefined subcategories.

`location_other`

`location`

`location` rating that does not fall under other predefined subcategories.

`respect_house_rules_other`

`respect_house_rules`

`respect_house_rules` rating that does not fall under other predefined subcategories.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#scores)    Scores

API to read Score per Property

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#get-property-score)    Get Property Score

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-request-4)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-success-response-4)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-error-response-4)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/scores/:property_id
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "count": 1122,
      "id": "9e9ac4cd-5a51-4469-9bce-dbce8f5a435f",
      "inserted_at": "2022-06-01T09:43:20.106161",
      "overall_score": 9.15,
      "scores": {
        "accuracy": {
          "count": 18,
          "score": 9.78
        },
        "checkin": {
          "count": 18,
          "score": 9.88
        },
        "clean": {
          "count": 1114,
          "score": 9.55
        },
        "comfort": {
          "count": 1099,
          "score": 9.45
        },
        "communication": {
          "count": 18,
          "score": 9.88
        },
        "facilities": {
          "count": 1100,
          "score": 9.15
        },
        "location": {
          "count": 1115,
          "score": 9.41
        },
        "staff": {
          "count": 1098,
          "score": 9.67
        },
        "value": {
          "count": 1119,
          "score": 9.22
        }
      },
      "updated_at": "2022-06-06T05:01:14.622988"
    },
    "id": "9e9ac4cd-5c16-4469-9bce-dbce8f5a435f",
    "relationships": {
      "property": {
        "data": {
          "id": "57a92389-1cd1-4773-9f0d-47e31d22609f",
          "title": "Hotel",
          "type": "property"
        }
      }
    },
    "type": "score"
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

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#returns-4)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a `Score` in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided or User not have access to requested Message Thread.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Message Thread with provided ID is not present at system.Close Message Thread

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#get-detailed-property-scores)    Get Detailed Property Scores

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-request-5)

Success Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-success-response-5)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/reviews-collection#tab-error-response-5)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET https://staging.channex.io/api/v1/scores/:property_id/detailed
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "attributes": {
      "count": 1122,
      "id": "9e9ac4cd-c11c-4469-9bce-dbce8f5a435f",
      "inserted_at": "2022-06-01T09:43:20.106161",
      "overall_score": 9.15,
      "scores": {
        "accuracy": {
          "count": 18,
          "score": 9.78
        },
        "checkin": {
          "count": 18,
          "score": 9.88
        },
        "clean": {
          "count": 1114,
          "score": 9.55
        },
        "comfort": {
          "count": 1099,
          "score": 9.45
        },
        "communication": {
          "count": 18,
          "score": 9.88
        },
        "facilities": {
          "count": 1100,
          "score": 9.15
        },
        "location": {
          "count": 1115,
          "score": 9.41
        },
        "staff": {
          "count": 1098,
          "score": 9.67
        },
        "value": {
          "count": 1119,
          "score": 9.22
        }
      },
      "updated_at": "2022-06-06T05:01:14.622988"
    },
    "id": "9e9ac4cd-c11c-4469-9bce-dbce8f5a435f",
    "relationships": {
      "ota_scores": [\
        {\
          "data": {\
            "attributes": {\
              "channel_id": "305757c7-bbca-4517-8414-7ee6fb69cfc4",\
              "count": 1104,\
              "id": "383a4180-1cc1-40f3-a086-de41509da8d5",\
              "ota": "BookingCom",\
              "overall_score": 9.14,\
              "scores": {\
                "clean": {\
                  "count": 1096,\
                  "score": 9.55\
                },\
                "comfort": {\
                  "count": 1099,\
                  "score": 9.45\
                },\
                "facilities": {\
                  "count": 1100,\
                  "score": 9.15\
                },\
                "location": {\
                  "count": 1097,\
                  "score": 9.4\
                },\
                "staff": {\
                  "count": 1098,\
                  "score": 9.67\
                },\
                "value": {\
                  "count": 1101,\
                  "score": 9.21\
                }\
              }\
            },\
            "id": "383a4180-1cc1-40f3-a086-de41509da8d5",\
            "type": "ota_score"\
          }\
        },\
        {\
          "data": {\
            "attributes": {\
              "channel_id": "bd90735a-bfd1-4dc7-b302-57bb1fe52909",\
              "count": 18,\
              "id": "1be8fb58-1cc1-4ee2-b94f-7b3e2bf6c9c0",\
              "ota": "AirBNB",\
              "overall_score": 9.88,\
              "scores": {\
                "accuracy": {\
                  "count": 18,\
                  "score": 9.78\
                },\
                "checkin": {\
                  "count": 18,\
                  "score": 9.88\
                },\
                "clean": {\
                  "count": 18,\
                  "score": 9.78\
                },\
                "communication": {\
                  "count": 18,\
                  "score": 9.88\
                },\
                "location": {\
                  "count": 18,\
                  "score": 9.78\
                },\
                "value": {\
                  "count": 18,\
                  "score": 9.66\
                }\
              }\
            },\
            "id": "1be8fb58-1cc1-4ee2-b94f-7b3e2bf6c9c0",\
            "type": "ota_score"\
          }\
        }\
      ],
      "property": {
        "data": {
          "id": "57a92389-1cc1-4773-9f0d-47e31d22609f",
          "title": "Hotel",
          "type": "property"
        }
      }
    },
    "type": "score"
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

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/reviews-collection\#returns-5)    Returns

**Success**
Method can return a Success result with `200 OK` HTTP Code if operation is successful. Will contain a `Score` and `OTA Scores` in the answer.

**Unauthorised Error**
Method can return a Unauthorised Error result with `401 Unauthorized` HTTP Code if wrong API Key provided or User not have access to requested Message Thread.

**Not Found Error** Method can return a Not Found Error result with `404 Not Found` HTTP Code if Message Thread with provided ID is not present at system.

[PreviousMessages Collection](https://docs.channex.io/api-v.1-documentation/messages-collection) [NextAvailability Rules Collection](https://docs.channex.io/api-v.1-documentation/availability-rules-collection)

Last updated 2 months ago

Was this helpful?