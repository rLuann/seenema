import { Router } from "express";
import * as obrasController from "./obras.controller";

const router = Router();

router.get("/api/obras", obrasController.getAll);

export default router;