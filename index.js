const bent = require('bent');
const assert = require('assert');
const noopLogger = {
  info: console.log,
  error: console.error
};

const fromProviderFormat = (opts, payload) => {
  payload.split('\n')
    .map((l) => l.trim())
    .forEach((line) => {
      const arr = /^(.*)=(.*)$/.exec(line);
      if (arr) {
        switch (arr[1]) {
          case 'source':
            opts.from = arr[2];
            break;
          case 'destination':
            opts.to = arr[2];
            break;
          case 'message':
            if (arr[2].startsWith('http://') || arr[2].startsWith('https://')) {
              opts.media = [arr[2]];
            }
            else {
              opts.text = arr[2];
            }
            break;
          default:
            break;
        }
      }
    });
  return opts;
};

const sendSms = async(opts, body) => {
  const logger = opts.logger || noopLogger;
  assert.ok(typeof opts.url === 'string', 'sendSms: opts.url must be provided');
  const get = bent('GET', 'string', 200);
  let url =
    `${opts.url}?user=${opts.auth.username}&pass=${opts.auth.password}&source=${body.from}&destination=${body.to}`;
  if (body.text) url += `&message=${body.text}`;
  else if (body.media && Array.isArray(body.media)) url += `&file_url=${body.media[0]}`;

  url = encodeURI(url);
  try {
    const buf = await get(url);
    return buf;
  } catch (err) {
    logger.error({err, url: opts.url}, 'Error sending SMS to 382com');
  }
};

module.exports = {
  fromProviderFormat,
  sendSms
};
