import { objectType, extendType, nonNull, stringArg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/auth";


/** AUTHPAYLOAD TYPE CREATED */
export const AuthPayload = objectType({
    name: "AuthPayload",
    definition(t) {
        t.nonNull.string("token");
        t.nonNull.field("user", {
            type: "User",
        });
    },
});


/** SIGNUP FLOW  */
export const AuthMutationSignUp = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("signup", {
            type: "AuthPayload",
            args: {
                name: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                const { email, name } = args;

                const password = await bcrypt.hash(args.password, 10);

                const user = await context.prisma.user.create({
                    data: { email, name, password },
                });
                console.log(user);
                const token = jwt.sign({ userId: user.id }, APP_SECRET);

                return {
                    token,
                    user,
                };
            },
        });
    },
});

/** LOGIN FLOW */
export const AuthMutationLogin = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("login", {
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                // 1
                const user = await context.prisma.user.findUnique({
                    where: { email: args.email },
                });
                if (!user) {
                    throw new Error("No such user found");
                }

                // 2
                const valid = await bcrypt.compare(
                    args.password,
                    user.password,
                );
                if (!valid) {
                    throw new Error("Invalid password");
                }

                // 3
                const token = jwt.sign({ userId: user.id }, APP_SECRET);

                // 4
                return {
                    token,
                    user,
                };
            },
        });
    }
});