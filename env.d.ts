declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      COOKIE_NAME: string;
      SESSION_PASSWORD: string;
      SALT_ROUNDS: number;
    }
  }
}

declare module "iron-session" {
  interface IronSessionData {
    user?: { email: string };
  }
}

export {};
