describe('API Testing without Token', () => {
    it('POST /api/postActivity without Token', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/postActivity',
        body: {
          post_activity_id: '52951e92-2409-4b4c-990a-a9111bd03cbc',
          name_activity: 'test name activity',
          status_post: 'active',
          creation_date: '2567-09-02T23:07:00.000Z',
          detail_post: 'detail_post activity',
          date_activity: '2567-09-03',
          time_activity: '06:07:00',
          post_activity_image: 'http://localhost:8080/images/e68ca845-d6bd-4212-867a-f00ddcb8c631.jpeg',
          store_id: '3594f82f-e3bf-11ee-9efc-30d0422f59c9'
        },
        failOnStatusCode: false  // ใช้ตัวเลือกนี้เพื่อไม่ให้ Cypress ล้มเหลวเมื่อไม่มี Token
      })
      .then((response) => {
        expect(response.status).to.eq(401);  
      });
    });
  });
  