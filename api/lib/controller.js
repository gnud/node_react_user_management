class Controller {
    constructor(db) {
        this.db = db;
    }

    //region Controller Actions
    // noinspection JSUnusedLocalSymbols
    async handle(request, response) {}

    async handleRequest(request, response) {
        try {
            await this.handle(request, response);
        } catch (error) {
            await this.handleUnknownError(error, response);
        }
    }
    //endregion

    //region Error handlers

    async handleUnknownError(error, response) {
        let message = error && error.message || 'Request failed by unknown reason.';

        console.error(message);

        response.status(500);
        response.send({success: false, message: message});
    }

    async handleBadRequest(error, response) {
        let message = String(error) || 'Bad Request.';

        console.error(message);

        response.status(500);
        response.send({success: false, message: message});
    }

    async handleResourceNotFound(error, response) {
        let message = String(error) || 'Resource not found.';

        console.error(message);

        response.status(404);
        response.send({success: false, message: message});
    }

    //endregion
}

module.exports = Controller;
