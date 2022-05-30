import FileContainerClass from '../../containers/fileCRUD';

class carDaoFile extends FileContainerClass {
    constructor(){
        super('./db/cars.json');
    }
}

export default carDaoFile;
