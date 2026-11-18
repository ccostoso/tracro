import { z } from "zod";
import { registry } from './registry';
import { errorResponse } from "../lib/errors";

export const FoodSource = registry.register(
    'FoodSource',
    z.enum(['generic', 'branded']).openapi({ description: 'Where a food comes from: our own database (generic) or live from USDA (branded)' })
);

const FoodSchema = registry.register(
    'Food',
    z.object({
        fdcId: z.number().int().min(1),
        description: z.string().min(1),
        dataType: z.string().min(1),
        source: FoodSource,
        brand: z.string().optional(),
        calories: z.number().min(0).openapi({ description: 'Calories per 100 g' }),
        protein: z.number().min(0).openapi({ description: 'Protein per 100 g' }),
        fat: z.number().min(0).openapi({ description: 'Fat per 100 g' }),
        carbs: z.number().min(0).openapi({ description: 'Carbs per 100 g' }),
        fiber: z.number().min(0).openapi({ description: 'Fiber per 100 g' })
    })
);

const FoodDetail = FoodSchema.extend({
    portions: z.array(
        z.object({
            label: z.string().min(1).openapi({ description: 'Portion label' }),
            gramWeight: z.number().min(0).openapi({ description: 'Weight of the portion in grams' })
        })
    ).openapi({ description: 'List of portions for the food item' })
});

registry.register(
    'FoodDetail',
    FoodDetail
);

export const FoodSearchQuery = z.object({
    q: z.string().min(1).openapi({ description: 'Search query for foods' }),
    source: FoodSource.default('generic'),
    limit: z.coerce.number().int().min(1).max(100).default(10).openapi({ description: 'Maximum number of results to return' }),
    offset: z.coerce.number().int().min(0).default(0).openapi({ description: 'Offset for pagination', type: 'integer' })
});
export const FoodSearchResponse = z.object({
    foods: z.array(FoodSchema).openapi({ description: 'List of foods matching the search query' })
});

export type FoodSearchQueryType = z.infer<typeof FoodSearchQuery>;
export type FoodSearchResponseType = z.infer<typeof FoodSearchResponse>;
export type FoodDetailType = z.infer<typeof FoodDetail>;

registry.registerPath({
    method: 'get',
    path: '/api/foods',
    summary: 'Search foods with filters',
    description: 'Search for foods by query and source. Branded results come live from USDA or from the local database.',
    request: {
        query: FoodSearchQuery
    },
    responses: {
        200: {
            description: 'Successful response',
            content: {
                'application/json': {
                    schema: FoodSearchResponse
                }
            }
        },
        400: errorResponse('invalid_request', 'Invalid request'),
        502: errorResponse('upstream_error', 'Upstream error for a USDA failure on branded searches'),
        // 401: {
        //     description: 'Unauthorized',
        //     content: {
        //         'application/json': {
        //             schema: ErrorSchema
        //         }
        //     }
        // }
    },
});

registry.registerPath({
    method: 'get',
    path: '/api/foods/{fdcId}',
    summary: 'Get food by ID',
    description: 'Retrieve a food item by its FDC ID.',
    request: {
        params: z.object({
            fdcId: z.number().int().min(1).openapi({ description: 'FDC ID of the food item' })
        })
    },
    responses: {
        200: {
            description: 'Successful response',
            content: {
                'application/json': {
                    schema: FoodDetail
                }
            }
        },
        404: errorResponse('not_found', 'Food not found'),
        400: errorResponse('invalid_request', 'Invalid request'),
        502: errorResponse('upstream_error', 'USDA lookup failed (food not yet in our database)'),
        // 401: {
        //     description: 'Unauthorized',
        //     content: {
        //         'application/json': {
        //             schema: ErrorSchema
        //         }
        //     }
        // }
    }
});
