const mongoose = require('mongoose');
const Post=require("./database/model/Post");



mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});


Post.create({
	title:"My first poject",
	description:" He llo j jsdk s",
	content:" some nice contetn"
}, (err,post) => {
    console.log(err,post);
});