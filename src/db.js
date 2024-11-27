import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI no está definida en las variables de entorno.');
        }
        // Conexión sin opciones deprecadas
        await mongoose.connect(uri);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};
