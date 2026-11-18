import { describe, it, expect } from 'vitest';
import request from 'supertest';
import createApp from '../src/app.js';

describe('GET /healthz', () => {
    const app = createApp();

    it('returns 200 and { status: "ok" }', async () => {
        const res = await request(app).get('/healthz');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: 'ok' });
    });

    it('returns 404 for unknown routes', async () => {
        const res = await request(app).get('/nope');

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ error: { code: 'not_found' } });
    })

    it('echoes the x-request-id header', async () => {
        const res = await request(app).get('/healthz').set('X-Request-Id', 'abc');

        expect(res.headers['x-request-id']).toBe('abc');
    });
});