const request = require('supertest')
const app = require('./server')

beforeAll(() => jest.setTimeout(90 * 1000))

describe('Stack Clone API', () => {
    it('GET /api/question --> array of Object of Questions', () => {
        return request(app)
        .get('/api/question')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        title: expect.any(String),
                        user: expect.any(String),
                        answer: expect.any(Array)
                    }),
                ])
            );
        });
    })

    it ('GET /api/answer --> array of Object of Answers', () => {
        return request(app)
        .get('/api/answer')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        title: expect.any(String)
                    }),
                ])
            );
        });
    })
});
