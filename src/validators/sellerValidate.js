const { default: z } = require("zod");

const addSellerSchema = z.object({
    name : z
        .string()
        .min(3)
        .max(30),
    description : z
        .string()
        .optional()
})

module.exports = {
    addSellerSchema
}