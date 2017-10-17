export const filters = (selector, filterObj, filterMap) => {
  let prepared = { ...selector };
  
  Object.keys(filterObj).forEach(name => {
    const fn = filterMap[name];
    const val = filterObj[name];
    const update = val && fn && fn(val);

    if (update) {
      prepared = {
        ...prepared,
        ...update
      };
    }
  });

  return prepared;
}