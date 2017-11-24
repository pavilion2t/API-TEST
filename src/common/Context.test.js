import Context from './Context';

describe('Context features', () => {
  const config = {
    schema: 'https',
    host: 'trybindo.com',
    base: '/api/v2',
  };
  const context = new Context(config);
  test('Context init', () => {
    expect(context).toEqual({
      schema: 'https',
      host: 'trybindo.com',
      base: '/api/v2',
    });
  });
  test('context.getURLWith', () => {
    expect(context.url).toBe('https://trybindo.com/api/v2');
  });
});


describe('default configs', () => {
  test('default schema & default base path', () => {
    const context = new Context({ host: 'trybindo.com' });
    expect(context.schema).toBe('https');
    expect(context.base).toBe('');
  });
  test('config & config.host required', () => {
    expect.assertions(2);
    expect(() => new Context({})).toThrow();
    expect(() => new Context()).toThrow();
  });
});
