import pool from '../db.js'

export const users=async(req,res)=>{

    try {

        //res.send("mostrando todos los usuarios");
        const [users]=await pool.query("SELECT * FROM users")
        res.json(users);

    } catch (error) {
        console.error("Error al obtener usuarios:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }


}

export const userId=async(req,res)=>{

    try {
       
        const {id}=req.params;
        const [user]=await pool.query("SELECT * FROM users WHERE id=?",[id])
        res.send(user);
 
    } catch (error) {
        console.error("Usuario no encontrado:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }
}

export const addUsers=async(req,res)=>{

    try {
        const {name,lastName,birthdate,email,password}=req.body;
        const [result]=await pool.query("INSERT INTO users (name, lastName, birthdate,email, password) VALUES(?,?,?,?,?)",[name,lastName,birthdate,email,password])

        // Consultar todos los usuarios después de la inserción
        const [users] = await pool.query("SELECT * FROM users");
        //

        res.status(201).json(
            {
                message: "Usuario creado con éxito 🔥", 
                //id: result.insertId,
                users,
            }
        );

    } catch (error) {
        console.error("Usuario no encontrado:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }

}

export const editUsers=async(req,res)=>{
    //res.send("editando los datos del usuario");
    try {
        const {id}=req.params
        const {name,lastName,birthdate,email,password}=req.body;
        const [dataActualizado]=await pool.query("UPDATE users SET name=IFNULL(?,name),lastname=IFNULL(?,lastname), birthdate=IFNULL(?,birthdate),email=IFNULL(?,email),password=IFNULL(?,password) WHERE id=?",[name,lastName,birthdate,email,password,id])
        res.status(204).json({message:"se actualizo xd"});

        // Consultar todos los usuarios después de la inserción
        const [users] = await pool.query("SELECT * FROM users");
        //
        res.status(201).json(
            {
                message: "Usuario actualizado con exito", 
                //id: result.insertId,
                users,
            }
        );

    } catch (error) {
        console.error("El usuario no fue editado con exito:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }

}

export const deleteUsers=async(req,res)=>{
    //res.send("eliminando usuarios")
    try {
        const {id}=req.params
        const [deleteUsers]=await pool.query("DELETE FROM users WHERE id=?",[id])
        // Consultar todos los usuarios después de la inserción
        const [users] = await pool.query("SELECT * FROM users");
        //
        res.status(201).json(
            {
                message: "Usuario eliminado con exito", 
                //id: result.insertId,
                users,
            }
        );
    } catch (error) {
        console.error("Usuario no fue encontrado:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }

}

// login

export const login=async(req,res)=>{

    const{email,password}=req.body

    try {
        const [data]=await pool.query("SELECT * FROM users WHERE email=? AND password=?",[email,password])
        //console.log(data);
        if (data.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        // Usuario autenticado
        const user = data[0];
        res.json({ message: 'Login exitoso', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}