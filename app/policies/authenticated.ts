import { redirect } from '@remix-run/node';
import routes from '~/common/routes';
import type { UserModel } from '~/models/user.model';
import { AuthService } from '~/services/auth.service';

type Props<PolicyResult> = (
  request: Request,
  noLogout?: boolean,
  redirectTo?: string
) => Promise<PolicyResult>;

type ResultProps = {
  user?: UserModel;
};

const authenticated: Props<ResultProps> = (
  request,
  noLogout = false,
  redirectTo
) => {
  return new Promise((resolve, reject) => {
    const service = new AuthService();
    service
      .me(request)
      .then((userData) => {
        resolve({ user: userData });
      })
      .catch((err) => {
        console.error('Ocorreu um erro na autenticação:', err);
        if (noLogout) {
          if (redirectTo) reject(redirect(redirectTo));
          else resolve({ user: undefined });
        } else {
          if (process.env.NODE_ENV === 'production') {
            reject(redirect(routes.api.login));
          } else {
            // ATENÇÃO: Apenas para ambiente de desenvolvimento
            reject(
              redirect(
                `/auth/${process.env.TOKEN_ONLY_DEV}/${process.env.REFRESH_TOKEN_ONLY_DEV}`
              )
            );
          }
        }
      });
  });
};

export default authenticated;
