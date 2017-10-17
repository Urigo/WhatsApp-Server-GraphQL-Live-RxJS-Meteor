import { Meteor } from 'meteor/meteor';

import { Members } from '/imports/collections/Members';
import { Chats } from '/imports/collections/Chats';
import { Messages } from '/imports/collections/Messages';

if (Members.find({}).count() !== 3) {
  Messages.remove({});
  Chats.remove({});
  Members.remove({});
  
  // Members
  const Kamil = Members.insert({name: 'Kamil Kisiela'});
  const Uri = Members.insert({name: 'Uri Goldshtein'});
  const Mary = Members.insert({name: 'Mary Smith'});

  // Messages
  function simpleChat(first, second) {
    return {
      messages: [
        Messages.insert({
          content: `Hi ${first.name}`,
          author: first.id,
        }),
        Messages.insert({
          content: `Hello ${second.name}!`,
          author: second.id,
        }),
      ],
      members: [
        first.id,
        second.id,
      ],
    };
  }

  // Chats
  const KamilUri = simpleChat(
    {id: Kamil, name: 'Kamil'},
    {id: Uri, name: 'Uri'}
  );
  const UriMary = simpleChat(
    {id: Uri, name: 'Uri'},
    {id: Mary, name: 'Mary'}
  );
  const MaryKamil = simpleChat(
    {id: Mary, name: 'Mary'},
    {id: Kamil, name: 'Kamil'}
  );

  [KamilUri, UriMary, MaryKamil]
    .forEach(chat => {
      const chatId = Chats.insert({
        members: chat.members
      });

      chat.messages.forEach(msgId => {
        Messages.update({_id: msgId}, {$set: {chat: chatId}});
      });
    });
}
