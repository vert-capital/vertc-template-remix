import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react';
import {
  Icons,
  LayoutApp,
  Logo,
  NavbarApp,
  SidebarMenu,
  cn,
} from '@vert-capital/design-system-ui';
import { useState } from 'react';
import { getSelectorsByUserAgent } from 'react-device-detect';
import config from '~/common/config';
import routes from '~/common/routes';
import { userPrefs } from '~/cookies.server';
import { UserModel } from '~/models/user.model';
import authenticated from '~/policies/authenticated';

export const meta: MetaFunction = () => {
  return [{ title: config.appName }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await authenticated(request);

  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  // Check is mobile
  const userAgent = request.headers.get('User-Agent');
  const { isMobile } = getSelectorsByUserAgent(userAgent || '');
  return json({ user, collapseMenu: cookie.collapseMenu, isMobile });
}

export default function LayoutIndex() {
  const { user, collapseMenu, isMobile } = useLoaderData<typeof loader>();
  const _user = new UserModel(user);

  const fetcher = useFetcher();
  const [isCollapsed, setIsCollapsed] = useState(collapseMenu || isMobile);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const setCollapsed = () => {
    setIsCollapsed(!isCollapsed);
    const formData = new FormData();
    formData.append('collapseMenu', String(!isCollapsed));
    formData.append('_action', 'saveMenuState');
    fetcher.submit(formData, {
      method: 'POST',
      action: routes.api.prefsUser,
    });
  };

  return (
    <LayoutApp
      pathname={pathname}
      isCollapsed={isCollapsed}
      preventingScrollRoutes={[routes.app]}
      sibebar={
        <>
          <div className="w-full h-14 flex items-center justify-start">
            <Link
              to={routes.app}
              tabIndex={-1}
              className="flex-none w-full"
              reloadDocument
            >
              <Logo
                src={
                  isCollapsed
                    ? '/resources/images/logo.svg'
                    : '/resources/images/logo-full.svg'
                }
                className={cn(isCollapsed ? 'h-6' : 'w-24 pl-2')}
              />
            </Link>
          </div>
          <SidebarMenu
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Início',
                icon: Icons.Home,
                variant: 'default',
                active: pathname === routes.app,
                onClick: () => navigate(routes.app),
              },
              {
                title: 'Solicitações',
                icon: Icons.CalendarClock,
                variant: 'default',
                active: pathname === routes.absence.list,
                onClick: () => navigate(routes.absence.list),
              },
            ]}
          />
        </>
      }
      navbar={
        <NavbarApp
          isMobile={isMobile}
          setCollapsed={setCollapsed}
          hideApps
          user={{
            id: _user.id,
            nomeCompleto: _user.nomeCompleto,
            email: _user.email,
            avatar: _user.avatar,
            iniciais: _user.iniciais,
          }}
          logout={() => {
            fetcher.submit('', {
              method: 'POST',
              action: routes.api.logout,
            });
          }}
        />
      }
      content={<Outlet />}
    />
  );
}
