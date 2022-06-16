import {mongoCRUD} from "../../containers/mongoCRUD";

export class carDaoMongo extends mongoCRUD{
    constructor(conn: any){
        super(conn.models.cars);
    }
}