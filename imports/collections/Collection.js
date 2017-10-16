import { Mongo } from 'meteor/mongo';

export class Collection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    return super.insert(doc, callback);
  }
}
