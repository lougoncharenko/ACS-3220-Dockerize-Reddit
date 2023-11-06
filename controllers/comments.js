const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;
// const Post = require('../models/post');
// const Comment = require('../models/comment');

// module.exports = (app) => {
//   // CREATE Comment
//   app.post('/posts/:postId/comments', (req, res) => {
//     if(req.user){

//       //const userId = req.user._id;
//       const comment = new Comment(req.body);
//       comment.author = req.user._id;

//       comment
//         .save()
//         .then(() => Post.findById(req.params.postId))
//         .then((post) => {
//           post.comments.unshift(comment);
//           return post.save();
//         })
//         .then(() => res.redirect('/'))
//         .catch((err) => {
//           console.log(err);
//         });

//     } else {
//       return res.send(401); // UNAUTHORIZED
//     }
//   });
// };

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    const sanitizedString = req.sanitize(comment.propertyToSanitize);
    
    sanitizedString
      .save()
      .then(() => Promise.all([
        Post.findById(req.params.postId),
      ]))
      .then(([post]) => {
        post.comments.unshift(sanitizedString);
        return Promise.all([
          post.save(),
        ]);
      })
      .then(() => res.redirect(`/post-show/${req.params.postId}`))
      .catch((err) => {
        console.log(err);
      });
  });
};