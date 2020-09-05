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

// console.log(Emoji.toText("我觉得这样不太好吧哈哈哈哈哈 😂😂😂 🐶"));
console.log(
  Emoji.toEmoji(
    "[joy[]]]] [][]]]][[]][[joy][dog][athat]arji 塞给啊日国际alarg; 2463"
  )
);
module.exports = Emoji;
