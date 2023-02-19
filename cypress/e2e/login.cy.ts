describe('Login form test', () => {
  it('check login function working well', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[ data-cy="inputEmail"]').type('user1@gmail.com');
    cy.get('[ data-cy="inputPassword"]').type('123456');
    cy.get('[ data-cy="submitButton"]').click();
    cy.url().should('match', /\/$/);
  });
});
