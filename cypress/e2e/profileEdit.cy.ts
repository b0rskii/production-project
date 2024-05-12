import { RoutePath } from 'src/6_shared/config/routing';

describe('Пользователь заходит на страницу профиля', () => {
  let profileId: string;

  beforeEach(() => {
    cy.visit('/');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(RoutePath.PROFILE(profileId));
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('редактирует имя и фамилию', () => {
    const newFirstname = 'Имя';
    const newLastname = 'Фамилия';

    cy.updateProfile(newFirstname, newLastname);

    cy.getByTestId('EditProfileForm.Firstname').should(
      'have.value',
      newFirstname
    );
    cy.getByTestId('EditProfileForm.Lastname').should(
      'have.value',
      newLastname
    );
  });
});
