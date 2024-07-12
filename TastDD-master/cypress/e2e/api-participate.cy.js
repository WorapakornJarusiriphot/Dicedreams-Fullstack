describe('API Testing without Token', () => {
    it('POST /api/participate without Token', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/participate',
        body: [
          {
            part_Id: '5ce4c905-53f7-4441-a234-c52810f06f0b',
            participant_apply_datetime: '2567-01-03T19:50:00.000Z',
            participant_status: 'unActive',
            user_id: 'a4fa154b-a15a-45fe-b04f-2f9c61a8f2fa',
            post_games_id: '1f287c54-f8ea-4b62-b143-60cb7361faf6',
            createdAt: '2024-03-16T18:08:32.000Z',
            updatedAt: '2024-03-16T18:12:53.000Z'
          }
        ],
        failOnStatusCode: false  // ใช้ตัวเลือกนี้เพื่อไม่ให้ Cypress ล้มเหลวเมื่อไม่มี Token
      })
      .then((response) => {
        expect(response.status).to.eq(401);  
      });
    });
  });
  