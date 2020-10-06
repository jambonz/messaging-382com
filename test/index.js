const test = require('tape').test ;
const {fromProviderFormat, sendSms} = require('..');

test('parse incoming sms', async(t) => {

  try {
    let payload = `source=3035551212
    destination=3039991111
    message=Hello+World
    type=sms`;

    let obj = await fromProviderFormat({
      messageSid: 'foo',
      applicationSid: 'bar',
      accountSid: 'baz'
    }, payload);
    t.ok(obj.from == '3035551212', 'successfully filtered SMS payload');
    
    if (process.env.USER && process.env.PASSWORD) {
      const res = await sendSms({
        url: 'https://secure1.382com.com/sendsms.cgi',
        auth: {
          username: process.env.USER,
          password: process.env.PASSWORD
        }}, {
          to: '5083084809',
          from: '3393646057',
          text: 'hi there'
        });
      console.log(res);  
    }
    t.end();
  }
  catch (err) {
    console.error(err);
    t.end(err);
  }
});

