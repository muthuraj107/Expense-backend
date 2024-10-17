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
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Login successful, return user data (excluding password)
    res.send({
      id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
};
