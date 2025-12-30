const { default: z } = require("zod");

const addProductSchema = z.object({
    name : z
        .string()
        .min(4)
        .max(30),
    stock : z
        .int()
        .optional(),
    description : z
        .string()
        .optional()
})

module.exports = {
    addProductSchema
}