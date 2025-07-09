import * as Yup from "yup";

export const urlSchema = Yup.object({
  url: Yup.string().trim().required("Please Give URL"),
});
