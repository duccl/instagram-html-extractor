import {readFileSync} from 'fs'
import { autobind } from "core-decorators";

@autobind
export class Reader{
    private file:string;

    constructor(file: string){
        this.file = file
    }

    read_all_content(){
        return readFileSync(this.file).toString()
    }
}