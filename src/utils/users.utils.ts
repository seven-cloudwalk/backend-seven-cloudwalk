import { Users } from "@prisma/client";


export function isAdmin(user: Users): boolean {

    return ( user ? user.role : false )

}