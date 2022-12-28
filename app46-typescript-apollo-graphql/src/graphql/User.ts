import { objectType, extendType } from "nexus";

/** TYPE USER CREATED */
export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.list.nonNull.field("links", {    // 1
            type: "Link",
            resolve(parent, args, context) {   // 2
                // RESOLVE LINKS OF THIS PARTICULAR USER FROM DB
                return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
            },
        });
    },
});

// /** GET USERS FLOW */
export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("users", {
            type: "User",
            resolve(parent, args, context, info) {
                return context.prisma.user.findMany();
            }
        });
    },
});