import type { ActionFunctionArgs } from '@remix-run/node';
import { formDataValues } from '@vert-capital/common';
import { userPrefs } from '~/cookies.server';

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const { _action, ...values } = await formDataValues({ request });

  if (_action === 'saveMenuState') {
    if (values.collapseMenu) {
      cookie.collapseMenu = values.collapseMenu === 'true';
    }
  }

  return new Response(null, {
    headers: {
      'Set-Cookie': await userPrefs.serialize(cookie),
      Location: '/',
    },
    status: 201,
  });
}
