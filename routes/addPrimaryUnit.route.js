import express from "express";
import { SavePrimaryUnit, ViewPrimaryUnit } from "../controller/addPrimaryUnit.controller.js";

const router = express.Router();

router.post("/save-primary-unit", SavePrimaryUnit)
router.get("/view-primary-unit", ViewPrimaryUnit)

export default router;