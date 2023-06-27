const dotenv = require('dotenv');
const User = require('../../model/user.model');
dotenv.config();

class UsersController {
  // [GET] /users
  async index(req, res) {
    try {
      const user = await User.findAll();
      return res.json(user);
    } catch (error) {
      console.log('ERROR:', error.message);
    }
  }

  // [POST] /users/update
  async update(req, res) {
    const id = req.params.id;
    const updatedEmail = req.body.email;

    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found!' });
        }
        user.email = updatedEmail;
        console.log('thanh cong');
        return user.save();
      })
      .then((result) => {
        return res.status(200).json({ message: 'User updated!', user: result });
      })
      .catch((err) => console.log(err));
  }

  async delete(req, res) {
    const id = req.params.id;
    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found!' });
        }
        return User.destroy({
          where: {
            userId: id,
          },
        });
      })
      .then((result) => {
        return res.status(200).json({ message: 'User deleted!' });
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new UsersController();
