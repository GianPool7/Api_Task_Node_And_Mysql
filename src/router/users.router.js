import express from 'express';
import {users,userId,addUsers,editUsers,deleteUsers,login} from '../controller/users.controller.js'


const router = express.Router();


router.get("/users", users)

router.get("/users/:id", userId)

router.post("/users",addUsers)

router.put("/users/:id",editUsers)

router.delete("/users/:id",deleteUsers)

// login
router.post("/login", login)


export default router;