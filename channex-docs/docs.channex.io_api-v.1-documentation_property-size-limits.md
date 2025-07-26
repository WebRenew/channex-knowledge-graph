---
url: "https://docs.channex.io/api-v.1-documentation/property-size-limits"
title: "Property Size Limits | Channex.io"
---

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/property-size-limits\#introduction)    Introduction

To prevent system abuse and ensure API stability, we have to make sure properties are not too large. Big properties can cause issues if there are too many rate plans or rooms and rates and affect other users and properties.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/property-size-limits\#property-size-limits-for-vacation-rental)    Property Size Limits for Vacation Rental

**Room Types:** Max 50

**Rate Plans:** Max 10 Per Room Type

**Per Person Rate:** 18 Occupancy

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/property-size-limits\#property-size-limits-for-hotel)    Property Size Limits for Hotel

**Room Types:** Max 20

**Rate Plans:** Max 200 per property

**Per Person Rate:** 18 Occupancy

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/property-size-limits\#overage-fees-if-you-property-is-larger-than-the-included-limits-usd)    Overage Fees if you property is larger than the included limits (USD)

If you really need to go over limits there will be overage fees to pay, large properties take more resources.

**Hotel Room Type Overage:** $1 Per room Type

**Hotel Rate Plan Overage Fee:** $0.05 per rate plan

**Vacation Rental Room Type Overage Fee:** $0.10 Per room Type

**Vacation Rental Rate Plan Overage Fee:** $0.05 per rate plan

**Best practices to avoid issues:**

- Make sure you use "Per Person" rate plans instead of making a rate plan per occupancy

- Try not to make a rate plan per OTA

- If you have vacation Rental you should make a property per apartment instead of putting all into one Channex property


Example: A client with 100 apartments

Instead of 1 property with 100 room types in Channex, This should be 100 properties in Channex with 1 room type each. This is more correct since each apartment will have its own address and details.

## [Direct link to heading](https://docs.channex.io/api-v.1-documentation/property-size-limits\#what-if-i-need-a-more-rooms-or-rates-for-a-property)    What if I need a more rooms or rates for a property?

We can manually change limits for a certain property on a case by case basis. Please let us know

[PreviousAPI Rate Limits](https://docs.channex.io/api-v.1-documentation/rate-limits) [NextProperties Collection](https://docs.channex.io/api-v.1-documentation/hotels-collection)

Last updated 8 months ago

Was this helpful?