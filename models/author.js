const mongoose = require('mongoose');
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }
    if (!this.first_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
    return `/catalog/author/${this._id}`;
});

// Virtual for author date of birth formatted
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

// Virtual for author date of birth formatted
AuthorSchema.virtual("date_of_death_formatted").get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

// Virtual for authors lifespan (birth - death)
AuthorSchema.virtual("lifespan").get(function () {
    return `${this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : ''} - ${this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : ''}`
})

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
