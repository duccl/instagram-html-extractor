import { autobind } from "core-decorators";
import axios from 'axios';

@autobind
export class Requestor{
    Get_Instagram_Post = (baseURL:string) =>
        axios({method:'GET',baseURL}).then(({ status, data, }) => 200 === status ? data : null);
}