import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { gradesModel } from '../models/gradesModel.js';

const create = async (req, res) => {
  try {
    const newGrade = new gradesModel({
      name: req.body.name,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
      lastModified: new Date(),
    });
    newGrade.save();
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
  const search = await gradesModel.find(condition);
  console.log('teste busca rolando...');
  res.send(search);
  try {
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  const grade = await gradesModel.findById({ _id: id });
  res.send(grade);
  try {
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  const id = req.params.id;
  const dataUpdate = { ...req.body, lastModified: new Date() };

  const updateGrade = await gradesModel.findOneAndUpdate(
    { _id: id },
    { $set: dataUpdate },
    { new: true }
  );
  console.log(req.body);
  res.send(updateGrade);
  // res.send(req.body);
  try {
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  const removedGrade = await gradesModel.findOneAndDelete({ _id: id });

  res.send(removedGrade);
  try {
    logger.info(`DELETE /grade - ${id}`);
    res.send('delete id ' + id);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    await gradesModel.deleteMany({});
    logger.info(`DELETE /grade`);
    res.send('Todas as grades deletadas com sucesso');
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
