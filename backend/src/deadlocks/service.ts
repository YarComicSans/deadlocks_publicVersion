import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { Deadlock } from './documents/deadlock'
import { IDeadlock } from './interfaces/deadlock'
import { DeadlocksDto, MongoQuery } from './types'
import * as queries from './queries'

@Injectable()
export class DeadlocksService {
    // eslint-disable-next-line no-useless-constructor
    constructor (@Inject('DEADLOCK_MODEL') private readonly deadlockModel: Model<Deadlock>) {}

    async GetData (deadlocksFacetQuery: MongoQuery) : Promise<DeadlocksDto> {
        const query = queries.createGetDeadlocksQuery(deadlocksFacetQuery)
        const response = await this.deadlockModel.aggregate(query)

        const deadlockObjects = response[0].deadlocks.map(deadlock => {
            return { id: deadlock._id, date: deadlock.date, data: deadlock.data }
        })
        const count = response[0].totalCount[0].deadlocksCount
        return {
            deadlocks: deadlockObjects,
            totalCount: count
        }
    }

    async UpdateDeadlocks (deadlocks: IDeadlock[]) {
        deadlocks.forEach(async (deadlock) => {
            const query = queries.createUpdateDeadlockQuery(deadlock)
            await this.deadlockModel.updateOne(query.objectName, query.args, { upsert: true })
        })
    }
}
