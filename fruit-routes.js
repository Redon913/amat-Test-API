
const express = require("express");
const FruitService = require("./fruit-service");


class FruitRoutes {


    /**
     * Setups the routes for fruit related REST api calls
     */
    static setup(root) {
        const fruitRouter = express.Router();

        fruitRouter.get('/getAllFruits', function (req, res) {
            FruitService.getAllFruits()
                .then(rs => res.json(rs))
                .catch(err => res.send(err.message))
        })

        fruitRouter.get('/getFruit/:fruit', (req, res) => {
            let fruitName = req.params.fruit;
            FruitService.getFruit(fruitName)
                .then(rs => {
                    if (!rs) {
                        throw new _FruitNotExists('No such fruit exists.');
                    }
                    res.json(rs);
                })
                .catch(err => {
                    res.sendStatus(err.statusCode);
                })
        })


        root.use(fruitRouter);
    }
}

class _FruitNotExists extends Error {
    constructor(...params) {
        super(...params);

        this.name = 'FruitNotExists';
        this.statusCode = 404;
    }
}

module.exports = FruitRoutes;