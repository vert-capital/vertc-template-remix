export default {
  app: '/',
  absence: {
    list: '/absences',
    new: '/absences/new',
    detail: '/absences/{id}',
  },
  api: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    prefsUser: '/api/user/prefs',
    absences: {
      list: '/api/absences',
      detail: '/api/absences/{id}',
      new: '/api/absences/new',
      edit: '/api/absences/{id}/edit',
    },
  },
};
