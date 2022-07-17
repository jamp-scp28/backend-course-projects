import {mongoCRUD} from "../../containers/mongoCRUD";

export class productDaoMongo extends mongoCRUD{
    constructor(conn: any){
        console.log(conn);
        
        super(conn.models.products);
    }
}
