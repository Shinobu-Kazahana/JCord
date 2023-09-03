import {Server,Member,Profile} from '@prisma/client'


export type ServerWithMembersWithProfile = Server & {
    member:(Member & {profile:Profile})[]
}