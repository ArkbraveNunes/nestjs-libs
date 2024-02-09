import { HealthCheckController } from './healthcheck.controller';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    controller = new HealthCheckController();
  });

  it('should return the correct output', () => {
    const expectedOutput = { status: 'ok', version: 'localhost' };

    const actualOutput = controller.healthCheck();

    expect(actualOutput).toEqual(expectedOutput);
  });
});
