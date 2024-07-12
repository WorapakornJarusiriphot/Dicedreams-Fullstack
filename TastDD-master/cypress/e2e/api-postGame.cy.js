describe('API Testing without Token', () => {
    it('POST /api/postGame without Token', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/postGame',
            body: {
                gameData: { score: 100, player: 'Dream10@gmail.com' }
            },
            failOnStatusCode: false  // ใช้ตัวเลือกนี้เพื่อไม่ให้ Cypress ล้มเหลวเมื่อไม่มี Token
        })
            .then((response) => {
                expect(response.status).to.eq(401);
            });
    });

    it('POST /api/postGame with Invalid Token', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/postGame',
            headers: {
                'Authorization': 'Bearer invalid-token'
            },
            body: {
                gameData: { score: 100, player: 'John Doe' }
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(401);
            });
    });

    it('POST /api/postGame with Valid Token', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/postGame',
            headers: {
              'Authorization': 'Bearer valid-token'
            },
            body: {
              gameData: { score: 100, player: 'John Doe' }
            },
            failOnStatusCode: false  // ใช้ตัวเลือกนี้เพื่อไม่ให้ Cypress ล้มเหลวเมื่อไม่มี Token
          })
          .then((response) => {
            expect(response.status).to.eq(401);  
          });
        });
      });
