---
url: "https://docs.channex.io/application-documentation/availability-rules"
title: "Availability Rules | Channex.io"
---

## [Direct link to heading](https://docs.channex.io/application-documentation/availability-rules\#how-to-find-this-feature)    How to find this feature

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LWLG7_BCMgWd3mn6DYg%252Fuploads%252FnFPxcAVYEcMtjqyfA1aj%252FScreenshot%25202023-12-13%2520at%252014.22.33.png%3Falt%3Dmedia%26token%3D60387f9b-3fc1-4d16-9e0f-a6d253d66ada&width=768&dpr=4&quality=100&sign=72f7cc3&sv=2)

Go to the inventory page and make sure onl1 1 proeprty is selected so you can see the table.

Then click on the "Actions" button to find the "Availability Rules" feature

## [Direct link to heading](https://docs.channex.io/application-documentation/availability-rules\#create-a-rule)    Create a Rule

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LWLG7_BCMgWd3mn6DYg%252Fuploads%252FeyhkOvaYAf1ofbIGMIDn%252FScreenshot%25202023-12-13%2520at%252014.25.03.png%3Falt%3Dmedia%26token%3D8e839bbc-7e69-4830-b183-a4db90548108&width=768&dpr=4&quality=100&sign=3f9bb0b&sv=2)

The above image shows what it looks like with no rules setup

To make a new rule you can click on the "Create" button

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LWLG7_BCMgWd3mn6DYg%252Fuploads%252FL2td8uLCknk8S1YFnPSZ%252FScreenshot%25202023-12-13%2520at%252014.27.04.png%3Falt%3Dmedia%26token%3D1ec75996-4913-48d4-be05-dd2f9d088dbc&width=768&dpr=4&quality=100&sign=97c00e0b&sv=2)

**Affected Dates**: Here you should set the date range for the rule, you can set many years ahead if you want to set for a long time

**Type:** Close Out, Availability Offset, Max Availability (Details below what each of these means)

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LWLG7_BCMgWd3mn6DYg%252Fuploads%252F4rI7MUYCEU960lqc0NZL%252FScreenshot%25202023-12-13%2520at%252014.28.30.png%3Falt%3Dmedia%26token%3De5ae6bb5-1e44-4d76-9411-a1e0e3625b4b&width=300&dpr=4&quality=100&sign=c7deaf2f&sv=2)

## [Direct link to heading](https://docs.channex.io/application-documentation/availability-rules\#close-out)    Close Out

This is used if you want to stop giving availability for this OTA on the selected dates

Example: You want to block all of August to Expedia as you are busy with direct sales instead.

## [Direct link to heading](https://docs.channex.io/application-documentation/availability-rules\#max-availability)    Max Availability

This setting will limit the availability for the room

Example: If you have 10 rooms and set Max Availability to 5 then the channel will only see 5 rooms available even if you have 10 total.

If one room is booked and now 9 total is left the channel will still get an update to show 5. It will work like this until the total available is less than the max available rooms and then it will work as normal.

Typical Use Cases:

- Limit rooms available so you don't get large group bookings

- Limit rooms available so rooms look more scarce on the channel


## [Direct link to heading](https://docs.channex.io/application-documentation/availability-rules\#availability-offset)    Availability Offset

This setting just applies a **negative** amount to the availability, you don't need to enter a negative sign.

If you set "2" to the offset and you have 10 double rooms total then you will have 10 - 2 = 8 rooms to sell.

Once you have 2 rooms left you end up with 0 rooms left (2 - 2 = 0)

Use Case:

- Stop giving availability to some high commission channels when only a few rooms left

- Give last room availability to selected channels or own website


Affected Channels: You need to select which OTA this rul applies to

Room Types: Choose which room types this rule affects.

[PreviousBookings Management](https://docs.channex.io/application-documentation/bookings-management) [NextAPI Key Access](https://docs.channex.io/application-documentation/api-key-access)

Last updated 1 year ago

Was this helpful?