---
url: "https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app"
title: "Stripe Tokenization App | Channex.io"
---

A lot of our customers use Stripe to charge guests and transfer money to Properties. It is excellent solution and works well without any headache except one - how to transfer Credit Card details from OTA to Stripe account. Usually, to perform this operation your system should be PCI DSS certified, because this operation required access to Raw Credit Card data.

Channex will offer a new way how to do that and dramatically decrease complexity - Stripe Tokenization App.

Basically, this Application allow you to do just one thing - pass Credit Card data from Channex PCI Storage into your Stripe Account.

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LWLG7_BCMgWd3mn6DYg%252Fuploads%252FvLhVwfE22hSNxZz5Ochn%252FGroup%25201.png%3Falt%3Dmedia%26token%3Dc8bbead6-92cc-4c47-ba88-686392c968ab&width=768&dpr=4&quality=100&sign=9a04e3aa&sv=2)

To work with this API you should have:

- connected PMS Stripe Account (you can do that at your User Profile)

- installed Stripe Tokenization App (see [Applications API](https://docs.channex.io/api-v.1-documentation/applications-api))


When Stripe is connected and Application is installed, you will have access to two API methods:

- Create Credit Card Stripe Token

- Create Payment Method Token


## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app\#create-credit-card-token)    Create Credit Card Token

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app#tab-request)

Success Respone

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app#tab-success-respone)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app#tab-error-response)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/stripe_tokenization_app/:app_installation_id/token

{
  "booking_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "success": true,
  "data": {
    "token": "STRIPE_CREDIT_CARD_TOKEN"
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

Status Code: `422 Validation Error`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "title": "Validation Error",
    "code": "validation_error",
    "details": {
      "booking_id": [\
        "has no token"\
      ]
    }
  }
}
```

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app\#create-payment-method-token)    Create Payment Method Token

Request

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app#tab-request-1)

Success Respone

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app#tab-success-respone-1)

Error Response

[Direct link to tab](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app#tab-error-response-1)

Request:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST /api/v1/stripe_tokenization_app/:app_installation_id/payment_method

{
  "booking_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

**Success Response Example**

Status Code: `200 OK`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "success": true,
  "data": {
    "token": "STRIPE_PAYMENT_METHOD_TOKEN"
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

Status Code: `422 Validation Error`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "errors": {
    "title": "Validation Error",
    "code": "validation_error",
    "details": {
      "booking_id": [\
        "has no token"\
      ]
    }
  }
}
```

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/stripe-tokenization-app\#how-to-use-token)    How to use token?

Once token is created, you are able to use it at your side in regular basis - create a charge or anything else.

Please, keep in mind, token will be created at your account and we are not have any access to this information.

[PreviousAvailability Rules Collection](https://docs.channex.io/api-v.1-documentation/availability-rules-collection) [NextPayment Application API](https://docs.channex.io/api-v.1-documentation/payment-application-api)

Last updated 24 days ago

Was this helpful?