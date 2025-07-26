---
url: "https://docs.channex.io/api-v.1-documentation/payment-application-api"
title: "Payment Application API | Channex.io"
---

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#introduction)    Introduction

The Payment Application is a new and safe way for a PMS connected with Channex to charge payments through Stripe API without the headache of PCI DSS and handling credit cards. Once the Payment App is installed and configured you will be able to charge cards through Channex API directly to the properties Stripe account. We charge a small fee to the connected Stripe account each time a card is charged.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#application-installation-and-configuration)    Application Installation and Configuration

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#install-the-payment-application)    Install the Payment Application

To Install the Payment Application you should send an application installation request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/applications

Payload:
{
    "application_installation": {
        "property_id": "{{PROPERTY_ID}}",
        "application_code": "channex_payments"
    }
}

Response:
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
            "id": "12ca008c-95e9-4668-942a-d255b618c00e", <-- INSTALLATION ID\
            "type": "application_installation"\
        }\
    ]
}
```

For more information about this API look here [Applications API](https://docs.channex.io/api-v.1-documentation/applications-api).

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#application-configuration)    Application configuration

The next step is the Application Configuration. At this step you should connect the property Stripe Account to the Channex Payments app.

To setup Stripe connection, you should go over oAuth process, it can be triggered from the Channex user interface or via API.

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#initiate-oauth-connection)    Initiate oAuth connection

Send a request to connect:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/applications/payment_app/{{installation_id}}/connect

Payload:
{
  "provider": "stripe",
  "title": "Custom Title For Provider",
  "redirect_url": "HTTPS Endpoint at your side to handle redirect"
}

Response:
{
  "data": {
    "link": "STRIPE_OAUTH_LINK"
  }
}
```

When you receive a response, you should redirect User to received `data.link` URL.

User will go over the connection pipeline and be redirected to the provided Redirect URL.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#get-application-info-api)    Get Application Info API

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#get-list-of-connected-providers)    Get list of connected Providers

To get list of connected Providers you can use the next API:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/applications/payment_app/{{installation_id}}/providers

Payload:
{
  "page": 1,
  "limit": 10
}

Response:
{
  "data": [\
    {\
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\
      "type": "payment_provider",\
      "attributes": {\
        "id": "550e8400-e29b-41d4-a716-446655440000",\
        "title": "string",\
        "provider": "stripe",\
        "is_active": "USD",\
        "is_default": true,\
        "details": {\
          "account_id": "xyz123"\
        }\
      }\
    }\
  ]
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#update-payment-provider)    Update Payment Provider

To update title for existing Payment Provider you can use next request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
PUT /api/v1/applications/payment_app/{{installation_id}}/update_provider

Payload:
{
  "params": {
    "title": "string"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

Response:
{
  "data": [\
    {\
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\
      "type": "payment_provider",\
      "attributes": {\
        "id": "550e8400-e29b-41d4-a716-446655440000",\
        "title": "Test",\
        "provider": "stripe",\
        "is_active": "USD",\
        "is_default": true,\
        "details": {\
          "account_id": "xyz123"\
        }\
      }\
    }\
  ]
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#set-the-payment-provider-as-default)    Set the Payment Provider as default

Because you can have more then one connected Payment Provider, you should be able to choose which Payment Provider will be used as default.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/applications/payment_app/{{installation_id}}/set_provider_as_default

Payload:
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

Response:
{
  "data": [\
    {\
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",\
      "type": "payment_provider",\
      "attributes": {\
        "id": "550e8400-e29b-41d4-a716-446655440000",\
        "title": "Test",\
        "provider": "stripe",\
        "is_active": "USD",\
        "is_default": true,\
        "details": {\
          "account_id": "xyz123"\
        }\
      }\
    }\
  ]
}
```

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#payment-api)    Payment API

Channex Payment API supports these operations:

- pre auth

- settle pre-authorized charge

- void pre-authorized charge

- charge

- refund


### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#pre-auth)    Pre Auth

To create pre-auth payment

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/bookings/{{booking_id}}/pre_auth_payment

Payload:
{
  "amount": "100.50", <-- AMOUNT AS A STRING
  "booking_id": "{{BOOKING_ID}}",
  "payment_provider_id": "{{PAYMENT_PROVIDER_ID}}",
  "description": "string"
}

Response:
{
  "data": {
    "attributes": {
      "id": "ba8dcd0f-fc91-4778-ae9f-6927a359c849",
      "status": "pre_authorized",
      "description": "string",
      "currency": "GBP",
      "amount": "100.50",
      "inserted_at": "2025-06-18T12:35:03.887722",
      "updated_at": "2025-06-18T12:35:03.887722",
      "transactions": [\
        {\
          "id": "486f0134-b776-46ec-9f0b-2e97f5505433",\
          "type": "pre_auth",\
          "currency": "GBP",\
          "amount": "100.50",\
          "inserted_at": "2025-06-18T12:35:03.893527",\
          "updated_at": "2025-06-18T12:35:03.893527",\
          "ip_address": "118.0.0.232",\
          "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
          "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
          "details": {\
            "id": "pi_3RbLClEX4pVZ00VM01OZKST6"\
          }\
        }\
      ],
      "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2"
    },
    "id": "ba8dcd0f-fc91-4778-ae9f-6927a359c849", <-- PAYMENT ID
    "type": "payment",
    "relationships": {
      "users": {
        "data": [\
          {\
            "attributes": {\
              "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
              "name": "UserName",\
              "email": "email@domain.com"\
            },\
            "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
            "type": "user"\
          }\
        ]
      },
      "booking": {
        "data": {
          "attributes": {
            "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
            "reference": "OSA-CA20F017F2"
          },
          "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
          "type": "booking"
        }
      }
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#settle-pre-authorized-payment)    Settle pre-authorized payment

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/bookings/{{booking_id}}/settle_payment

Payload:
{
  "payment_id":"{{PAYMENT_ID}}"
}

Response:
{
    "data": {
        "attributes": {
            "id": "94f57ee1-484d-45e6-906a-bc95dbe4498a",
            "status": "charged",
            "description": "Desc",
            "currency": "GBP",
            "amount": "100.50",
            "inserted_at": "2025-06-18T12:37:54.000000",
            "updated_at": "2025-06-18T12:38:47.884441",
            "transactions": [\
                {\
                    "id": "dd150ee1-4b41-40ae-bb9a-18ec89d3f3e2",\
                    "type": "pre_auth",\
                    "currency": "GBP",\
                    "amount": "100.50",\
                    "inserted_at": "2025-06-18T12:37:54.000000",\
                    "updated_at": "2025-06-18T12:37:54.000000",\
                    "ip_address": "77.21.15.232",\
                    "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
                    "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
                    "details": {\
                        "id": "pi_3RbLFVEX4pVZ00VM1wKBjJnl"\
                    },\
                    "payment_provider_id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753"\
                },\
                {\
                    "id": "1f573871-3406-42c0-8786-8e7eeed65c94",\
                    "type": "charge",\
                    "currency": "GBP",\
                    "amount": "100.50",\
                    "inserted_at": "2025-06-18T12:38:47.879886",\
                    "updated_at": "2025-06-18T12:38:47.879886",\
                    "ip_address": "77.21.15.232",\
                    "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
                    "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
                    "details": {\
                        "id": "pi_3RbLFVEX4pVZ00VM1wKBjJnl"\
                    },\
                    "payment_provider_id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753"\
                }\
            ],
            "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2"
        },
        "id": "94f57ee1-484d-45e6-906a-bc95dbe4498a",
        "type": "payment",
        "relationships": {
            "users": {
                "data": [\
                    {\
                        "attributes": {\
                            "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
                            "name": "UserName",\
                            "email": "email@domain.com"\
                        },\
                        "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
                        "type": "user"\
                    }\
                ]
            },
            "booking": {
                "data": {
                    "attributes": {
                        "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
                        "reference": "OSA-CA20F017F2"
                    },
                    "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
                    "type": "booking"
                }
            },
            "payment_provider": {
                "data": {
                    "attributes": {
                        "id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753",
                        "title": "20250524",
                        "is_active": true,
                        "provider": "stripe",
                        "details": {
                            "account_id": "acct_1RS8B7EX4pVZ00VM"
                        },
                        "is_default": true
                    },
                    "id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753",
                    "type": "payment_provider"
                }
            }
        }
    }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#void-pre-authorized-payment)    Void pre-authorized payment

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/bookings/{{booking_id}}/void_payment

Payload:
{
  "payment_id":"{{PAYMENT_ID}}"
}

Response:
{
  "data": {
    "attributes": {
      "id": "de9d8488-d7de-4751-b3aa-1384e6b02d21",
      "status": "cancelled",
      "description": "description",
      "currency": "GBP",
      "amount": "100.50",
      "inserted_at": "2025-06-18T12:43:04.000000",
      "updated_at": "2025-06-18T12:43:08.534023",
      "transactions": [\
        {\
          "id": "61de594d-62b5-4d20-8c0e-06ff81e254b3",\
          "type": "pre_auth",\
          "currency": "GBP",\
          "amount": "100.50",\
          "inserted_at": "2025-06-18T12:43:04.000000",\
          "updated_at": "2025-06-18T12:43:04.000000",\
          "ip_address": "77.21.15.232",\
          "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
          "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
          "details": {\
            "id": "pi_3RbLKVEX4pVZ00VM0BZ6FB6E"\
          },\
          "payment_provider_id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753"\
        },\
        {\
          "id": "cba8dd7b-1d83-4c6c-ae21-87ef6a1f1f63",\
          "type": "void",\
          "currency": "GBP",\
          "amount": "100.50",\
          "inserted_at": "2025-06-18T12:43:08.530890",\
          "updated_at": "2025-06-18T12:43:08.530890",\
          "ip_address": "77.21.15.232",\
          "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
          "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
          "details": {\
            "id": "pi_3RbLKVEX4pVZ00VM0BZ6FB6E"\
          },\
          "payment_provider_id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753"\
        }\
      ],
      "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2"
    },
    "id": "de9d8488-d7de-4751-b3aa-1384e6b02d21",
    "type": "payment",
    "relationships": {
      "users": {
        "data": [\
          {\
            "attributes": {\
              "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
              "name": "UserName",\
              "email": "email@domain.com"\
            },\
            "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
            "type": "user"\
          }\
        ]
      },
      "booking": {
        "data": {
          "attributes": {
            "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
            "reference": "OSA-CA20F017F2"
          },
          "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
          "type": "booking"
        }
      },
      "payment_provider": {
        "data": {
          "attributes": {
            "id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753",
            "title": "20250524",
            "is_active": true,
            "provider": "stripe",
            "details": {
              "account_id": "acct_1RS8B7EX4pVZ00VM"
            },
            "is_default": true
          },
          "id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753",
          "type": "payment_provider"
        }
      }
    }
  }
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#charge-payment)    Charge payment

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/bookings/{{booking_id}}/charge_payment

Payload:
{
  "booking_id": "{{BOOKING_ID}}",
  "payment_provider_id": "{{PAYMENT_PROVIDER_ID}}",
  "amount": "10.00",
  "description": "description"
}

Response:
{
  "data": {
    "attributes": {
      "id": "73538783-d1c1-436a-b947-b4263232023b",
      "status": "charged",
      "description": "description",
      "currency": "GBP",
      "amount": "100.50",
      "inserted_at": "2025-06-18T12:46:04.585381",
      "updated_at": "2025-06-18T12:46:04.585381",
      "transactions": [\
        {\
          "id": "4e9a0b02-28b0-4a4f-b1cb-b6bea06dd30a",\
          "type": "charge",\
          "currency": "GBP",\
          "amount": "100.50",\
          "inserted_at": "2025-06-18T12:46:04.591567",\
          "updated_at": "2025-06-18T12:46:04.591567",\
          "ip_address": "77.21.15.232",\
          "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
          "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
          "details": {\
            "id": "pi_3RbLNPEX4pVZ00VM1MpGZx4N"\
          }\
        }\
      ],
      "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2"
    },
    "id": "73538783-d1c1-436a-b947-b4263232023b",
    "type": "payment",
    "relationships": {
      "users": {
        "data": [\
          {\
            "attributes": {\
              "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
              "name": "UserName",\
              "email": "email@domain.com"\
            },\
            "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
            "type": "user"\
          }\
        ]
      },
      "booking": {
        "data": {
          "attributes": {
            "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
            "reference": "OSA-CA20F017F2"
          },
          "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
          "type": "booking"
        }
      }
    }
  },
  "success": true
}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#refund-for-an-existing-payment)    Refund for an existing payment

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/bookings/{{booking_id}}/refund_payment

Payload:
{
  "amount": "100.50"
  "payment_id": "{{PAYMENT_ID}}"
}

Response:
{
  "data": {
    "attributes": {
      "id": "73538783-d1c1-436a-b947-b4263232023b",
      "status": "refunded",
      "description": "description",
      "currency": "GBP",
      "amount": "0.00",
      "inserted_at": "2025-06-18T12:46:05.000000",
      "updated_at": "2025-06-18T12:48:30.611340",
      "transactions": [\
        {\
          "id": "4e9a0b02-28b0-4a4f-b1cb-b6bea06dd30a",\
          "type": "charge",\
          "currency": "GBP",\
          "amount": "100.50",\
          "inserted_at": "2025-06-18T12:46:05.000000",\
          "updated_at": "2025-06-18T12:46:05.000000",\
          "ip_address": "77.21.15.232",\
          "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
          "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
          "details": {\
            "id": "pi_3RbLNPEX4pVZ00VM1MpGZx4N"\
          },\
          "payment_provider_id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753"\
        },\
        {\
          "id": "89282eb0-2aa1-4913-9c5a-7f115582eb33",\
          "type": "refund",\
          "currency": "GBP",\
          "amount": "100.50",\
          "inserted_at": "2025-06-18T12:48:30.602890",\
          "updated_at": "2025-06-18T12:48:30.602890",\
          "ip_address": "77.21.15.232",\
          "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
          "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
          "details": {\
            "id": "re_3RbLNPEX4pVZ00VM1VJ2XDpX"\
          },\
          "payment_provider_id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753"\
        }\
      ],
      "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2"
    },
    "id": "73538783-d1c1-436a-b947-b4263232023b",
    "type": "payment",
    "relationships": {
      "users": {
        "data": [\
          {\
            "attributes": {\
              "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
              "name": "UserName",\
              "email": "email@domain.com"\
            },\
            "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
            "type": "user"\
          }\
        ]
      },
      "booking": {
        "data": {
          "attributes": {
            "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
            "reference": "OSA-CA20F017F2"
          },
          "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
          "type": "booking"
        }
      },
      "payment_provider": {
        "data": {
          "attributes": {
            "id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753",
            "title": "20250524",
            "is_active": true,
            "provider": "stripe",
            "details": {
              "account_id": "acct_1RS8B7EX4pVZ00VM"
            },
            "is_default": true
          },
          "id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753",
          "type": "payment_provider"
        }
      }
    }
  }
}

```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#errors)    Errors

Once you work with Payment API you can get some errors:

Too big amount

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/payment-application-api#tab-too-big-amount)

Low balance on VCC

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/payment-application-api#tab-low-balance-on-vcc)

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#validation-error-for-a-big-amount)    Validation Error for a big amount

Total amount can’t be greater then booking due amount.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "errors": {
        "code": "validation_error",
        "title": "Validation Error",
        "details": {
            "amount": [\
                "is too big"\
            ]
        }
    }
}
```

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#validation-error-for-low-balance-on-vcc)    Validation Error for low balance on VCC

You are not able to charge more then VCC Balance.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "errors": {
        "code": "validation_error",
        "title": "Validation Error",
        "details": {
            "booking_id": [\
                "has not enough balance of virtual card"\
            ]
        }
    }
}
```

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#data-structures)    Data Structures

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#payment)    Payment

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "id": "73538783-d1c1-436a-b947-b4263232023b",
  "status": "refunded",
  "description": "description",
  "currency": "GBP",
  "amount": "0.00",
  "inserted_at": "2025-06-18T12:46:05.000000",
  "updated_at": "2025-06-18T12:48:30.611340",
  "transactions": [...],
  "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2"
}
```

**status**
Enumerable, one of `charged`, `refunded`, `pre_authorized`, `cancelled`, `partially_refunded`.

**description**
String, free-form description for a payment.

**currency**
String. 3 symbols. Currency of a payment. Taken automatically from Booking object.

**amount**
String. Represent amount of Payment.

**booking\_id**
UUID. Link to associated Booking.

**transactions**
List of Transaction objects.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#transaction)    Transaction

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "id": "89282eb0-2aa1-4913-9c5a-7f115582eb33",
  "type": "refund",
  "currency": "GBP",
  "amount": "100.50",
  "inserted_at": "2025-06-18T12:48:30.602890",
  "updated_at": "2025-06-18T12:48:30.602890",
  "ip_address": "77.21.15.232",
  "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",
  "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",
  "details": {
    "id": "re_3RbLNPEX4pVZ00VM1VJ2XDpX"
  },
  "payment_provider_id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753"
}
```

**type**
Enum. One of possible values: `charge`, `refund`, `pre_auth`, `void`.

**currency**
String. 3 symbols. Currency of a payment. Taken automatically from Booking object.

**amount**
String. Represent amount of Payment.

**details**
Object with raw Stripe transaction ID.

**payment\_provider\_id**
UUID. Link to used Payment Provider.

**booking\_id**
UUID. Link to associated Booking.

**user\_id**
UUID. Link to User Object who made Payment.

**ip\_address**

String. IP Address of User who made Payment.

Please, keep in mind, Transaction object is idempotent and can’t be changed over time.

At same time Payment object is mutable and can be changed after each operation.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#reporting-api)    Reporting API

The last part of Payment API is reporting API. It can be used to collect information about Payments provided via Channex Payment App.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/applications/payment_app/{{installation_id}}/transactions

Payload:
{
  "pagination": {
    "page": 1,
    "limit": 10
  },
  "order": {
    "inserted_at": "asc"
  },
  "filter": {}
}

Response:
{
    "data": [\
        {\
            "attributes": {\
                "id": "89282eb0-2aa1-4913-9c5a-7f115582eb33",\
                "type": "refund",\
                "currency": "GBP",\
                "amount": "10.00",\
                "inserted_at": "2025-06-18T12:48:31.000000",\
                "updated_at": "2025-06-18T12:48:31.000000",\
                "ip_address": "77.21.15.232",\
                "booking_id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
                "user_id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
                "details": {\
                    "id": "re_3RbLNPEX4pVZ00VM1VJ2XDpX"\
                },\
                "payment_provider_id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753"\
            },\
            "relationships": {\
                "user": {\
                    "data": {\
                        "attributes": {\
                            "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
                            "name": "UserName",\
                            "email": "email@domain.com"\
                        },\
                        "id": "6e085073-673b-49c5-be75-3c5d1cf6eb1c",\
                        "type": "user"\
                    }\
                },\
                "booking": {\
                    "data": {\
                        "attributes": {\
                            "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
                            "reference": "OSA-CA20F017F2"\
                        },\
                        "id": "513866a5-bdb1-4ff5-b02f-390f7fad7bd2",\
                        "type": "booking"\
                    }\
                },\
                "payment_provider": {\
                    "data": {\
                        "attributes": {\
                            "id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753",\
                            "title": "20250524",\
                            "is_active": true,\
                            "provider": "stripe",\
                            "details": {\
                                "account_id": "acct_1RS8B7EX4pVZ00VM"\
                            },\
                            "is_default": true\
                        },\
                        "id": "ccaf28f3-f066-4f7d-b5a5-6dafd8a98753",\
                        "type": "payment_provider"\
                    }\
                },\
                "payment": {\
                    "data": {\
                        "id": "73538783-d1c1-436a-b947-b4263232023b",\
                        "type": "payment"\
                    }\
                }\
            }\
        }\
    ],
    "meta": {
        "total": 17,
        "limit": 1,
        "order_by": "inserted_at",
        "page": 1,
        "order_direction": "desc"
    }
}
```

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/payment-application-api\#open-spec-api)    Open Spec API

[56KB\\
\\
booking\_payments\_api.yaml](https://2514252617-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LWLG7_BCMgWd3mn6DYg%2Fuploads%2FR6f1gr9N85lPVTiTnQTq%2Fbooking_payments_api.yaml?alt=media&token=653bd233-360d-4a6e-b714-24a9874295d5)

[20KB\\
\\
payment\_app\_api.yaml](https://2514252617-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LWLG7_BCMgWd3mn6DYg%2Fuploads%2F0vwkUOgKFPcyi0oig53p%2Fpayment_app_api.yaml?alt=media&token=123ce48d-a528-433b-af24-0b29f3475ef3)

[PreviousStripe Tokenization App](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app) [NextChannel Codes](https://docs.channex.io/api-v.1-documentation/channel-codes)

Last updated 22 days ago

Was this helpful?