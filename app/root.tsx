import { LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigate,
  useNavigation,
  useRouteError,
} from '@remix-run/react';
import { ErrorType, handleError } from '@vert-capital/common';
import {
  Button,
  Icons,
  Logo,
  NProgress,
  Navbar,
  Toaster,
} from '@vert-capital/design-system-ui';
import styles from '@vert-capital/design-system-ui/dist/style.css?url';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import routes from './common/routes';
import mainStyle from './main.css?url';

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    as: 'image',
    href: '/resources/images/logo.svg',
  },
  {
    rel: 'preload',
    as: 'image',
    href: '/resources/images/logo-full.svg',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700,800,900&display=swap',
  },
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: mainStyle },
];

export const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-transparent">
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const transition = useNavigation();

  useEffect(() => {
    let timer: any;
    if (transition.state === 'loading') {
      timer = setTimeout(() => {
        NProgress.start();
      }, 500); // 500 is the delay for showing the progress bar
    } else {
      clearTimeout(timer);
      NProgress.done();
    }

    return () => clearTimeout(timer);
  }, [transition.state]);

  return (
    <QueryClientProvider client={queryClient}>{<Outlet />}</QueryClientProvider>
  );
}

export function ErrorBoundary() {
  const navigate = useNavigate();
  const error: any = useRouteError();
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState<
    | {
        title: string;
        error: ErrorType;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    try {
      if (isRouteErrorResponse(error)) {
        const _errorData = handleError({
          message: error.data,
          code: error.status,
        });
        setErrorData({
          title: error.status == 401 ? 'Não autorizado' : 'Erro',
          error: {
            message: _errorData.message,
            code: error.status,
          } as ErrorType,
        });
      } else if (error instanceof Error) {
        const _errorData = handleError({
          message: error.message,
        });
        setErrorData({
          title: 'Erro',
          error: {
            message: _errorData.message,
            code: 500,
            data: error.stack,
          } as ErrorType,
        });
      } else {
        const _errorData = handleError(error);
        setErrorData({
          title: 'Erro inesperado',
          error: _errorData,
        });
      }
    } catch (error) {
      /* empty */
    } finally {
      setLoading(false);
    }
  }, [error]);

  return (
    <div className="bg-background-screen h-screen overflow-y-auto overflow-x-hidden flex flex-col space-y-10">
      <Navbar>
        <div className="flex justify-start items-center space-x-10">
          <Link to={routes.app}>
            <Logo src="/resources/images/logo-full.svg" className={'w-28'} />
          </Link>
        </div>
      </Navbar>
      <div className="w-full flex flex-1 items-start justify-center">
        <div className="w-full px-6 h-auto sm:px-24 lg:max-w-content">
          <Button
            variant={'outline'}
            onClick={() => navigate(-1)}
            className="mb-10"
          >
            <Icons.ArrowLeft className="h-5 w-5 mr-2" />
            Voltar página
          </Button>

          {loading ? null : errorData?.error ? (
            <div className="space-y-5">
              <h1 className="text-3xl font-bold">{errorData.title}</h1>
              <p>{errorData.error.message}</p>
              {errorData.error.details ? (
                <code className="mt-2">{errorData.error.details}</code>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
