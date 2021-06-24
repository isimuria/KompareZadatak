const mongoose = require('mongoose')

var PostPerson = mongoose.model('PostPerson',
{
    ime : {type:String},
    prezime : {type:String},
    email : {type:String}
},'postPersons')

module.exports = { PostPerson}