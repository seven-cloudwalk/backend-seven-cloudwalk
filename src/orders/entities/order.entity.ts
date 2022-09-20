import { OrderDetails } from "@prisma/client";

export class Orders {
    id?:    string;
    userId: String ;
    details: OrderDetails[];
    createdAt?: Date;
    updatedAt?: Date;
}
