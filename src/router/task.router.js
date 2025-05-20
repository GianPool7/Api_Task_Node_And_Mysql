import e from 'express';
import {getTask,getTaskId,createTask,updateTask,deleteTask} from '../controller/task.controller.js'

const router=e.Router();


router.get("/task",getTask)
router.get("/task/:id",getTaskId)
router.post("/task",createTask)
router.put("/task/:id",updateTask)
router.delete("/task/:id",deleteTask)


export default router;