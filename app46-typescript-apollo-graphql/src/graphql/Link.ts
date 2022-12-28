import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";
import { Prisma } from '@prisma/client'

// TYPE "LINK" CREATED
export const Link = objectType({
    name: "Link", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("description"); // 4
        t.nonNull.string("url");
        t.field("postedBy", {
            type: "User",
            resolve(parent, args, context) {
                // RESOLVE POSTEDBY FOR THIS LINK FROM DB
                // parent.id refers to current link
                return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
            },
        });
    },
});

//GET ALL FEED
export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            resolve(parent, args, context, info) {
                const { userId } = context;
                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }
                try {
                    return context.prisma.link.findMany();
                    // throw Error("Something went wrong");
                }
                catch (e) {
                    if (e instanceof Prisma.PrismaClientKnownRequestError) {
                        // The .code property can be accessed in a type-safe manner
                        if (e.code === 'P2002') {
                            console.log(
                                'There is a unique constraint violation, a new user cannot be created with this email'
                            )
                        }
                    }
                    throw e
                }
            }
        });
    },
});

//GET ALL FEED BY ID
export const LinkQuery2 = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("feedByID", {
            type: "Link",
            args: {
                id: nonNull(intArg()),
            },
            async resolve(parent, args, context, info) {
                const { userId } = context;
                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }
                const { id } = args;
                const data = await context.prisma.link.findMany();
                return data.filter((link) => link.id === id)[0];
            }
        });
    },
});


// Inserting a new link 
export const LinkMutation = extendType({  // 1
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {  // 2
            type: "Link",
            args: {   // 3
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },

            resolve(parent, args, context) {
                const { description, url } = args;
                const { userId } = context;
                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }

                const newLink = context.prisma.link.create({   // 2
                    data: {
                        description: description,
                        url: url,
                        postedBy: { connect: { id: userId } },
                    },
                });
                return newLink;
            },
        });
    },
});
// updateLink
export const LinkMutationUpdate = extendType({  // 1
    type: "Mutation",
    definition(t) {
        t.nonNull.field("postupdate", {  // 2
            type: "Link",
            args: {   // 3
                id: nonNull(intArg()),
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },

            async resolve(parent, args, context) {
                const { userId } = context;
                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }
                const { id, description, url } = args;
                // const data = await context.prisma.link.findMany();
                const updatedLink = context.prisma.link.update({
                    where: { id: id },
                    data: {
                        description: description,
                        url: url
                    }
                });
                return updatedLink;
            },
        });
    },
});

// deleteLink
export const LinkMutationDelete = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("postdelete", {
            type: "Link",
            args: { id: nonNull(intArg()) },
            async resolve(parent, args, context) {
                const { userId } = context;
                if (!userId) {  // 1
                    throw new Error("Cannot post without logging in.");
                }
                const { id } = args;  // 4
                const link = await context.prisma.link.delete({
                    where: { id: id }
                });
                return link;
            },
        });
    },
});