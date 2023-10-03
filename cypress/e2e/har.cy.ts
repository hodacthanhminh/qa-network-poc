describe("my tests", () => {
  before(() => {
    // start recording
    cy.recordHar({
      transform: "../support/harTransformer",
      content: false,
    });
  });

  after(() => {
    // save the HAR file
    cy.saveHar();
  });

  it("Visits Command Get", () => {
    cy.visit("https://docs.cypress.io/api/commands/get");
  });
});
