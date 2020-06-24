import { isFunction } from 'util';

export class CollectionUtilities {

  static removeItemsByFilter<T>(collection: T[],
    filterFunc: (value: T) => boolean): number {

    if (!filterFunc) throw Error("filterFunc is not supplied");
    if (!isFunction(filterFunc)) throw Error("filterFunc is not a Function");

    if (!collection || collection.length === 0) {
      return 0;
    }

    let count = 0;
    for (let i = collection.length - 1; i >= 0; i--) {
      let item = collection[i];

      if (filterFunc(item)) {
        collection.splice(i, 1);
        count++;
      }
    }
    return count;
  }
}
