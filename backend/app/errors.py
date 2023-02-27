from flask import jsonify


def bad_request_error(error):
    return jsonify({
        "error": str(error.description)
    }), 400
