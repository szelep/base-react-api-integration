import { sessionService } from './storageService';

it('should write JSON encoded elements to session', () => {
  sessionService.write({
    name: 'test',
    role: ['role1', 'role_2'],
    prop: { test: true },
  });

  expect(sessionStorage.setItem).toBeCalledTimes(3);
  expect(sessionStorage.setItem).nthCalledWith(1, 'name', '"test"');
  expect(sessionStorage.setItem).nthCalledWith(2, 'role', '["role1","role_2"]');
  expect(sessionStorage.setItem).nthCalledWith(3, 'prop', '{"test":true}');
});

it('should clear session', () => {
  sessionService.clear();

  expect(sessionStorage.clear).toBeCalledTimes(1);
});

it('should get json decoded value from session', () => {
  sessionStorage.getItem.mockReturnValueOnce(JSON.stringify({ test: 'yes' }));

  expect(sessionService.get('')).toHaveProperty('test');
});

it('should return null on json parse error', () => {
  sessionStorage.getItem.mockImplementation(() => {
    throw new Error();
  });

  expect(sessionService.get('test')).toBeNull();
});
