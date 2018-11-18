var ObjectID = require('mongodb').ObjectID;
const config = require('../config/config');


module.exports = class DAO {
    constructor(client) {
        this.db = client.db(config.DB_NAME);
        this.collection = this.db.collection(config.COLLECTION);
    }

    readById(id) {
        const details = {'_id': id};
        return this.collection.findOne(details)
            .then(result => result)
            .catch(e => ({'error': 'An error has occurred\n' + e}));
    }

    create(document) {
        console.log(document)
        return this.collection.insertOne(document)
            .then((result) => result)
            .catch(e => {
                console.error(e);
                return {'error': 'An error has occurred\n' + e}
            });
    }

    update(document){
        let updatedDocument = { $set: document };
        let query = { _id: document._id };
        return this.collection.updateOne(query, updatedDocument)
            .then(result => result)
            .catch(e => {
                console.error(e);
                return {'error': 'An error has occurred\n' + e}
            });
    }

    createMany(documents) {
        return this.collection.insertMany(documents)
            .then(() => ('All documents was inserted'))
            .catch(e => ({'error': 'An error has occurred\n' + e}));
    }

    getNotPostedDocument(){
        return this.collection.findOne({posted: false})
            .then(document => document)
            .catch(e => ({'error': 'An error has occurred\n' + e}));
    }
};
