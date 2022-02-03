import { SchemaService } from './schema.service';

describe('SchemaService', () => {
  let service: SchemaService;

  beforeEach(() => {
    service = new SchemaService({} as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
