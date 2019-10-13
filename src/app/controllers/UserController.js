import UserMongo from '../schemas/UserMongo';

class UserController {
  async store(req, res) {
    const { celOwner, password, name } = req.body;

    const userExists = await UserMongo.findById(celOwner);

    if (userExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    const newUser = {
      _id: celOwner,
      name,
      password,
      lastConversation: [{ text: 'init', date: new Date('2019-01-01') }],
      avaliable: true,
    };

    UserMongo.create(newUser);

    return res.status(200).json(newUser);
  }
}

export default new UserController();
