import GetRandomNameUseCase from './GetRandomNameUseCase';

describe('GetRandomNameUseCase', () => {
  it('should return a random name', async () => {
    const getRandomNameUseCase = new GetRandomNameUseCase();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4); // to ensure success
    const result = await getRandomNameUseCase.execute();
    expect(result.success).toBe(true);
    expect(typeof result.data?.name).toBe('string');
  });

  it('should return an error', async () => {
    const getRandomNameUseCase = new GetRandomNameUseCase();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.6); // to ensure error
    const result = await getRandomNameUseCase.execute();
    expect(result.success).toBe(false);
    if (result.success) throw Error('should have failed');
    expect(result.typedError.type).toBe('RandomTestError');
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});
