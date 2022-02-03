import { SchemaService } from './services/schema.service';

export function loadSchema(schemaSrv: SchemaService) {
  return () => schemaSrv.loadSchema();
}
