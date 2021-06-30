const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://basma:mamabasma@cluster0.nsvrl.mongodb.net/pfe?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('we are connected to database !')
    })
    .catch(() => {
        console.log("connetion ERROR !")

    })

module.exports = mongoose