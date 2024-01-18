import express from "express";
import {
  rawMaterialXml,
  CreatRawMaterial,
  ViewRawMaterial,
  ViewRawMaterialById,
  UpdateRawMaterial,
} from "../controller/rawMaterial.controller.js";

const router = express.Router();

router.get("/get-xml", rawMaterialXml);
router.post("/creat-rawMaterial", CreatRawMaterial);
router.get("/viewRawMaterial", ViewRawMaterial);
router.get("/view-rawMaterial-by-id/:id", ViewRawMaterialById);
router.post("/update-rawMaterial/:id", UpdateRawMaterial);

export default router;
