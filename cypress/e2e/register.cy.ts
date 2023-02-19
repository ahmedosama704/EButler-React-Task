describe('Register form test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });
  it('Check page and validation', () => {
    cy.get('[ data-cy="submitButton"]').click();
    cy.get('[ data-cy="validateName"]').should('exist');
    cy.get('[ data-cy="validateEmail"]').should('exist');
    cy.get('[ data-cy="validatePhone"]').should('exist');
    cy.get('[ data-cy="validatePassword"]').should('exist');
  });
  it('Should redirect user to login page to login page after user Fill his data', () => {
    cy.get('[ data-cy="testUserName"]').type('Ahmed Osama');
    cy.get('[ data-cy="testEmail"]').type('ahmedosma@test.com');
    cy.get('[ data-cy="testPhone"]').type('01111211079');
    cy.get('[ data-cy="testPassword"]').type('test@123456');
    cy.get('[ data-cy="testConfirmPassword"]').type('test@123456');
    cy.get('[ data-cy="submitButton"]').click();
    cy.url().should('match', /\/login$/);
  });
});
