const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");


module.exports = {
  getProfile: async (req, res) => {
    try {
      //Find any pending order(s)
      const pendingOrder = await Post.find({ orderStatus: "pending"});

      //Find any completed order(s)
      const completedOrder= await Post.find({ orderStatus: "complete"})

      //Send pending and completed order(s) to the EJS..
      res.render("profile.ejs", { pendingOrder: pendingOrder, completedOrder: completedOrder});
    } catch (err) {
      console.log(err);
    }
  },
  

  getPost: async (req, res) => {
    try {
      //Find query parameter and sends post.ejs file once match is found..
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },


  createPost: async (req, res) => {
    console.log(req.body)
    try {
    //Use post schema in models to create and save a document to Mongo DB Atlas
      await Post.create({
        order: req.body.drink,
        size: req.body.size,
        customerName:req.body.customerName
      });
      console.log("Post has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },

  // Finds ID that matches 
  fulfillOrder: async (req, res) => {
    console.log(req.user)
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
    ///Update order from pending to complete!
    //Match unfulfilled order w/ barista who checked it off as completed!
        {
          orderStatus: "complete" ,
          assignedBarista: req.user.userName
        }
      );
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },

  // Deletes Order
  deleteOrder: async (req, res) => {
    try {
     await Post.remove({ _id: req.params.id });
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
