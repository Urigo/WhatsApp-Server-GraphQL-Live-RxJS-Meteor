import { filters } from './utils';
import { memberFilter } from './member';

const filterMap = {
  id: val => ({
    _id: val
  }),
  id_in: val => ({
    _id: { $in: val }
  }),
  members_some: (val) => {
    const q = memberFilter({}, val);

    if (q._id) {
      return {
        members: q._id
      };
    }
  }
}

export function chatFilter(selector, filter) {
  if (filter) {
    return filters(selector, filter, filterMap);
  }
  return selector;
}