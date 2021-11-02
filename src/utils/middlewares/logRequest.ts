import { Request, Response, NextFunction } from 'express'

function logRequest(request: Request, response: Response, next: NextFunction) {

  const { method, url,  } = request;


  const logLabel = `[INFO] - [${method.toUpperCase()}] ${url}`;
  console.log(logLabel);
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

export { logRequest };
