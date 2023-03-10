import mongoose from "mongoose";

export default class MongoBaseRepository {
  constructor(collectionName, docSchema) {
    this.collection = mongoose.model(collectionName, docSchema);
  }

  async getAll() {
    try {
      const all = await this.collection.find({});
      return all;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getOne(id) {
    try {
      const one = await this.collection.findById(id);
      return one;
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(doc) {
    //console.log(doc);
    try {
      const newDoc = await this.collection.create(doc);
      return newDoc;
    } catch (err) {
      throw new Error(err);
    }
  }

  async saveMany(docs) {
    try {
      //console.log('saving many docs...')
      const newDocs = await this.collection.insertMany(docs);
      return newDocs;
    } catch (err) {
      console.log(err)
      throw new Error(err);
    }
  }

  async update(id, doc) {
    try {
      const updatedDoc = await this.collection.findByIdAndUpdate(id, doc);
      return updatedDoc;
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const deletedDoc = await this.collection.findByIdAndDelete(id);
      return deletedDoc;
    } catch (err) {
      throw new Error(err);
    }
  }
}


