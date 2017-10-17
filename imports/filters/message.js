import { filters } from './utils';
import { chatFilter } from './chat';

const filterMap = {
  chat: (val) => {
    const q = chatFilter({}, val);

    if (q._id) {
      return {
        chat: q._id
      };
    }
  }
}

export function messageFilter(selector, filter) {
  if (filter) {
    return filters(selector, filter, filterMap);
  }
  return selector;
}
