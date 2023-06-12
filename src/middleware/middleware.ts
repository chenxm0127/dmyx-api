import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const token = '12345678901234567890';

@Injectable()
export class CheckContentTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const contentType = req.header('content-type');
    console.log('-------contentType: ', contentType);
    if (contentType !== 'application/json') {
      return res.status(400).json({
        err_no: 40023,
        error: 'Invalid content-type',
        logid: new Date().getTime().toString(),
        data: {},
      });
    }
    next();
  }
}

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.header('access-token');
    console.log('-------accessToken: ', accessToken);
    if (accessToken !== token) {
      return res.status(400).json({
        err_no: 40022,
        err_msg: 'Invaid access-token',
        logid: new Date().getTime().toString(),
        data: {},
      });
    }
    next();
  }
}

@Injectable()
export class ParseTextBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.is('text/*')) {
      let data = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        try {
          console.log('----------data: ', data);
          const jsonBody = JSON.parse(data);
          req.body = jsonBody;
          next();
        } catch (error) {
          return res.status(400).json({
            err_no: 40000,
            err_msg: 'Invalid request body',
            data: {},
          });
        }
      });
    } else {
      console.log('----------data: ');
      next();
    }
  }
}
