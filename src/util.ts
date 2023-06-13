import * as crypto from 'crypto';
/**
 * 生成9位伪随机数
 */
export function generateRandomString(): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let randomString = '';

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters.charAt(randomIndex);
    randomString += randomLetter;
  }

  return randomString;
}

export function generateMessageId(): string {
  const timestamp = Date.now().toString(); // 获取当前时间戳
  const randomNum = Math.floor(Math.random() * 90000) + 10000; // 生成五位随机数
  const messageId = timestamp + randomNum.toString(); // 结合时间戳和随机数生成消息 ID
  return messageId;
}

export function signature(
  header: Record<string, string>,
  bodyStr: string,
  secret: string,
): string {
  const keyList = Object.keys(header).sort();
  const kvList = keyList.map((key) => `${key}=${header[key]}`);
  const urlParams = kvList.join('&');
  const rawData = urlParams + bodyStr + secret;
  const md5Result = crypto.createHash('md5').update(rawData).digest();
  return Buffer.from(md5Result).toString('base64');
}

const header = {
  'x-nonce-str': '123456',
  'x-timestamp': '456789',
  'x-roomid': '268',
  'x-msg-type': 'live_gift',
};
const bodyStr = 'abc123你好111';
const secret = 'agorasecret';

const signatureResult = signature(header, bodyStr, secret);
console.log(signatureResult);
