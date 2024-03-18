import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import { destroySession, getSession } from '~/sessions.server';

export async function action({ request }: ActionFunctionArgs) {
  const headers = new Headers();
  const session = await getSession(request.headers.get('Cookie'));

  headers.append('Set-Cookie', await destroySession(session));
  return redirect(process.env.AUTH_URL!, {
    headers,
  });
}
