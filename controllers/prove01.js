const prove01Get = (req, res, next) => {
    res.render('pages/prove01');
    return res.end();
}

const prove01Post = (req, res, next) => {
    const userData = req.body.userInput;
    res.render('pages/prove01Input', {userInput: userData});
}

module.exports = {
    get: prove01Get,
    post: prove01Post
};
