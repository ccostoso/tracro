import { ErrorSchema, ErrorCodeType } from '../schemas/common';

export const errorResponse = (code: ErrorCodeType, description: string) => ({
    description,
    content: {
        'application/json': {
            schema: ErrorSchema,
            example: {
                error: { code, message: description }
            }
        }
    }
});