const bent = require('bent');
const assert = require('assert');
const noopLogger = {
  info: console.log,
  error: console.error
};

const fromProviderFormat = (opts, payload) => {
  return Object.assign({}, opts, {
    from: payload.source,
    to: [payload.destination],
    cc: [],
    text: payload.type === 'sms' ? payload.message : null,
    media: payload.type === 'mms' ? [payload.message] : null
  });
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
