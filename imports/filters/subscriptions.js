export const subscriptionFilter = (payload, {filter}) => {
  if (!payload) {
    return false;
  }

  return filter.AND.every((expected) => {
    if (expected.mutation_in) {
      return mutationFilter(payload.Message || payload.Chat, expected);
    }

    if (expected.node) {
      if (payload.Message) {
        return messageNodeFilter(payload.Message, expected.node);
      }
      
      if (payload.Chat) {
        return chatNodeFilter(payload.Chat, expected.node);
      }
    }

    return false;
  });
}

// mutation_in
export const mutationFilter = (payload, expected) => {
  return expected.mutation_in.includes(payload.in_mutation);
};

// node
export const messageNodeFilter = (payload, expected) => {
  if (expected.chat.id) {
    return payload.node.chat === expected.chat.id;
  }

  if (expected.chat.id_in) {
    return expected.chat.id_in.includes(payload.node.chat);
  }

  return false;
};

// node
export const chatNodeFilter = (payload, expected) => {
  return payload.members.includes(expected.members_some.id);
};

