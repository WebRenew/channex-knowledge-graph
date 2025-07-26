---
url: "https://docs.channex.io/application-documentation/api-key-access"
title: "API Key Access | Channex.io"
---

If you want to connect an application like a Property Management System (PMS) or Revenue Management (RMS) or similar.

You will need to use the API key

## [Direct link to heading](https://docs.channex.io/application-documentation/api-key-access\#setup-an-api-key)    Setup an API Key

This feature is not available for all Users by default, to enable it you will need to have an active subscription.

If you have just subscribed and it does not show try refresh browser or logout and back in.

In the [User Profile](https://app.channex.io/user_profile) you will see a section: `API Keys`.

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-LWLG7_BCMgWd3mn6DYg%252F-MfaHMHm6xAzxmRGeTbL%252F-MfaKWZZTTMOanKPJZbN%252Fimage.png%3Falt%3Dmedia%26token%3D2d6473ad-0101-4417-a7c0-39fa550297d8&width=768&dpr=4&quality=100&sign=a7cef4aa&sv=2)

API Key management interface

Press `Create new API Key`, fill the API Key name and press `Create` to generate a new API Key.

You can make a API key for all properties or select some properties only.

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LWLG7_BCMgWd3mn6DYg%252Fuploads%252FLjnIyY8umBn9frpOz0yp%252FScreenshot%25202023-01-26%2520at%252020.28.12.png%3Falt%3Dmedia%26token%3D5dd72a39-3662-4daf-a5c6-5a1b15b29e0d&width=768&dpr=4&quality=100&sign=1c178917&sv=2)

After that, you should see this next message:

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-LWLG7_BCMgWd3mn6DYg%252F-MfaHMHm6xAzxmRGeTbL%252F-MfaMKkMnENBR1b57f7f%252FGroup.png%3Falt%3Dmedia%26token%3Df8302953-8417-4190-b440-129992ef4971&width=768&dpr=4&quality=100&sign=7bac7714&sv=2)

Generated API Key Interface

Please, copy the API Key and keep it in a safe place.
The API Key will only be shown once.
If you lose the API Key, you can generate a new one.an

## [Direct link to heading](https://docs.channex.io/application-documentation/api-key-access\#api-key-for-1-or-more-properties)    API Key for 1 or more Properties

Sometimes you need to share only 1 or 2 properties instead of all properties in your account, this is useful for connecting a 3rd party system like a Revenue Management application

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LWLG7_BCMgWd3mn6DYg%252Fuploads%252FFZvfpMCDR6NNDCaewIkr%252FScreenshot%25202023-05-26%2520at%252015.48.12.png%3Falt%3Dmedia%26token%3Da6dece63-95bd-45e0-a533-a5b11b5a82c9&width=768&dpr=4&quality=100&sign=ebab0d31&sv=2)

Just unselect the "Access to all properties" box and you will get a list of properties to select. The API will only be allowed to access the selected properties

## [Direct link to heading](https://docs.channex.io/application-documentation/api-key-access\#undefined)

## [Direct link to heading](https://docs.channex.io/application-documentation/api-key-access\#api-key-usage)    API Key Usage

To send an API requests using the API Key, you should pass it as `user-api-key` header into request.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
GET /api/v1/properties/ HTTP/1.1
Host: staging.channex.io
Content-Type: application/json
user-api-key: uU08XiMgk8a7CrY4xUjAReUIuTrn83R123adaVb8Tf/qMcVTEgriuJhXWs/1Q1P
```

## [Direct link to heading](https://docs.channex.io/application-documentation/api-key-access\#revoke-an-api-key)    Revoke an API Key

Sometimes, an API Key can get compromised. This can happen for many different reasons - forgetting the key at a git repo or something else. If you think your API Key is compromised you can revoke that key.

At your User Profile, find your key at list and press `Actions` button, choose `Withdraw` action and confirm action.

The API key will still be listed and not removed, just disabled.

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-LWLG7_BCMgWd3mn6DYg%252F-MfaHMHm6xAzxmRGeTbL%252F-MfaO6AR3EYWc9ePaT3n%252Fimage.png%3Falt%3Dmedia%26token%3D59158df4-ec46-4be3-b9fd-ccf983f1a218&width=768&dpr=4&quality=100&sign=18b30790&sv=2)

Revoke API Key Interface

## [Direct link to heading](https://docs.channex.io/application-documentation/api-key-access\#what-is-possible-via-the-api-key)    What is possible via the API Key

Using the key you will get access to the same powers as the user itself.

If you made an API key for a specific property then you only can access those properties selected.

[PreviousAvailability Rules](https://docs.channex.io/application-documentation/availability-rules) [NextChange Log Feature](https://docs.channex.io/application-documentation/change-log-feature)

Last updated 2 years ago

Was this helpful?