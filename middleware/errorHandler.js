function errorHandler(err, req, res, next) {
    // Log the error stack for debugging
    console.error(err.stack);

    // Determine the status code
    const statusCode = err.status || 500;

    // Build the error response
    const response = {
        success: false,
        message: err.message || 'Internal Server Error',
    };

    // Include stack trace in development mode only
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    // Send the error response
    res.status(statusCode).json(response);
}

module.exports = errorHandler;