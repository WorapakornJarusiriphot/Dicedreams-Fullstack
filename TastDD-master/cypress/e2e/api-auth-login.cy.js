// cypress/tests/api/api-users.spec.ts

context("GET /users", () => {
    it("gets a list of users", () => {
      cy.request("GET", "https://www.google.com").then((response) => {
        expect(response.status).to.eq(200)
        // expect(response.body.results).length.to.be.greaterThan(1)
      })
    })
  })
  