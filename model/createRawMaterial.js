import mongoose from "mongoose";
import convert from "xml-js";
import axios from "axios";

var status = "status";
let created_by = "created_by";

async function createSchema() {
  const ff = await axios.get(
    "https://xmlfile.blr1.cdn.digitaloceanspaces.com/CreateRowmaterial.xml"
  );
  const xmlFile = ff.data;
  const jsonData = JSON.parse(
    convert.xml2json(xmlFile, { compact: true, spaces: 2 })
  );
  const schemaDefinition = {};
  schemaDefinition[created_by] = String;
  schemaDefinition[status] = String;
  if (Array.isArray(jsonData.RowMaterialConfig.input)) {
    jsonData.RowMaterialConfig.input.forEach((input, index) => {
      const name = input.name._text;
      const type = input.type._attributes.type;
      if (type === "text") {
        schemaDefinition[name] = String;
      } else if (type === "date") {
        schemaDefinition[name] = Date;
      } else if (type === "number") {
        schemaDefinition[name] = Number;
      } else if (type === "file") {
        schemaDefinition[name] = [];
      } else {
        schemaDefinition[name] = String;
      }
    });
  } else {
    const input = jsonData.RowMaterialConfig.input;
    const name = input.name._text;
    const type = input.type._attributes.type;
    if (type === "text") {
      schemaDefinition[name] = String;
    } else if (type === "date") {
      schemaDefinition[name] = Date;
    } else if (type === "number") {
      schemaDefinition[name] = Number;
    } else if (type === "file") {
      schemaDefinition[name] = [];
    } else {
      schemaDefinition[name] = String;
    }
  }
  if (jsonData.RowMaterialConfig.MyDropdown) {
    if (Array.isArray(jsonData.RowMaterialConfig.MyDropdown)) {
      jsonData.RowMaterialConfig.MyDropdown.forEach((dropdown) => {
        if (Array.isArray(dropdown.dropdown)) {
          dropdown.dropdown.forEach((item) => {
            const name = item.name._text;
            schemaDefinition[name] = String;
          });
        } else {
          const item = dropdown.dropdown;
          const name = item.name._text;
          schemaDefinition[name] = String;
        }
      });
    } else {
      if (Array.isArray(jsonData.RowMaterialConfig.MyDropdown.dropdown)) {
        jsonData.RowMaterialConfig.MyDropdown.dropdown.forEach((item) => {
          const name = item.name._text;
          schemaDefinition[name] = String;
        });
      } else {
        const item = jsonData.RowMaterialConfig.MyDropdown.dropdown;
        const name = item.name._text;
        schemaDefinition[name] = String;
      }
    }
  }
  if (jsonData.RowMaterialConfig.CheckBox) {
    if (Array.isArray(jsonData.RowMaterialConfig.CheckBox.input)) {
      jsonData.RowMaterialConfig.CheckBox.input.forEach((input, index) => {
        const check = input.name._text;
        const type = input.type._attributes.type;
        if (type === "Boolean") {
          schemaDefinition[check] = Boolean;
        } else {
          schemaDefinition[check] = String;
        }
      });
    } else {
      const input = jsonData.RowMaterialConfig.CheckBox.input;
      const check = input.name._text;
      const type = input.type._attributes.type;
      if (type === "Boolean") {
        schemaDefinition[check] = Boolean;
      } else {
        schemaDefinition[check] = String;
      }
    }
  }

  if (jsonData.RowMaterialConfig.Radiobutton) {
    if (Array.isArray(jsonData.RowMaterialConfig.Radiobutton.input)) {
      jsonData.RowMaterialConfig.Radiobutton.input.forEach((input, index) => {
        const check = input.name._text;
        const type = input.type._text;
        schemaDefinition[check] = String;
      });
    } else {
      const input = jsonData.RowMaterialConfig.Radiobutton.input;
      const check = input.name._text;
      schemaDefinition[check] = String;
    }
  }

  return new mongoose.Schema(schemaDefinition, { timestamps: true });
}

export const RawMaterialSchema = await createSchema();
export const RawMaterial = mongoose.model("rowmaterial", RawMaterialSchema);
