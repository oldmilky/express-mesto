const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(err));

const getProfile = (req, res) => User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Id юзера не валидный' });
    }
    return res.status(500).send(err);
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Данные не прошли валидацию' });
      }
      return res.status(500).send(err);
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  // нашли значение у пользователя по id, обновили и отправили обратно
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).res.send({ message: 'Пользователя с данным ID нет в БД.' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Данные внесены некорректно.' });
      }
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден.' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  // нашли значение у пользователя по id, обновили
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
  // вернули
    .then((user) => {
      if (!user) {
        return res.status(404).res.send({ message: 'Пользователя с данным ID нет в БД.' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Данные внесены некорректно.' });
      }
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден.' });
    });
};

module.exports = {
  getUsers, getProfile, createUser, updateUser, updateAvatar,
};
