import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import invariant from 'tiny-invariant';
import routes from '~/common/routes';
import { commitSession, getSession } from '~/sessions.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Autenticando... | Bootes Studio' }];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    const secretKey = process.env.SESSION_SECRET;
    invariant(secretKey, 'SESSION_SECRET must be set');

    const headers = new Headers();
    const token = params.token;
    const refreshToken = params.refreshToken;
    invariant(token, 'token must be set');
    invariant(refreshToken, 'refreshToken must be set');

    // TODO: validate token with api
    const session = await getSession(request.headers.get('Cookie'));
    session.set('token', token);
    session.set('refreshToken', refreshToken);
    headers.append('Set-Cookie', await commitSession(session));

    return redirect(routes.app, {
      headers: headers,
    });
  } catch (error) {
    return redirect(process.env.AUTH_URL!);
  }
};
