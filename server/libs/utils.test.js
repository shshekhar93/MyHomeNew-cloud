import { asyncMap, delay, range } from './utils.js';

describe('Test asyncMap function', () => {
  function customSpy(fn) {
    let callCount = 0;
    let activeCallCount = 0;
    let maxParallelCalls = 0;
  
    const wrapper = async function () {
      callCount++;
      activeCallCount++;
      if(activeCallCount > maxParallelCalls) {
        maxParallelCalls = activeCallCount;
      }
  
      const result = await fn.apply(this, arguments);
      
      activeCallCount--;
      return result;
    };
  
    const getCallCount = () => callCount;
    const getMaxParallelCallCount = () => maxParallelCalls;
    return {
      spyFunction: wrapper,
      getCallCount,
      getMaxParallelCallCount,
    };
  }

  const TEST_ARRAY = [1,2,3,4,5];
  const identityFnWithDelay = async (millis, value) => {
    await delay(millis);
    return value;
  };

  test('Evaluates entire array parallely for concurrency 0', async () => {
    const {
      spyFunction,
      getMaxParallelCallCount,
      getCallCount,
    } = customSpy(identityFnWithDelay.bind(null, 1));

    const result = await asyncMap(TEST_ARRAY, spyFunction, {
      concurrency: 0,
    });

    expect(result).toEqual(TEST_ARRAY);
    expect(getCallCount()).toBe(TEST_ARRAY.length);
    expect(getMaxParallelCallCount()).toBe(TEST_ARRAY.length);
  });

  test('Concurrency defaults to zero', async () => {
    const {
      spyFunction,
      getMaxParallelCallCount,
      getCallCount,
    } = customSpy(identityFnWithDelay.bind(null, 1));

    const result = await asyncMap(TEST_ARRAY, spyFunction);

    expect(result).toEqual(TEST_ARRAY);
    expect(getCallCount()).toBe(TEST_ARRAY.length);
    expect(getMaxParallelCallCount()).toBe(TEST_ARRAY.length);
  });

  test('Only executes specified number of calls in parallel', async () => {
    const {
      spyFunction,
      getMaxParallelCallCount,
      getCallCount,
    } = customSpy(identityFnWithDelay.bind(null, 1));

    const result = await asyncMap(TEST_ARRAY, spyFunction, {
      concurrency: 2,
    });

    expect(result).toEqual(TEST_ARRAY);
    expect(getCallCount()).toBe(TEST_ARRAY.length);
    expect(getMaxParallelCallCount()).toBe(2);
  });
});

describe('Test range function', () => {
  test('Returns correct number of items', () => {
    expect(range(10).length).toBe(10);
  });

  test('Returns numbers starting 1 by default', () => {
    expect(range(5)).toEqual([1,2,3,4,5]);
  });

  test('Honors the start value if provided', () => {
    expect(range(5, 100)).toEqual([100,101,102,103,104]);
  });
});
