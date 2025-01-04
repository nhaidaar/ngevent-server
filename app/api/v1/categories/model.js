const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let categorySchema = Schema(
    {
        name: {
            type: String,
            minLength: [3, 'Nama kategori minimal 3 karakter!'],
            maxLength: [20, 'Nama kategori maksimal 3 karakter!'],
            required: [true, 'Nama kategori harus diisi!'],
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model('Category', categorySchema);