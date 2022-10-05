if (!process.env.COOKIE_NAME) {
  throw new Error(
    "COOKIE_NAME variable must be defined in the .env.local file!"
  );
}

if (!process.env.SESSION_PASSWORD) {
  throw new Error(
    "SESSION_PASSWORD variable must be defined in the .env.local file!"
  );
}

export const ironOptions = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
