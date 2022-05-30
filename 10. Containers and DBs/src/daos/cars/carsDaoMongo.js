import mongoCRUD from "../../containers/mongoCRUD";
import cars from "../../containers/models/cars"

class carDaoMongo extends mongoCRUD{
    constructor(){
        super(cars);
    }
}

export default carDaoMongo;