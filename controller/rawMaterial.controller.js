import axios from "axios";
import { RawMaterial } from "../model/createRawMaterial.js";
export const rawMaterialXml = async (req, res) => {
  const fileUrl =
    "https://xmlfile.blr1.cdn.digitaloceanspaces.com/CreateRowmaterial.xml";
  try {
    const response = await axios.get(fileUrl);
    const data = response.data;
    return res.status(200).json({ data, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error reading the file");
  }
};

export const CreatRawMaterial = async (req, res, next) => {
  try {
    const rowMatarial = await RawMaterial.create(req.body);
    return rowMatarial
      ? res.status(200).json({
          message: "Data Save Successfully",
          RawMaterial: rowMatarial,
          status: true,
        })
      : res
          .status(400)
          .json({ message: "Something Went Wrong", status: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};

export const ViewRawMaterial = async (req, res, next) => {
  try {
    let rawmaterial = await RawMaterial.find()
      .sort({ sortorder: -1 })
      .populate({ path: "Warehouse", model: "user" });

    return res.status(200).json({ Data: rawmaterial, status: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};

export const ViewRawMaterialById = async (req, res, next) => {
  try {
    const rawMaterialId = req.params.id;
    const rawmatarial = await getUserHierarchy(rawMaterialId);
    return adminDetail.length > 0
      ? res.status(200).json({ Data: rawmatarial, status: true })
      : res.status(404).json({ error: "Not Found", status: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};

export const DeleteRAwMaterial = async (req, res, next) => {
  try {
    const data = await RawMaterial.findByIdAndDelete({ _id: req.params.id });
    return data
      ? res.status(200).json({ message: "delete successful", status: true })
      : res.status(404).json({ error: "Not Found", status: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal server error", status: false });
  }
};

export const UpdateRawMaterial = async (req, res, next) => {
  try {
    const rawmaterialId = req.params.id;
    const existingrawmaterial = await User.findById(rawmaterialId);
    if (!existingrawmaterial) {
      return res
        .status(404)
        .json({ error: "Rawmaterial not found", status: false });
    } else {
      const updatedrawmaterial = req.body;
      await RawMaterial.findByIdAndUpdate(rawmaterialId, updatedrawmaterial, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "Rawmaterial Updated Successfully", status: true });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", status: false });
  }
};
