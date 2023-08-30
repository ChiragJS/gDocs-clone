const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email : String,
    password: String,
    docs : [{type : mongoose.Schema.Types.ObjectId,
    ref: 'Docs' }]

})
 const docSchema = new mongoose.Schema({
    docData : String,
    dccAccess : [{type : mongoose.Schema.Types.ObjectId,
    ref : 'User'}]
});
 
const linkSchema = new mongoose.Schema({
    documentId : {type: mongoose.Schema.Types.ObjectId,
    ref : 'Docs'},
    viewableLink : {type : String,
    unique : true},
    editableLink : {
        type : String,
        unique : true
    }
});
const User = mongoose.model('User',userSchema);
const Docs = mongoose.model('Docs',docSchema);
const Links = mongoose.model('Links',linkSchema);
module.exports={
    User,
    Docs,
    Links
}
