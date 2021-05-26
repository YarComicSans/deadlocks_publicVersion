import dotenv from 'dotenv'
import path from 'path'

export class Config {
    public username?: string;
    public password?: string;
    public host?: string;
    public isValid: boolean;
    public exportPath?: string

    constructor () {
        const parser = dotenv.config({ path: path.join(__dirname, '../config.env') })
        if (!parser.error) {
            const config: any = parser.parsed
            this.username = config.username
            this.password = config.password
            this.host = config.host
            this.exportPath = config.exportPath
        }
        this.isValid = !!this.username && !!this.password && !!this.host && !!this.exportPath
    }

    public showHelpMessage = () => {
        console.log('This programm requieres the following options:')
        console.log(' * username - domain name used to access outlook')
        console.log(' * password - domain password')
        console.log(' * host - exchange server address')
        console.log(' * exportPath - path to directory for savinng deadlock filess')
        console.log('You can add these options to a config.env file or pass as args on node start')
    }
}

export default new Config()
