/**
 * 生成9位伪随机数
 */
export function generateRandomNumber(): string {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 9; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateMessageId(): string {
  const timestamp = Date.now().toString(); // 获取当前时间戳
  const randomNum = Math.floor(Math.random() * 90000) + 10000; // 生成五位随机数
  const messageId = timestamp + randomNum.toString(); // 结合时间戳和随机数生成消息 ID
  return messageId;
}
