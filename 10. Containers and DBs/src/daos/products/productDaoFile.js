import FileContainerClass from "../../containers/fileCRUD";

class ProductsDaoFile extends FileContainerClass{
    constructor(){
        super('./db/products.json')
    }
}

export default ProductsDaoFile;