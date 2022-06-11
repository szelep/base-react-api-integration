import axios from 'axios';
import { requestService } from './requestService';

jest.mock('axios');

beforeEach(() => {
  sessionStorage.getItem.mockImplementation(() => JSON.stringify('token'));
});

it('should pass expected arguments to axios.get', () => {
  requestService.get('some-url');

  expect(axios.get).toBeCalledWith('some-url', { headers: { Authorization: 'Bearer token' } });
});

it('should pass expected arguments to axios.put', () => {
  requestService.put('some-url', { name: 'test' });

  expect(axios.put).toBeCalledWith(
    'some-url',
    { name: 'test' },
    { headers: { Authorization: 'Bearer token' } }
  );
});

it('should pass expected arguments to axios.post', () => {
  requestService.post('some-url', { name: 'test' });

  expect(axios.post).toBeCalledWith(
    'some-url',
    { name: 'test' },
    { headers: { Authorization: 'Bearer token' } }
  );
});

it('should delete have default payload value', () => {
  requestService.delete('some-url');

  expect(axios.delete).toBeCalledWith(
    'some-url',
    { headers: { Authorization: 'Bearer token' } }
  );
});

it('should post have default payload value', () => {
  requestService.post('some-url');

  expect(axios.post).toBeCalledWith(
    'some-url',
    {},
    { headers: { Authorization: 'Bearer token' } }
  );
});

it('should put have default payload value', () => {
  requestService.put('some-url');

  expect(axios.put).toBeCalledWith(
    'some-url',
    {},
    { headers: { Authorization: 'Bearer token' } }
  );
});

it('should send post without auth header', () => {
  requestService.post('some-url', {}, false);

  expect(axios.post).toBeCalledWith(
    'some-url',
    {},
    {}
  );
});
