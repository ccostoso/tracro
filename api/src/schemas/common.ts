import { z } from "zod";
import { registry } from './registry.js';

export const ErrorCode = z.enum(['invalid_request', 'unauthorized', 'not_found', 'upstream_error', 'internal_error']);
export type ErrorCodeType = z.infer<typeof ErrorCode>;

export const ErrorSchema = registry.register(
    'Error',
    z.object({
        error: z.object({
            code: ErrorCode.openapi({ description: 'Error code' }),
            message: z.string().min(1).openapi({ description: 'Error message' }),
            details: z
                .array(
                    z.object({
                        path: z.string().openapi({ description: 'Field that failed validation, e.g. "q" or "user.email"' }),
                        message: z.string().openapi({ description: 'What was wrong with it' })
                    })
                )
                .optional()
                .openapi({ description: 'Per-field validation failures (only on invalid_request)' })
        })
    })
);