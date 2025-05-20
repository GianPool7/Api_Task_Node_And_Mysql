import pool from '../db.js'

export const getTask=async(req,res)=>{

    try {
        const [tasks]=await pool.query("SELECT * FROM tasks")
        res.send(tasks)
    } catch (error) {
        console.error("Error al obtener usuarios:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }

}

export const getTaskId=async(req,res)=>{

    try {
        const {id}=req.params
        const [taskForId]=await pool.query("SELECT * FROM tasks WHERE id=?",[id])
        res.status(201).json([taskForId]) 
    } catch (error) {
        console.error("Error al obtener usuarios:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }


}

export const createTask=async(req,res)=>{
    try {
        const {id_projects,title,description,star_date,end_date}=req.body
        const [taskCreate]=await pool.query("INSERT INTO tasks (id_projects,title,description,star_date,end_date) values (?,?,?,?,?)",[id_projects,title,description,star_date,end_date])

        if (taskCreate.affectedRows===0) {
            return res.status(400).json({
                message:"Es necesario enviar todos los datos obligatorios"
            })
        }

        const [taskList]=await pool.query("SELECT * FROM tasks WHERE id=?",[taskCreate.insertId])
        return res.status(201).json({
            message:"tarea creada con exito",
            data:taskList[0]
        })

    } catch (error) {
        console.error("Error al obtener las tareas del usuario:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }
}

export const updateTask=async(req,res)=>{

    try {
        const {id}=req.params
        const {id_projects,title,description,star_date,end_date}=req.body
        const [taskUpdate]=await pool.query("UPDATE tasks SET id_projects=IFNULL(?,id_projects),title=IFNULL(?,title),description=IFNULL(?,description),star_date=IFNULL(?,star_date),end_date=IFNULL(?,end_date) WHERE id=?",[id_projects,title,description,star_date,end_date,id])

        if (taskUpdate.affectedRows===0) {
            return res.status(400).json({
                message:"No hubo datos actualizado"
            })
        }

        const [taskList]=await pool.query("SELECT * FROM tasks WHERE id=?",[id])

        return res.status(201).json({
            message:"Se actualizo correctamente",
            data:taskList[0]
        })

    } catch (error) {
        console.error("Error al obtener las tareas del usuario:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }

}

export const deleteTask=async(req,res)=>{

    try {
        const {id}=req.params
        const [taskDelete]=await pool.query("DELETE FROM tasks WHERE id=?",[id])

        if (taskDelete.affectedRows>0) {
            return res.status(201).json({
                message:"Tarea eliminada"
            })
        } else {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

    } catch (error) {
        console.error("Error al obtener las tareas del usuario:", error); 
        res.status(500).json({ message: "Error del servidor" }); 
    }


}


