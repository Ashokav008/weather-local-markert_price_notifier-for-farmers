const mongoose = require('mongoose')
    // mongodb+srv://admin:<password>@cluster0.zwwjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    // mongoose.connect('mongodb+srv://mediremainder:medi1234@cluster0.sw6sc.mongodb.net/MedicareDB', { useNewUrlParser: true }, (err) => {
mongoose.connect('mongodb+srv://admin:admin%40123@cluster0.zwwjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {

    if (!err) { console.log('MongoDB Connection Succeeded'); } else { console.log('Error in DB Connection: ' + err); }

});

require('./userModel');
// mongodb+srv://mediremainder:medi1234@cluster0.sw6sc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority