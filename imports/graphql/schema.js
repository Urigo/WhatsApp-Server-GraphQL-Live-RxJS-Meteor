export default `
  # Entities

  type Chat {
    createdAt: DateTime!
    id: ID!
    members(filter: MemberFilter): [Member!]!
    messages(last: Int): [Message!]!
  }

  type Message {
    author: Member
    chat: Chat
    content: String!
    createdAt: DateTime!
    id: ID!
  }

  type Member {
    chats(filter: ChatFilter, first: Int): [Chat!]
    createdAt: DateTime!
    id: ID!
    messages: [Message!]
    name: String!
    title: String
  }

  
  
  # Subscription payloads

  type MessageSubscriptionPayload {
    node: Message
  }

  type ChatSubscriptionPayload {
    node: Chat
    previousValues: ChatPreviousValues
  }

  
  
  # Subscription filters
  
  input MessageSubscriptionFilter {
    AND: [MessageSubscriptionFilter!]
    mutation_in: [_ModelMutationType!]
    node: MessageSubscriptionFilterNode
  }

  input ChatSubscriptionFilter {
    AND: [ChatSubscriptionFilter!]
    mutation_in: [_ModelMutationType!]
    node: ChatSubscriptionFilterNode
  }


  
  # Subscription filter nodes

  input MessageSubscriptionFilterNode {
    chat: ChatFilter
  }

  input ChatSubscriptionFilterNode {
    members_some: MemberFilter
  }



  # Subscription payload values
  
  type ChatPreviousValues {
    id: ID!
  }


  
  # Entity Filters

  input ChatFilter {
    id: ID
    id_in: [ID!]
    members_some: MemberFilter
  }

  input MemberFilter {
    id: ID
    id_not: ID
    name_contains: String
  }

  input MessageFilter {
    chat: ChatFilter
  }

  
  
  # Common

  enum _ModelMutationType {
    CREATED
    UPDATED
    DELETED
  }

  enum OrderBy {
    createdAt_DESC
  }

  scalar DateTime
  
  # Root types

  type Query {
    allChats(filter: ChatFilter): [Chat]
    allMessages(filter: MessageFilter): [Message]
    allMembers(filter: MemberFilter, first: Int): [Member]
    Chat(filter: ChatFilter): Chat
  }

  type Mutation {
    createChat(membersIds: [ID!]!): Chat
    deleteChat(id: ID!): Chat
    createMessage(authorId: ID, chatId: ID!, content: String!): Message
  }

  type Subscription {
    Message(filter: MessageSubscriptionFilter): MessageSubscriptionPayload
    Chat(filter: ChatSubscriptionFilter): ChatSubscriptionPayload
  }

  schema {
    query: Query,
    mutation: Mutation,
    subscription: Subscription
  }
`