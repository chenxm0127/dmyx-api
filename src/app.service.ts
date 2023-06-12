import { Injectable } from '@nestjs/common';
import {
  TaskType,
  TaskDataType,
  LivingData,
  TaskStatus,
  TokenType,
} from './type';

@Injectable()
export class AppService {
  getHello() {
    return { data: 'hello' };
  }
  getAccessToken(tokenReq: TokenType) {
    console.log(tokenReq);
    if (tokenReq.appid !== '1234567890abcdef') {
      return {
        err_no: 40015,
        err_msg: 'bad appid',
        data: {
          access_token: '',
          expires_in: 0,
        },
      };
    }
    if (tokenReq.secret !== 'agorasecret') {
      return {
        err_no: 40017,
        err_msg: 'bad secret',
        data: {
          access_token: '',
          expires_in: 0,
        },
      };
    }
    if (tokenReq.grant_type !== 'client_credential') {
      return {
        err_no: 40020,
        err_msg: 'bad client_credential',
        data: {
          access_token: '',
          expires_in: 0,
        },
      };
    }
    return {
      err_no: 0,
      err_msg: 'ok',
      data: {
        access_token: '12345678901234567890',
        expires_in: 7200,
      },
    };
  }
  startPushTask(_taskReq: TaskType) {
    console.log(_taskReq);
    return {
      err_no: 0,
      err_msg: 'ok',
      data: {
        task_id: '1245345',
      },
    };
  }
  stopPushTask(_taskReq: TaskType) {
    console.log(_taskReq);
    return {
      err_no: 0,
      err_msg: 'ok',
      data: {},
    };
  }
  getFailedData(_taskData: TaskDataType) {
    console.log(_taskData);
    let payload: any = '';
    if (_taskData.msg_type === 'live_comment') {
      payload = [
        {
          msgid: '123456',
          userid: 1104,
          content: '你好啊',
          avatarurl: 'test url',
          nickname: '游戏主播',
        },
      ];
    }
    if (_taskData.msg_type === 'live_gift') {
      payload = [
        {
          msgid: '123456',
          userid: 1104,
          giftid: '1001' /*三种礼物类型1001、1002、1003*/,
          giftnum: 123,
          giftvalue: 10000,
          avatarurl: 'test url',
          nickname: '游戏主播',
        },
      ];
    }
    if (_taskData.msg_type === 'live_like') {
      payload = [
        {
          msgid: '123456',
          userid: 1104,
          likenum: 123,
          avatarurl: 'test url',
          nickname: '游戏主播',
        },
      ];
    }
    return {
      err_no: 0,
      err_msg: 'ok',
      data: {
        page_num: 1,
        total_count: 100,
        data_list: [
          // 当页的数据列表
          {
            room_id: '12345', // string类型，消息的房间id
            payload, // string类型， 对应推送协议中的payload字符串，需要unmarshal
          },
        ],
      },
    };
  }
  getTaskStatus(_taskReq: TaskStatus) {
    console.log(_taskReq);
    return {
      err_no: 0,
      err_msg: 'ok',
      data: {
        status: 2,
      },
    };
  }
  getHostInfo(_userid: number) {
    console.log(_userid);
    return {
      err_no: 0,
      err_msg: 'ok',
      data: {
        userName: '游戏主播',
        channelName: 'yxzb',
        appid: '0411799bd126418c9ea73cb37f2c40b4',
      },
    };
  }
  livingMessage(_livingData: LivingData) {
    console.log(_livingData);
    return {
      err_no: 0,
      err_msg: 'ok',
      data: {},
    };
  }
}
