import * as convert from 'xml-js'
import * as jsonpath from 'jsonpath'
import { Injectable } from '@nestjs/common'
import { IDeadlock } from '../interfaces/deadlock'

@Injectable()
export class Parser {
    private ParseDeadlockFromXml (xml : any): IDeadlock {
        const jsonString = convert.xml2json(xml, { compact: true })
        const json = JSON.parse(jsonString)
        const victim = jsonpath.query(json, '$..victimProcess..id')[0]
        const lasttransactionDate = jsonpath.query(json, '$.deadlock..lasttranstarted')[0]
        const id = `${victim}_${lasttransactionDate}`
        return { _id: id, date: lasttransactionDate, xml: xml, data: json }
    }

    ParseDeadlocksFromXmls (xmls : any[]) : IDeadlock[] {
        const deadlocks = xmls.map(xml => this.ParseDeadlockFromXml(xml))
        return deadlocks
    }
}
