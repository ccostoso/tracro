import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
    DATABASE_URL: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', z.prettifyError(parsedEnv.error));
    process.exit(1);
}

export const config = parsedEnv.data;