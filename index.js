const emojiRegex = require("emoji-regex")();
const emojiTextRegx = /\[\w+\]/g;
const emojiKeys = require("./emoji-lib.json");
const emojiContents = {};
for (let key in emojiKeys) {
  emojiContents[emojiKeys[key]] = key;
}
let Emoji = {
  toText: function (text) {
    if (!text) return "";
    let result = text.match(emojiRegex);
    for (let i in result) {
      let e = result[i];
      let t = emojiContents[e];
      text = text.replace(e, t ? `[${t}]` : "[]");
    }
    return text;
  },
  hasEmoji: function (text) {
    return emojiRegex.test(text);
  },
  removeEmoji: function (text) {
    if (!text) return "";
    let result = text.match(emojiRegex);
    for (let i in result) {
      let e = result[i];
      text = text.replace(e, "");
    }
    return text;
  },
  toEmoji: function (text) {
    if (!text) return "";
    let result = text.match(emojiTextRegx);
    for (let i in result) {
      let key = result[i].replace(/\W+/g, "");
      if (key && emojiKeys[key]) {
        text = text.replace(result[i], emojiKeys[key]);
      }
    }
    return text;
  },
};
module.exports = Emoji;
