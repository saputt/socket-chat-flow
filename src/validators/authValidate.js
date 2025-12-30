const { default: z } = require("zod");

const loginSchema = z.object({
    email : z
        .string()
        .min(1),
    password : z
        .string()
        .min(1)
})

const registerSchema = z.object({
    name : z
        .string("Name must be string")
        .min(3)
        .max(20),
    email : z
        .string("Email must be string")
        .email(),
    password : z
        .string("Password must be string")
        .min(5)
        .max(30)
})

module.exports = {
    loginSchema,
    registerSchema
}