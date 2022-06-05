import mongoCRUD from "../../containers/mongoCRUD.js";

class carDaoMongo extends mongoCRUD{
    constructor(conn){
        super(conn.models.cars);
    }
}

export default carDaoMongo;