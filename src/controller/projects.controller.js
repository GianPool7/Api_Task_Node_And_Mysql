import pool from '../db.js'

export const projects=async(req,res)=>{

    try {
        const [dataProjects]=await pool.query("SELECT * FROM projects");
        res.json(dataProjects)
    } catch (error) {
        console.error("database connection error:", error);
        res.status(500).json({
            message:"database connection error"
        })
    }

}

export const projectsId= async(req,res)=>{

    try {
        const {id}=req.params
        const dataProjectsId=await pool.query("SELECT * FROM projects WHERE id=?",[id])
        res.json([dataProjectsId])
    } catch (error) {
        console.error("database connection error:", error);
        res.status(500).json({
            message:"database connection error"
        })
    }

}

export const projectsAdd=async(req,res)=>{

    try {
        const {id_user,title,description,star_date,end_date}=req.body
        const [dataProjectsAdd]=await pool.query("INSERT INTO projects (id_user, title, description, star_date, end_date) VALUES (?,?,?,?,?)",[id_user,title,description,star_date,end_date])
        //console.log("Resultado del INSERT:", dataProjectsAdd);
        //res.status(200).json("projecto nuevo creado sastifactoriamente");

        const [dataProjectNews]=await pool.query("SELECT * FROM projects WHERE id=?",[dataProjectsAdd.insertId])

        res.status(200).json({
            message:"Projecto nuevo agreagado correctamente2",
            data:dataProjectNews[0]
        })

    } catch (error) {
        console.error("database connection error:", error);
        res.status(500).json({
            message:"database connection error"
        })
    }

}

export const projectsEdit=async(req,res)=>{

    try {
        
        const {id}=req.params;
        const {id_user,title,description,star_date,end_date}=req.body
        const [dataUpdate]=await pool.query("UPDATE projects SET id_user=IFNULL(?,id_user),title=IFNULL(?,title),description=IFNULL(?,description),star_date=IFNULL(?,star_date),end_date=IFNULL(?,end_date) WHERE id=?",[id_user,title,description,star_date,end_date,id])
        //console.log("data",dataUpdate);

        if (dataUpdate.affectedRows==0) {
            res.json({
                message:"Usuario no actualizado"
            })
        }

        const [dataUpdateNews]=await pool.query("SELECT * FROM projects WHERE id=?",[id])
        res.status(200).json({
            message:"se actualizo de forma correcta",
            data:dataUpdateNews[0]
        })

    } catch (error) {
        
        console.error("database connection error:", error);
        res.status(500).json({
            message:"database connection error"
        })

    }

}

export const projectsDelete=async(req,res)=>{
//    res.send("Deleting projects")

    try {
            
        const {id}=req.params;
        const [dataEliminada]=await pool.query("DELETE FROM projects WHERE id=?",[id])

        if (dataEliminada.affectedRows==0) {
            res.json({
                message:"Usuario no encontrado"
            })
        }
        
        res.status(200).json("Se elimino correctamente")

    } catch (error) {

        console.error("database connection error:", error);
        res.status(500).json({
            message:"database connection error"
        })

    }


}
