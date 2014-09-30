import sqlite3
import os

application_path = os.path.dirname(__file__)
dbFilePath = os.path.join(application_path, 'db.db')
print dbFilePath

_conn = sqlite3.connect(dbFilePath, check_same_thread=False)
_conn.row_factory = sqlite3.Row
_cursor = _conn.cursor()

class TodoModel:
    def __init__(self):
        pass

    @classmethod
    def add_item(cls, item):
        _cursor.execute('INSERT INTO todo(text) VALUES(?)', (item, ))
        _conn.commit()

    @classmethod
    def retrieve_last_N_items(cls, n):
        rows = _cursor.execute(
            'SELECT text FROM todo ORDER BY id DESC LIMIT ?', (n, )
        )
        return [r['text'] for r in rows]
