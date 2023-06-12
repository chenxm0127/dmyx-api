import { Controller, Get, Post, Body, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskType } from './type';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello() {
    return this.appService.getHello();
  }

  /**
   * 获取用户token
   */
  @Post('live_data/token/get')
  @Header('Content-Type', 'application/json')
  getAccessToken(@Body() req) {
    const { appid, secret, grant_type } = req;
    return this.appService.getAccessToken({ appid, secret, grant_type });
  }

  /**
   * 开启直播业务
   */
  @Post('live_data/task/start')
  startPushTask(@Body() req) {
    const { roomid, appid, msg_type } = req;
    return this.appService.startPushTask({ roomid, appid, msg_type });
  }

  /**
   * 停止直播业务
   */
  @Post('live_data/task/stop')
  stopPushTask(@Body() req) {
    const { roomid, appid, msg_type } = req;
    return this.appService.stopPushTask({ roomid, appid, msg_type });
  }

  /**
   * 失败消息数据获取
   */
  @Post('live_data/fail_data/get')
  getFailedData(@Body() req) {
    const { roomid, appid, msg_type, page_size, page_num } = req;
    return this.appService.getFailedData({
      roomid,
      appid,
      msg_type,
      page_size,
      page_num,
    });
  }

  /**
   * 获取任务状态
   */
  @Post('live_data/task/get')
  getTaskStatus(@Body() req) {
    const { roomid, appid, msg_type } = req;
    return this.appService.getTaskStatus({ roomid, appid, msg_type });
  }

  /**
   * 获取主播信息
   */
  @Post('live_data/host/info/get')
  getHostInfo(@Body() req) {
    const { appid, user_code } = req;
    return this.appService.getHostInfo(appid, user_code);
  }

  /**
   * 推送消息回调
   */
  @Post('live_data/living/message')
  livingMessage(@Body() req) {
    const { msg_type } = req;
    let msgData;
    if (msg_type === 'live_comment') {
      msgData = {
        msgid: req.msgid, //id
        userid: req.userid,
        content: req.content,
        avatarurl: req.avatarurl,
        nickname: req.nickname,
        timestamp: new Date(),
      };
    } else if (msg_type === 'live_gift') {
      msgData = {
        msgid: req.msgid, //id
        userid: req.userid,
        giftid: req.giftid,
        giftnum: req.giftnum,
        giftvalue: req.giftvalue,
        avatarurl: req.avatarurl,
        nickname: req.nickname,
        timestamp: new Date(),
      };
    } else if (msg_type === 'live_like') {
      msgData = {
        msgid: req.msgid, //id
        userid: req.userid,
        likenum: req.likenum,
        avatarurl: req.avatarurl,
        nickname: req.nickname,
        timestamp: new Date(),
      };
    }
    return this.appService.livingMessage(msgData);
  }
}
