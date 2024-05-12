export const updateProfile = (newFirstname: string, newLastname: string) => {
  cy.getByTestId('EditProfileButton.Edit').click();

  cy.getByTestId('EditProfileForm.Firstname')
    .should('exist')
    .clear()
    .type(newFirstname);
  cy.getByTestId('EditProfileForm.Lastname')
    .should('exist')
    .clear()
    .type(newLastname);

  cy.getByTestId('EditProfileButton.Save').click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    url: `http://localhost:8000/profiles/${profileId}`,
    method: 'PUT',
    headers: { Authorization: 'gregre' },
    body: {
      id: '0',
      firstname: 'Вася',
      lastname: 'Пупкин',
      age: 30,
      currency: 'RUB',
      country: 'Russia',
      city: 'Krasnoyarsk',
      username: 'testuser',
      avatar: '',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      // eslint-disable-next-line no-unused-vars
      updateProfile(newFirstname: string, newLastname: string): Chainable<void>;
      // eslint-disable-next-line no-unused-vars
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
