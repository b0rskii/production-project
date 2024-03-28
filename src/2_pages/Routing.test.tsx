import { screen } from '@testing-library/react';
import { renderComponent } from '@/6_shared/utils/tests';
import { RoutePath } from '@/6_shared/config/routing';
import { Routing } from './Routing';

describe('Routing', () => {
  it('Должна отрендериться страница соответствующая роуту', async () => {
    renderComponent(<Routing />, {
      route: RoutePath.MAIN,
      initialState: {
        user: {
          isInited: true,
        },
      },
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  it('Должна отрендериться страница 404 на неизвестный роут', async () => {
    renderComponent(<Routing />, {
      route: '/greghe4greghtrh56t',
      initialState: {
        user: {
          isInited: true,
        },
      },
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  it('Должен произойти редирект на Главную если пользователь неавторизован', async () => {
    renderComponent(<Routing />, {
      route: RoutePath.ARTICLES,
      initialState: {
        user: {
          isInited: true,
        },
      },
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  it('Должна отрендериться auth only страница для авторизованного пользователя', async () => {
    renderComponent(<Routing />, {
      route: RoutePath.CREATE_ARTICLE,
      initialState: {
        user: {
          isInited: true,
          authData: {
            id: '1',
            username: 'username',
          },
        },
      },
    });

    const page = await screen.findByTestId('ArticleEditPage');
    expect(page).toBeInTheDocument();
  });

  it('Должна отрендериться ForbiddenPage если пользователь не имеет необходимую роль', async () => {
    renderComponent(<Routing />, {
      route: RoutePath.ADMIN_PANEL,
      initialState: {
        user: {
          isInited: true,
          authData: {
            id: '1',
            username: 'username',
          },
        },
      },
    });

    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  it('Должна отрендериться нужная страница если пользователь имеет необходимую роль', async () => {
    renderComponent(<Routing />, {
      route: RoutePath.ADMIN_PANEL,
      initialState: {
        user: {
          isInited: true,
          authData: {
            id: '1',
            username: 'username',
            roles: ['ADMIN'],
          },
        },
      },
    });

    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
