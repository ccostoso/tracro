import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { registry } from './schemas/registry';
import './schemas/common';
import './schemas/foods';

const generator = new OpenApiGeneratorV31(registry.definitions);
export const spec = generator.generateDocument({
    openapi: '3.1.0',
    info: {
        title: 'Foods API',
        version: '1.0.0'
    }
});