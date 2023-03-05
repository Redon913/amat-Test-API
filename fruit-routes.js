
const express = require("express");
const CartService = require("./cart-service");
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
                .catch(err => {
                    res.json({
                        error: {
                            name: err.name,
                            message: err.message,
                        },
                    });
                })
        });

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
                    res.json({
                        error: {
                            name: err.name,
                            message: err.message,
                        },
                    });
                })
        });

        fruitRouter.post('/checkout', (req, res) => {
            const param = req.body;
            CartService.purchase(param)
                .then(rs => {
                    if (!rs) {
                        throw new _InsufficientBalance('Your Bill Amount Excided your Wallet Balance.');
                    }
                    res.json(rs);
                })
                .catch(err => {

                    res.json({
                        error: {
                            name: err.name,
                            message: err.message,
                        },
                    })
                })
        });

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

class _InsufficientBalance extends Error {
    constructor(...params) {
        super(...params);

        this.name = 'InsufficientBalance';
        this.statusCode = 404;
    }
}

module.exports = FruitRoutes;