export type MongoQuery = {
    [index: number] : any;
};

type DeadlockDto = {
    id: string,
    date: string,
    deadlock: any,
}

export type DeadlocksDto = {
    deadlocks: DeadlockDto[],
    totalCount: number,
};
