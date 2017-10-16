export default {
  id: r => r._id,
  author: r => r.getAuthor(),
  chat: r => r.getChat(),
};
