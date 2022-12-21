import mongoose from "mongoose";

export const mensajesSchema = new mongoose.Schema({

    author: {
            id: {
                type: String,
                required: true,
            },
            nombre: {
                type: String
            },
            apellido: {
                type: String
            },
            edad: {
                type: Number
            },
            alias: {
                type: String
            },
            avatar: {
                type: String
            },
        },
    text: {
        type: String,
        required: true,
    },
});
