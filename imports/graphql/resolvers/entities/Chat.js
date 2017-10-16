export default {
  id: r => r._id,
  members: (r, args) => r.getMembers(args),
  messages: (r, args) => r.getMessages(args),
};
