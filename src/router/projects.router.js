import e from "express";
import {projects,projectsId,projectsAdd,projectsEdit,projectsDelete} from '../controller/projects.controller.js'


const router=e.Router();

router.get("/projects",projects);
router.get("/projects/:id",projectsId);
router.post("/projects",projectsAdd);
router.put("/projects/:id",projectsEdit);
router.delete("/projects/:id",projectsDelete);

export default router;