import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'entregado'],
    default: 'pendiente',
  },
  nota: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Tarea', tareaSchema);
