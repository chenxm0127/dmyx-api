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
  msg_id: string; //id
  openid: string;
  content: string;
  avatar_url: string; //
  nickname: string;
  timestamp: number; // UTC
};

type Gift = {
  msg_id: string; //id
  openid: string;
  gift_id: string;
  gift_num: number;
  gift_value: number;
  avatar_url: string; //
  nickname: string;
  timestamp: number; // UTC
};

type Like = {
  msg_id: string; //id
  openid: number;
  like_num: string;
  avatar_url: string; //
  nickname: string;
  timestamp: number; // UTC
};

export interface LivingMsgData {
  msg_type: string;
  data: Commit | Gift | Like;
}
