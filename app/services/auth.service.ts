import api from '~/common/api.server';
import { UserModel } from '~/models/user.model';
import { getSession } from '~/sessions.server';

export class AuthService {
  // Me
  async me(request: Request): Promise<UserModel> {
    const session = await getSession(request.headers.get('Cookie'));
    if (!session.has('token')) {
      throw new Error('Usuário não autenticado');
    }
    const response = await api<UserModel>('/user/me', request);
    const userData = UserModel.validate(response);
    return userData;
  }
}
