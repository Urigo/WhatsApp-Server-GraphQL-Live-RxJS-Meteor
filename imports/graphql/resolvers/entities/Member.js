export default {
  id: r => r._id,
  chats: (r, args) => r.getChats(args),
  messages: r => r.getMessages(),
};
