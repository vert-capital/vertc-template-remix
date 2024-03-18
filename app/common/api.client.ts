export default async function apiClient<T>(
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    method: !init?.method ? 'GET' : init.method,
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
