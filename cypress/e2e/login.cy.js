/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button').contains(/^Login$/).click();

    // verifikasi toast untuk menampilkan pesan dari API
    cy.get('div[role="alert"]').contains('"email" is not allowed to be empty').should('be.visible');
  });

  it('should display alert when password is empty', () => {
    // input email
    cy.get('input[placeholder="Email"]').type('test@mail.com');

    // klik tombol Login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // verifikasi toast untuk menampilkan pesan dari API
    cy.get('div[role="alert"]').contains('"password" is not allowed to be empty').should('be.visible');
  });

  it('should display alert when email or password are wrong', () => {
    // input email yang salah
    cy.get('input[placeholder="Email"]').type('wrong_email@mail.com');

    // input password yang salah
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi toast untuk menampilkan pesan dari API
    cy.get('div[role="alert"]').contains('email or password is wrong').should('be.visible');
  });

  it('should display homepage when email and password are correct', () => {
    // input username yang benar
    cy.get('input[placeholder="Email"]').type('test12345@azis.com');

    // input password yang benar
    cy.get('input[placeholder="Password"]').type('test12345');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('a').contains('Stack.id').should('be.visible');
    cy.get('button').contains('test12345').should('be.visible');
    cy.get('h2').contains('Thread Tersedia').should('be.visible');
    cy.get('h2').contains('Kategori Terbaru').should('be.visible');
  });
});
