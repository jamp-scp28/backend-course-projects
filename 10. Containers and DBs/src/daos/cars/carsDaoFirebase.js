import firebaseCRUD from "../../containers/firebaseCRUD";

class carDaoFirebase extends firebaseCRUD{
    constructor(){
        super('cars');
    }
}

export default carDaoFirebase;