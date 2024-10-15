const users=require('../Models/expense.user.model')

exports.create=(req,res)=>{
    const{userName,email,password}=req.body;
    const User=new users({
        userName,email,password
    })

    User.save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "something wrong",
        });
      });
}

exports.data = (req, res) => {
  users
    .find()
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Something wrong",
      });
    });
};