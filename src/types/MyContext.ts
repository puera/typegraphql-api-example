import { Request } from 'express'
import { Session } from 'express-session';

interface MySession extends Session {
  userId: number
}

export interface MyContext {
  req: Request & { session: MySession}
}