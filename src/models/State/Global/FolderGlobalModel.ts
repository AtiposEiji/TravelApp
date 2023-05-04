import { FolderStateModel } from "../FolderStateModel";

export class FolderGlobalModel extends Object {
    constructor() {
        super();
        this.FolderList = new Array<FolderStateModel>();    
    }

    FolderList!: FolderStateModel[]; 
}
