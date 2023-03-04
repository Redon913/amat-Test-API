class ErrorService {
    ErrorService() { }


    static randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    static simulateRandomDatabaseDown() {
        if (this.randomNum(1, 6) === 5) {
            throw new Error("Fruit Database down lost connection");
        }
    }


    static simulatePaymentProcessingDown() {
        if (this.randomNum(1, 6) === 5) {
            throw new Error("Apple pay is down!");
        }
    }


    static simulateExpiredToken() {
        if (this.randomNum(1, 6) === 5) {
            throw new _SecurityError("You are logged out you need to relogin!");
        }
    }


    static throwOutOfStockError(fruit) {
        throw new _OutOfStockError(`we are out of ${fruit}`);
    }
}


class _OutOfStockError extends Error {
    constructor(...params) {
        super(...params);


        this.name = "OutOfStockError";
    }
}


class _SecurityError extends Error {
    constructor(...params) {
        super(...params);


        this.name = "SecurityError";
    }
}


module.exports = ErrorService;