import { Request } from 'express';

export type ParsedQueryRequest = Request & {
    /**
     * Original query converted into a mongo query
     * Created by express-query-params
     */
    parsedQuery: any;
};
