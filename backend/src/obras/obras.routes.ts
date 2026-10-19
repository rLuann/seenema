import { Router } from "express";
import * as obrasController from "./obras.controller";

const router = Router();

router.get("/api/obras", obrasController.getAll);
router.get("/api/obras/:id", obrasController.getById);

export default router;