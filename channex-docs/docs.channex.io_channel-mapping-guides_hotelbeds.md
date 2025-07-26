---
url: "https://docs.channex.io/channel-mapping-guides/hotelbeds"
title: "Hotelbeds | Channex.io"
---

## [Direct link to heading](https://docs.channex.io/channel-mapping-guides/hotelbeds\#connect-to-channex)    Connect to Channex

Log into the extranet of Maxiroom and choose Channex on the list of channel managers, if you or the property can't find that then leave Hotelbeds a support ticket to connect Channex for your property.

## [Direct link to heading](https://docs.channex.io/channel-mapping-guides/hotelbeds\#add-hotelbeds-channel)    Add HotelBeds Channel

Go to the channels page and create a new channel, you should find "Hotelbeds" on the list.

Enter the username and password you were provided by Hotelbeds

User/pass is typically the same, this is normal and should work. Channex must be connected and not another channel manager.

Once you have entered the username and password you have to press the "Test Connection" button

If successful we will show the contract selector

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-LWLG7_BCMgWd3mn6DYg%252F-Mi0q6Pa505lMXVWfaJy%252F-Mi0qlrE4BamsHPSiNLO%252FScreenshot%25202021-08-26%2520at%252011.43.26.png%3Falt%3Dmedia%26token%3D2d961db6-5991-44cf-9123-cd8811ff9df8&width=768&dpr=4&quality=100&sign=5fd977ec&sv=2)

Contract: Please select the correct contract for this channel

One channel is for 1 contract. If you have multiple contracts like the image above then you will need to make 4 Hotelbeds channels to connect each contract separately.

## [Direct link to heading](https://docs.channex.io/channel-mapping-guides/hotelbeds\#mapping-hotelbeds)    Mapping Hotelbeds

Once the contract has been chosen you can click on the mapping tab, it will look similar like this

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-LWLG7_BCMgWd3mn6DYg%252F-Mi0q6Pa505lMXVWfaJy%252F-Mi0reSsz3UzUL24_ZzZ%252FScreenshot%25202021-08-26%2520at%252011.22.31.png%3Falt%3Dmedia%26token%3D49bbc9cf-6e53-4abe-a745-5163d03524db&width=768&dpr=4&quality=100&sign=678e5a7b&sv=2)

We will show all the rooms from Hotelbeds and you can map to the correct room and rate in Channex.

## [Direct link to heading](https://docs.channex.io/channel-mapping-guides/hotelbeds\#save-channel-and-go-live)    Save channel and go live

Once all rooms are mapped you can save the channel and then activate the channel. We will send a full sync to the channel as we do normally.

## [Direct link to heading](https://docs.channex.io/channel-mapping-guides/hotelbeds\#advanced-options)    Advanced Options

After you enter you username and password you will notice some checkboxes which are pre selected for you

![](https://docs.channex.io/~gitbook/image?url=https%3A%2F%2F2514252617-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-LWLG7_BCMgWd3mn6DYg%252F-Mi0q6Pa505lMXVWfaJy%252F-Mi0sHeynwyGPmxVzpIJ%252FScreenshot%25202021-08-26%2520at%252011.52.55.png%3Falt%3Dmedia%26token%3Ddcc3ac36-358e-4309-9545-3591d23e5db1&width=768&dpr=4&quality=100&sign=15b0d08&sv=2)

Update Availability: Should Channex send availability updates or not

Update Rates: Should Channex send prices or not

Update Restrictions: Should Channex send restrictions or not

Mostly these 3 options should be checked, but some contracts are negotiated with availability or prices and there will be errors if you try to update them. Check logs for any errors after activating the channels to see if any errors or all is fine.

Mapping rates that don't accept prices. Some rates might say FIT or some other words. You should not send prices to these rates as it will make errors in the logs.

## [Direct link to heading](https://docs.channex.io/channel-mapping-guides/hotelbeds\#common-errors)    Common Errors:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
(REC-00000) . This request is out of the contract
period (From: 01-12-2019; To: 31-07-2022)
```

This means Channex is trying to send longer than the contract dates, you can ask Hotelbeds to extend the contract to over 2 years to fix this problem.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
Your inventory modification request has failed
because day: 20221026 has no inventory loaded.

Please check that your request informs the Price
for all the rooms and all days with no inventory
```

This happens when we only send availability and there are some dates with no price. Please contact Hotelbeds to make sure you have prices on all dates over 2 years into the future.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
A99-99-059 This change is not permitted as it does
not agree with the signed contract
```

This means you are trying to send prices to a contract rate that does not allow prices to be set from the channel manager. To fix just uncheck "update rates" checkbox in channel settings.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
Minimum allotment activated. New allotment of {0}
for day {1}
```

Any messages about allotments means that you can't close a date in Hotelbeds until they sold that room themselves according to the contract. Best way to deal with this is to not send availability or restrictions and/or rates. Just receive bookings. But you should be careful with allotments as they can easily lead to over bookings.

You can also ask Hotelbeds to remove the contract and make one without allotments to better protect you from over bookings.

[PreviousHopper Homes](https://docs.channex.io/channel-mapping-guides/hopper-homes) [NextHotelTonight](https://docs.channex.io/channel-mapping-guides/hoteltonight)

Last updated 1 year ago

Was this helpful?