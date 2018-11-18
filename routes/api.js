var ObjectID = require('mongodb').ObjectID;
let DAO = require('../service/db');


module.exports = function (app, client) {
    let dao = new DAO(client);

    app.get('/document/not-posted', (req, res) => {
        console.log("non post")
        dao.getNotPostedDocument()
            .then(document => {
                console.log(document)
                res.send(document);
                dao.update({...document, posted: true})
            })
            .catch(e => res.send(e))
    });

    app.get('/document/:id', (req, res) => {
        const id = req.params.id;
        dao.readById(id)
            .then(item => {
                res.send(item)
            })
            .catch(e => res.send(e))
    });

    app.post('/document', (req, res) => {
        const document = req.body;
        dao.create(document)
            .then(msg => res.send(msg))
            .catch(e => res.send(e))
    });

    app.post('/documents', (req, res) => {
        console.log(req.body)
        const documents = req.body;
        dao.createMany(documents)
            .then(msg => res.send(msg))
            .catch(e => res.send(e))
    });

};