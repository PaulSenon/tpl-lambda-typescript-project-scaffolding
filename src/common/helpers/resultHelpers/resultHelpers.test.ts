import { executionAsyncId } from 'async_hooks';
import { TypedError } from '../../types/Result';
import { createTypedErr, createTypedOk } from './resultHelpers';

describe('resultHelpers', () => {
  describe('Ok', () => {
    it('should return a success result with data', () => {
      const Ok = createTypedOk<string>();
      const data = 'test';
      const result = Ok(data);
      expect(result).toEqual({ success: true, data });
    });

    it('should return a success result without data', () => {
      const Ok = createTypedOk<void>();
      const result = Ok();
      expect(result).toEqual({ success: true, data: undefined });
    });
  });

  describe('Err', () => {
    it('should return a failure result with type and error', () => {
      const Err = createTypedErr<'TestError'>();
      const error = new Error('toto');
      const result = Err('TestError', error);
      expect(result).toEqual({
        success: false,
        data: undefined,
        typedError: { type: 'TestError', error },
      });
    });

    it('should return a failure result with typed error', () => {
      const Err = createTypedErr<'TestError'>();
      const error = new Error('toto');
      const result = Err({
        type: 'TestError',
        error,
      });
      expect(result).toEqual({
        success: false,
        data: undefined,
        typedError: { type: 'TestError', error },
      });
    });

    it('should handle wrong params', () => {
      const Err = createTypedErr<'TestError'>();
      const wrongParam = () => 'toto';
      const result = Err(wrongParam as unknown as TypedError<'TestError', Error>);
      expect(result).toEqual({
        success: false,
        data: undefined,
        typedError: { type: 'FatalError', error: expect.any(Error) },
      });
    });
  });
});
