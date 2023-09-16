/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const talkback = require('talkback');

const opts = {
  host: 'https://temtem-api.mael.tech',
  record: talkback.Options.RecordMode.NEW,
  port: 3001,
  path: path.join(__dirname, './tapes'),
};

talkback(opts).start(() => {
  console.log('talkback server started');
});
