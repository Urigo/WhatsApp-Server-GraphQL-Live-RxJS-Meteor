import { filters } from './utils';

const filterMap = {
  id: val => ({
    _id: val
  }),
  id_not: val => ({
    _id: { $ne: val }
  }),
  name_contains: val => ({
    name: {
      $regex: new RegExp(`${val}`, 'i')
    }
  })
};

export function memberFilter(selector, filter) {
  if (filter) {
    return filters(selector, filter, filterMap);
  }
  return selector;
}
