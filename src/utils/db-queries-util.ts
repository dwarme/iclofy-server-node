import database from '../database'
import winston = require('winston')
import { IClofyAPIError, IClofyUnknownError } from '../models/IClofyError'

interface QueryResponse{
    error?: false
}

interface QueryResponseError{
    error: IClofyAPIError
}

interface QuerySelectResponse<T> extends QueryResponse{
    rows: T[]
}

interface QueryModifyingResponse<T> extends QueryResponse{
    rowCount: number
    rowsEffected: T[]
}

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

async function runSelectQuery <T>(query: string, params: any[]): Promise<T[]>{
    try {
        return await new Promise((resolve, rejects) => {
            database.query(query, params, (err, res) => {
                if (err) rejects(err)
                else resolve(res.rows as T[])
            })
        })
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function runModifyingQuery<T>(query: string, params: any[]): Promise<{ rowCount: number, rowsEffected: T[] }>{
    try {
        return await new Promise((resolve, rejects) => {
            database.query(query, params, (err, res) => {
                if (err) rejects(err)
                else resolve({ rowCount: res.rowCount, rowsEffected: res.rows as T[] })
            })
        })
    } catch (err) {
        logger.error(err)
        throw err
    }
}

const runQuery = {
    select:  async<T>(query: string, params: any[]): Promise<QuerySelectResponse<T> | QueryResponseError/*{ rows: T[]}*/> => {
        try {

            const rows = await runSelectQuery<T>(query, params);
            return { rows }

        } catch (err) {
            console.log(err)
            const error = new IClofyUnknownError({
                message: 'An error occured while fetching data',
                type: 'internal_error'
            })

            return {error}
        }
    },

    modifying: async <T>(query: string, params: any[]): Promise<QueryModifyingResponse<T> | QueryResponseError /*{ rowCount: number, rowsEffected: T[]}*/> => {
        try {
            return await runModifyingQuery<T>(query, params);
        } catch (err) {
            console.log(err)
            const error = new IClofyUnknownError({
                message: 'An error occured',
                type: 'internal_error'
            })

            return {error}
            
        }
    }
}

export default runQuery;