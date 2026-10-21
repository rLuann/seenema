import { Router } from "express";
import * as obrasController from "./obras.controller";

const router = Router();

router.get("/api/obras", obrasController.getAll);
router.get("/api/obras/:id", obrasController.getById);
router.post("/api/obras", obrasController.create);
router.put("/api/obras/:id", obrasController.update);
router.delete("/api/obras/:id", obrasController.remove);

export default router;