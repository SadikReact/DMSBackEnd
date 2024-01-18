import { CompanyDetails } from "../model/companyDetails.model.js";

const companyDetail = await CompanyDetails.find({})
const detail = companyDetail[companyDetail.length - 1]
const invoice = Math.floor(100000 + Math.random() * 900000);
const ff = detail.name.slice(0, 3) + invoice
console.log(ff)