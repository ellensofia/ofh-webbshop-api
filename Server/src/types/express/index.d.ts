declare global {
  namespace Express {
    export interface Request {
      session: {
        username: string | undefined;
        email: string | undefined;
        _id: ObjectId | undefined;
        isAdmin: boolean | undefined;
      } | null;
    }
  }
}

export {};
