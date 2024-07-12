describe('API Testing without Token', () => {
    it('GET /api/users without Token', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8080/api/users',
        failOnStatusCode: false  // ใช้ตัวเลือกนี้เพื่อไม่ให้ Cypress ล้มเหลวเมื่อไม่มี Token
      })
      .then((response) => {
        expect(response.status).to.eq(200);  
      });
    });
  });
  