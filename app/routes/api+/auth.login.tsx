import { MetaFunction, redirect } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Redirecionando... | Aus6encias' }];
};

export async function loader() {
  return redirect(process.env.AUTH_URL!);
}
