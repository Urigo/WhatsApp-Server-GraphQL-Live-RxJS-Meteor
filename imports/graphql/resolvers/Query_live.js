export default {
    allChats: (r, args, ctx) => ctx.ChatsReactive.all(args),
    allMessages: (r, args, ctx) => ctx.MessagesReactive.all(args),
    allMembers: (r, args, ctx) => ctx.MembersReactive.all(args),
    Chat: (r, args, ctx) => ctx.ChatsReactive.single(args),
};
