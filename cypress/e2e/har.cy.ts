describe("my tests", () => {
  beforeEach(() => {
    // start recording
    cy.recordHar({
      transform: "../support/harTransformer.ts",
      content: false,
    });
  });


  afterEach(()=> {
    function generateHarFileName () {
      const currentTestName = Cypress.currentTest.title;
      return currentTestName.replace(/ /g, "-").toLowerCase()
    } 
    
    cy.saveHar({ fileName: generateHarFileName(), outDir: Cypress.env("HAR_REPORT_DIR")  });
  })

  it("Visits Command Get", () => {
    cy.visit("https://docs.cypress.io/api/commands/get");
  });
});
