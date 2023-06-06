export interface TaskType {
  roomid: string;
  appid: string;
  msg_type: string;
}

export interface TokenType {
  appid: string;
  secret: string;
  grant_type: string;
}

export interface TaskStatus {
  roomid: string;
  appid: string;
  msg_type: string;
}

export interface TaskDataType {
  roomid: string;
  appid: string;
  msg_type: string;
  page_num: number;
  page_size: number;
}

type Commit = {
  msgid: string; //id
  userid: number;
  content: string;
  avatarurl: string; //
  nickname: string;
  timestamp: number; // UTC
};

type Gift = {
  msgid: string; //id
  userid: number;
  giftid: string;
  giftnum: number;
  giftvalue: number;
  avatarurl: string; //
  nickname: string;
  timestamp: number; // UTC
};

type Like = {
  msgid: string; //id
  userid: number;
  likenum: string;
  avatarurl: string; //
  nickname: string;
  timestamp: number; // UTC
};

export interface LivingData {
  msg_type: string;
  data: Commit | Gift | Like;
}
