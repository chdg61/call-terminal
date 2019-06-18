import { FetchAdapter } from './fetch-adapter';

describe('Fetch Adapter test', () => {
    let service: FetchAdapter;

    beforeEach( async () => {
        service = new FetchAdapter();
        global.fetch = jest.fn(() => {
            return {
                ok: true,
                json: () => Promise.resolve(''),
            }
        })
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    describe('request', () => {
        it('test url', () => {
            return service.handle({
                url: '/test',
                method: 'GET'
            }).then((result) => {
                expect(global.fetch).toBeCalled()
                expect(global.fetch.mock.calls[0][0]).toBe('/test')
            });
        });

        it('test method', () => {
            return service.handle({
                url: '/test',
                method: 'GET'
            }).then((result) => {
                expect(global.fetch).toBeCalled()
                expect(global.fetch.mock.calls[0][1].method).toBe('GET')
            });
        });

        it('test body', () => {
            return service.handle({
                url: '/test',
                method: 'POST',
                body: 'body'
            }).then((result) => {
                expect(global.fetch).toBeCalled()
                expect(global.fetch.mock.calls[0][1].body).toBe('body')
            });
        });

        it('test headers', () => {
            return service.handle({
                url: '/test',
                method: 'POST',
                headers: {'test-header': "1"}
            }).then((result) => {
                expect(global.fetch).toBeCalled()
                expect(global.fetch.mock.calls[0][1].headers).toBeDefined();
                expect(global.fetch.mock.calls[0][1].headers).toEqual(jasmine.any(Headers));
                expect(global.fetch.mock.calls[0][1].headers.get('test-header')).toBe('1')
            });
        });

        it('test params', () => {
            return service.handle({
                url: 'http://localhost:3000/test',
                method: 'POST',
                params: {
                    'q1': '1',
                    'q2': '2',
                }
            }).then((result) => {
                expect(global.fetch).toBeCalled()
                expect(global.fetch.mock.calls[0][0]).toBe('http://localhost:3000/test?q1=1&q2=2');
            });
        });
    });

    describe('response', () => {
        it('test url', () => {
            global.fetch = jest.fn(() => {
                const response = new Response()
                response.url = '/test';
                return response;
            })
            return service.handle({
                url: '/test',
                method: 'GET'
            }).then((result) => {
                expect(result.url).toBe('/test')
            });
        });
    });

    describe('response', () => {
        it('test get headers', () => {
            global.fetch = jest.fn(() => {
                const headers = new Headers({
                    'key': 'value'
                });
                const response = new Response(null, {
                    headers
                });
                return response;
            })
            return service.handle({
                url: '/test',
                method: 'GET'
            }).then((result) => {
                expect(result.getHeaders()).toEqual({"key": "value"})
            });
        });

        it('test get json', () => {
            global.fetch = jest.fn(() => {
                const response = new Response(JSON.stringify({"key":"value"}));
                return response;
            })
            return service.handle({
                url: '/test',
                method: 'GET'
            }).then((result) => {
                return result.json();
            })
                .then((result) => {
                    expect(result).toEqual({"key":"value"});
                });
        });
    });
});
