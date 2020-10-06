# messaging-382comm  [![Build Status](https://secure.travis-ci.org/jambonz/messaging-382com.png)](http://travis-ci.org/jambonz/messaging-382com)

Helper functions for parsing incoming SMS/MMS messages from 382com into a standard format for application processing.

## Functions

### fromProviderFormat({messageSid, applicationSid, accountSid}, url, payload)
translates an incoming SMS from 382com into a standard format for application processing.

382com SMS format looks like this:
```
source=3035551212
destination=3039991111
message=Hello+World
type=sms
```

and MMS format looks like this:
```
source=3035551212
destination=3039991111
message=http://picmsg.org/[unique_identifier].jpg
type=mms
```

standard format is:
```
{
	"messageSid": "7c626e1b-7796-4f77-9848-056900b071c4",
	"applicationSid": "9fd9866f-d4bc-46e2-91f1-43da922d80ce",
	"accountSid": "505faa3d-e1cb-4855-8346-f57fb5611b7d",
	"from": "+15083084809",
	"to": ["+17743008772"],
	"text": "Hi there!",
	"cc": [],
	"media": []
}
```

### sendSms(opts, payload)
send an outgoing SMS message from a payload that is presented in standard application format.

The `opts` parameter may include properties that are needed to construct the proper URL, perform HTTP basic authentication, etc.



