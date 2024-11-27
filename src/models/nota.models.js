import mongoose from 'mongoose';

const notaSchema = new mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  asignatura: {
    type: String,
    required: true,
  },
  calificacion: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
}, { timestamps: true });

const Nota = mongoose.model('Nota', notaSchema);

export default Nota;
