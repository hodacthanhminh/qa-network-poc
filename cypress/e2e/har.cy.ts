describe("my tests", () => {
  before(() => {
    // start recording
    cy.recordHar();
  });

  after(() => {
    // save the HAR file
    cy.saveHar();
  });

  it("Visits Command Get", () => {
    cy.visit("https://docs.cypress.io/api/commands/get");
  });
});
