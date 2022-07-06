import { mongoCRUD } from "../../containers/mongoCRUD";

export class usersDaoMongo extends mongoCRUD{
    constructor(conn: any){
        super(conn.models.users)
    }
}