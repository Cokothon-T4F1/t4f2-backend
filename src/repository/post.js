const { Post } = require('../../models/index');

async function createPost(content, mail, topic_id) {
  try {
    const post = await Post.create({
      content: content,
      user_mail: mail,
      created_time: Date.now(),
      topic_id: topic_id,
      edited: false,
    });
    return post;
  } catch (error) {
    throw error;
  }
}

async function readPost(id) {
  try {
    const post = await Post.findAll({ where: { id: id } });
    return post;
  } catch (error) {
    throw error;
  }
}

async function getPosts(topic_id, limit = 10) {
  try {
    const post = await Post.findAll({
      where: { topic_id: topic_id },
      limit: limit,
    });
    return post;
  } catch (error) {
    throw error;
  }
}

async function updatePost(id, title, content) {
  try {
    const post = await Post.update(
      { title: title, content: content, edited: true },
      {
        where: {
          id: id,
        },
      }
    );
    return post;
  } catch (error) {
    throw error;
  }
}

async function deletePost(id) {
  try {
    const post = await Post.destroy({ where: { id: id } });
    return post;
  } catch (error) {
    throw error;
  }
}

module.exports = { createPost, readPost, updatePost, deletePost, getPosts };
