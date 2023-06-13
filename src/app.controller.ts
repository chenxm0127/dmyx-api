import {
  Controller,
  Get,
  Post,
  Body,
  Header,
  Query,
  HttpCode,
} from '@nestjs/common';
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
  @HttpCode(200)
  getAccessToken(@Body() req) {
    const { appid, secret, grant_type } = req;
    return this.appService.getAccessToken({ appid, secret, grant_type });
  }

  /**
   * 开启直播业务
   */
  @Post('live_data/task/start')
  @HttpCode(200)
  startPushTask(@Body() req) {
    const { roomid, appid, msg_type } = req;
    return this.appService.startPushTask({ roomid, appid, msg_type });
  }

  /**
   * 停止直播业务
   */
  @Post('live_data/task/stop')
  @HttpCode(200)
  stopPushTask(@Body() req) {
    const { roomid, appid, msg_type } = req;
    return this.appService.stopPushTask({ roomid, appid, msg_type });
  }

  /**
   * 失败消息数据获取
   */
  @Get('live_data/fail_data/get')
  @HttpCode(200)
  getFailedData(
    @Query('roomid') roomid: string,
    @Query('appid') appid: string,
    @Query('msg_type') msg_type: string,
    @Query('page_num') page_num: number,
    @Query('page_size') page_size: number,
    @Query('ismock') ismock: string,
  ) {
    return this.appService.getFailedData(ismock, {
      roomid,
      appid,
      msg_type,
      page_num,
      page_size,
    });
  }

  /**
   * 获取任务状态
   */
  @Get('live_data/task/get')
  @HttpCode(200)
  getTaskStatus(
    @Query('roomid') roomid: string,
    @Query('appid') appid: string,
    @Query('msg_type') msg_type: string,
  ) {
    return this.appService.getTaskStatus({ roomid, appid, msg_type });
  }

  /**
   * 获取主播信息
   */
  @Post('live_data/host/info/get')
  @HttpCode(200)
  getHostInfo(@Body() req) {
    const { appid, user_code } = req;
    return this.appService.getHostInfo(appid, user_code);
  }

  /**
   * 推送消息回调
   */
  @Post('live_data/living/message')
  @HttpCode(200)
  livingMessage(@Body() req) {
    const { msg_type } = req;
    let msgData;
    if (msg_type === 'live_comment') {
      msgData = {
        openid: req.openid,
        content: req.content,
        avatar_url: req.avatarurl,
        nickname: req.nickname,
        timestamp: new Date().getTime(),
      };
    } else if (msg_type === 'live_gift') {
      msgData = {
        openid: req.openid,
        gift_id: req.gift_id,
        gift_num: req.gift_num,
        gift_value: req.gift_value,
        avatar_url: req.avatar_url,
        nickname: req.nickname,
        timestamp: new Date().getTime(),
      };
    } else if (msg_type === 'live_like') {
      msgData = {
        openid: req.openid,
        like_num: req.likenum,
        avatar_url: req.avatarurl,
        nickname: req.nickname,
        timestamp: new Date().getTime(),
      };
    }
    return this.appService.livingMessage(req.roomid, req.msg_type, msgData);
  }
}
