import mongoose from "mongoose";

export const mensajesSchema = new mongoose.Schema({

    autor: {
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
    texto: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
});
