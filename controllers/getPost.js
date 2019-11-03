const Post = require('../database/model/Post')

module.exports = async(req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("post", {
        post
    });
}