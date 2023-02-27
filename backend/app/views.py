from bson import ObjectId
from flask import jsonify, request

from app import app, mongo


@app.route('/api/todos', methods=["GET"])
def index():
    todos = list(mongo.db.todos.find())

    formatted_todos = []
    for todo in todos:
        todo['id'] = str(todo['_id'])
        del todo['_id']

        formatted_todos.append(todo)

    return jsonify(formatted_todos)


@app.route('/api/todos', methods=["POST"])
def add_todo():
    data = request.get_json()

    todo_id = mongo.db.todos.insert_one({
        'title': data.get('title'),
        'completed': False
    }).inserted_id

    todo = {
        'title': data.get('title'),
        'id': str(todo_id),
        'completed': False
    }

    return jsonify(todo)


@app.route('/api/todos/<todo_id>', methods=["DELETE"])
def delete_todo(todo_id):
    result = mongo.db.todos.delete_one({'_id': ObjectId(todo_id)})

    if result.deleted_count == 1:
        return jsonify({'success': True})
    else:
        return jsonify({'message': 'Todo not found'})


@app.route('/api/todos/<todo_id>', methods=["PUT"])
def edit_todo(todo_id):
    data = request.get_json()

    mongo.db.todos.update_one({'_id': ObjectId(todo_id)},
                              {'$set': {'title': data.get('title'), 'completed': data.get('completed')}})

    return jsonify({'success': True})
