import { DocTypeInterface } from "./doc-type-interface";

export interface EnabledNotificationInterface {
    id : number;
    registryToken : string;
    number : string;
    email : string;
    viaEmail : boolean;
    viaPush : boolean;
    docType : DocTypeInterface;
}
