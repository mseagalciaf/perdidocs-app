import { DocTypeInterface } from "./doc-type-interface";
import { UserInterface } from "./user-interface";

export interface DocumentInterface {
    docTypeId : DocTypeInterface;
    number : string;
    phone : string;
    user? : UserInterface;
}
