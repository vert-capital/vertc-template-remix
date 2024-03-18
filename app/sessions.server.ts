import { createCookieSessionStorage } from '@remix-run/node';

type SessionFlashData = {
  error: string;
  message: string;
};

type SessionData = {
  token: string;
  refreshToken: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: `{{FOLDER_NAME}}-session`,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET!],
      secure: true,
      maxAge: 60 * 60 * 24 * 365, // 1 ano em segundos
    },
  });

export { commitSession, destroySession, getSession };
