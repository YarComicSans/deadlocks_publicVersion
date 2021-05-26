/* eslint-disable dot-notation */
import { MongoQuery } from './types'
import { Injectable, Query } from '@nestjs/common'

@Injectable()
export class Converter {
    convertODataToMongoQuery (odataQuery: typeof Query) : MongoQuery {
        try {
            const result: any[] = []
            const [column, direction] = odataQuery['$orderby']?.split(',')
            const mongoColumn = this.convertColumnNameFromDtoToMongo(column)
            const mongoDirection = this.convertDirectionFromDtoToMongo(direction)
            if (mongoColumn && mongoDirection) result.push({ $sort: { [mongoColumn]: mongoDirection } })

            const skip = odataQuery['$skip']
            if (skip) result.push({ $skip: Number(skip) })

            const limit = odataQuery['$top']
            if (limit) result.push({ $limit: Number(limit) })

            return result
        } catch (error) {
            return [{ $sort: { _id: 1 } }, { $skip: 0 }, { $limit: 5 }]
        }
    }

    private convertColumnNameFromDtoToMongo (column: string) {
        return column === 'id' ? '_id' : column
    }

    private convertDirectionFromDtoToMongo (direction: string) {
        return direction === 'asc' ? 1 : -1
    }
}
