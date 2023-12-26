var express = require('express');
const {
  createTopic,
  readTopic,
  updateTopic,
  deleteTopic,
  searchTopic,
} = require('../repository/topic');
const { getPosts } = require('../repository/post');

var router = express.Router();

// topic 검색
router.get('/', async (req, res) => {
  const query = req.query.query;
  try {
    const result = await searchTopic(query);
    const list = result.map((item) => item.content);
    res.status(200).send({ searchResult: list });
  } catch (error) {
    console.log(error);
  }
});

// topic 작성
router.post('/', async function (req, res) {
  const { title, content } = req.body;
  await createTopic(title, content);
  res.status(200).send('ok');
});

// 
router.get('/:topicId', async function (req, res, next) {
  const result = {};
  const topic = (await readTopic(req.params.topicId))[0];
  result.title = topic.dataValues.title;
  result.content = topic.dataValues.content;
  if (topic) {
    const posts = await getPosts(req.params.topicId);
    const postValues = posts.map((post) => post.dataValues);
    result.posts = postValues;
    res.status(200).send(result);
  } else {
    res.status(400).json({ msg: 'no topic found' });
  }
});

router.put('/:topicId', async (req, res, next) => {
  const id = req.params.topicId;
  if (await readTopic(id)) {
    const { title, content } = req.body;
    const topic = await updateTopic(id, title, content);
    res.status(200).send('ok');
  } else {
    res.status(400).json({ msg: 'no topic found' });
    res.redirect('/');
  }
});

router.delete('/:topicId', async (req, res) => {
  const topic = await deleteTopic(req.params.topicId);
  res.status(200).send('ok');
});

module.exports = router;
