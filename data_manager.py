import database_common


@database_common.connetion_handler
def get_user(cursor, userName):
    query = f'''
            SELECT *
            FROM "user"
            WHERE user_name = %(un)s
            '''
    cursor.execute(query, ({'un': userName}))
    return cursor.fetchone()


@database_common.connetion_handler
def add_user(cursor, userName, PassWord):
    query = f'''
            INSERT INTO "user" (user_name, password)
            VALUES ( %(un)s, '{PassWord}') 
            '''
    cursor.execute(query, ({'un': userName}))
