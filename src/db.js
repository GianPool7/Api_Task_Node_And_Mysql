import {createPool} from 'mysql2/promise'

const pool=createPool({
    host: 'localhost',      // o tu IP o dominio
    user: 'root',
    password: '123',
    //password: '1234',
    database: 'task_db',
})

export default pool;