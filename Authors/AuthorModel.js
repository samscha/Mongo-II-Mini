const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
    // lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
    // lowercase: true,
  },
  createdOn: { type: Date, default: Date.now },
});

AuthorSchema.virtual('fullName').get(_ => {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
