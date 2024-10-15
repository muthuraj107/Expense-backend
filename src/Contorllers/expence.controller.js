const expense=require('../Models/expence.model')

exports.create=(req,res)=>{
    const{ date,
        category,
        amount,
        description,userId}=req.body;
        const Expense=new expense({
            date,
        category,
        amount,
        description,
        userId
      })
Expense.save().then((data)=>{
    res.status(201).send(data)
}).catch((err)=>{
    return res.status(500).send({
        message:err.message||'something wrong'
    })
})
    }
exports.data = (req, res) => {
  const { userId } = req.params; // Get userId from request parameters

  expense
    .find({ userId }) // Find expenses for the specified userId
    .then((expenses) => {
      res.send(expenses);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Something went wrong",
      });
    });
};
exports.delete=(req,res)=>{
    expense.findOneAndDelete({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found " + req.params.id });
      }
      res.send({ Message: "User Deleted Successfully!!!", data: user.data });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NOt Found") {
        return res
          .status(404)
          .send({ message: "User not found " + req.params.id });
      }
      return res.status(500).send({
        message: "Error getting user with id" + req.params.id,
      });
    });
}


exports.update = (req, res) => {
  const updateData = { ...req.body };
  expense
    .findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id" + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (!err.kind === "objectid") {
        return res.status(500).send({
          message: err.message || "user not found with id".req.params.id,
        });
      }
      return res.status(500).send({
        message: err.message || "Something went worng",
      });
    });
};