import { getSession } from '~/sessions.server';

const getHeaders = async (init: RequestInit | undefined) => {
  const headersInit: Headers = new Headers();

  if (init?.headers instanceof Headers) {
    // Verifica se headers é uma instância de Headers
    init?.headers.forEach((value, key) => {
      headersInit.append(key, value);
    });
  } else if (init?.headers) {
    // Caso headers seja um objeto literal
    Object.entries(init?.headers).forEach(([key, value]) => {
      headersInit.append(key, value as string);
    });
  }

  const headers: Headers = new Headers();
  const session = await getSession(headersInit.get('Cookie'));

  if (session.has('token')) {
    headers.append('Authorization', `JWT ${session.get('token')}`);
  }

  if (session.has('refreshToken')) {
    headers.append('Refresh-Token', `${session.get('refreshToken')}`);
  }

  return headers;
};

export default async function api<T>(
  input: string | URL | Request,
  init?: RequestInit | undefined,
  urlBase?: string
): Promise<T> {
  if (typeof input === 'string') {
    input = `${urlBase ? urlBase : process.env.BASE_URL_API}${input}`;
  }
  const headers = await getHeaders(init);

  const res = await fetch(input, {
    headers,
    method: 'GET',
  });

  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    if (!contentType?.includes('application/json')) {
      throw await res.text();
    } else {
      throw await res.json();
    }
  }
  let result: any = {};
  if (!contentType?.includes('application/json')) {
    result = await res.text();
  } else {
    result = await res.json();
  }

  if (result.error) throw result.error;

  return result;
}
