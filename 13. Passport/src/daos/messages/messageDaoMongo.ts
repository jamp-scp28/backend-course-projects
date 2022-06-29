import { mongoCRUD } from "../../containers/mongoCRUD";

export class messageDaoMongo extends mongoCRUD{
    constructor(conn: any){
        super(conn.models.messages)
    }
}