---
url: "https://docs.channex.io/api-v.1-documentation/channel-iframe"
title: "Channel IFrame | Channex.io"
---

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#generate-a-one-time-access-token)    Generate a One-Time access token

To generate a One-Time access token you should call the next API Method:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
POST {{server}}/api/v1/auth/one_time_token

{
  "one_time_token": {
    "property_id": "ACCESSIBLE_PROPERTY_ID",
    "group_id": "ACCESSIBLE_GROUP_ID",
    "username": "USERNAME"
  }
}

```

property\_id: This is the channex property ID the user should get access to

group\_id: This is the channex group ID the user should get access to (optional)

username: This should be the name of the user that is logged into your PMS system

You should get the following response:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
  "data": {
    "token": "94feab9f-60e6-411b-d854-8f12004d8bc8"
  },
  "meta": {
    "message": "You are successfully received one-time token! Use it for exchange to JWT"
  }
}
```

At data.token you should receive a One-Time access token to authorise your user in Channex without providing credentials.

After the first usage, token will be removed. The token will live for 15 minutes. Once iframe loaded it will not have an expiry time.

The user will be authenticated under the same user, who requested the Access Token!

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#generate-the-iframe-code)    Generate the Iframe Code

The next step is to generate the iframe to show to your user

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
<iframe
 src="{{server}}/auth/exchange?oauth_session_key={{ONE_TIME_ACCESS_TOKEN}}&app_mo
de=headless&redirect_to=/channels&property_id={{PROPERTY_ID}}"
>
</iframe>
```

Where `{{server}}` is the address of the Channex server, `{{ONE_TIME_ACCESS_TOKEN}}` is the token received at the previous step, `{{PROPERTY_ID}}` is the ID of the Property in Channex which will be associated with the created channels.

Channex also support `group_id` argument at URL, to correctly setup required Group for new channel.

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#filter-available-channels)    Filter available channels

To allow user connect only specific channels, you can pass additional argument `channels` inside URL:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{{server}}/auth/exchange?oauth_session_key={{ONE_TIME_ACCESS_TOKEN}}&app_mo
de=headless&redirect_to=/channels&property_id={{PROPERTY_ID}}&channels=BDC,ABB
```

This filter have 2 side effects:

- filter represented channels at list of channels

- allow user to setup only Channels provided at this list


If you would like to control this behavior separately, please take a look into `available_channels` and `channels_filter` options.

To filter channels what will be represented at Channel List, please apply `channels_filter`.

To filter channels what will be available for connection, please apply `available_channels`.

**List of channel codes:**

Full list you can get at [Channel Codes](https://docs.channex.io/api-v.1-documentation/channel-codes) page.

Code

Channel

ABB

Airbnb

ACO

Abode Connect

ADO

Advertising Online

AGO

Agoda

BDC

Booking.com

CTZ

CultBooking

DDC

Despegar

EXP

Expedia

FER

Feratel

GDS

OpenGDS

GHA

Google Hotel

GIT

Go4IT

HBD

Hotelbeds

HG

HyperGuest

HIC

Hey Iceland

HRS

HRS

HWL

Hostelworld

LO

LocalOTA

MMB

MemberButton

OC

Open Channel

OSA

Instant Booking Page

RC

Room Cloud

RSR

Reserva

TSQ

The Square

VB

VerticalBooking

VRB

VRBO

WBK

Wubook

WBR

Webrooms

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#iframe-functionality-flags)    IFrame functionality flags

To simplify UI and decrease complexity for clients who will work with Channex IFrame we hide some functionality from embedded mode. But you still able to enable that functionality by pass flags as part of URL.

**Allow Notifications Edit**

At Channel Management dialog we have a settings to enable / disable Property Booking Notifications. Because most of PMS use they own mailing system we hide that settings at Embedded mode. But if you would like to allow client to make decision about that option, please add GET Argument `allow_notifications_edit=true` into URL when embed IFrame.

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#language)    Language

By pass `lng=XX` you can choose a language for IFrame UI.
Right now we support next languages:

- English ( `en`)

- Portugal ( `pt`)

- Spanish ( `es`)

- Russian ( `ru`)

- German ( `de`)

- Greek ( `el`)

- Italian ( `it`)

- Hungarian ( `hu`)

- Thai ( `th`)


If you are interested at new translation, please let us know by email.

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#allow-open-bookings-from-message-ui)    **Allow open bookings from Message UI**

By pass `messages_show_booking=true` you can control visibility of Open Booking button at Messages screen.

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#read-only-availability-for-inventory-screen)    Read Only Availability for Inventory Screen

By pass `read_only_availability=true` you can block editing Availability at Inventory screen.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#notes)    Notes

The provided iframe UI is limited and only allows the user to create / edit / remove channels with the provided Property ID.

There is no access policy yet for example “Read-Only” mode. Let us know your ideas or requirements if that is needed.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#other-pages-from-channex)    Other Pages from Channex

This API will allow you to iframe any page from Channex, you will need to edit the redirect. All pages will generally work with property ID option.

Example to get messages page:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{{server}}/auth/exchange?oauth_session_key={{ONE_TIME_ACCESS_TOKEN}}&app_mode=headless&redirect_to=/messages&property_id={{PROPERTY_ID}}
```

### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#messages-page)    Messages Page

As mentioned before, you are able to open any page of Channex via IFrame and our Applications can work with this manner too.

To open Messages, you should redirect user to `/messages` page.

#### [Direct link to heading](https://docs.channex.io/api-v.1-documentation/channel-iframe\#open-messages-for-specific-booking)    Open Messages for specific Booking

Messages page can be opened at Message Thread for a specific Booking. But to do that, you should to know Message Thread ID from Booking.

As a first step, you should request a Booking from Channex side via API ( [https://docs.channex.io/api-v.1-documentation/bookings-collection#get-booking-by-id](https://docs.channex.io/api-v.1-documentation/bookings-collection#get-booking-by-id)), where at answer you will find a `message_thread_id` at `relationships.message_thread.data.id`.

This `message_thread_id` should be used at redirect URL `messages/{{message_thread_id}}`. So, as result, application will be loaded at page with Messages for requseted booking.

[PreviousChannel Codes](https://docs.channex.io/api-v.1-documentation/channel-codes) [NextPMS Certification Tests](https://docs.channex.io/api-v.1-documentation/pms-certification-tests)

Last updated 22 days ago

Was this helpful?