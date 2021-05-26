import { IDeadlock } from './interfaces/deadlock'
import { MongoQuery } from './types'

export const createUpdateDeadlockQuery = (deadlock : IDeadlock) => ({
    objectName: { _id: deadlock._id },
    args: {
        $set: { _id: deadlock._id, date: deadlock.date, xml: deadlock.xml, data: deadlock.data }
    }
})

export const createGetDeadlocksQuery = (deadlocksQuery: MongoQuery) => (
    [
        {
            $facet: {
                deadlocks: deadlocksQuery,
                totalCount: [
                    {
                        $count: 'deadlocksCount'
                    }]
            }
        }
    ])
