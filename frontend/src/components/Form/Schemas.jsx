import * as yup from "yup";

export const registerSchemas = yup.object().shape({
  fullname: yup.string().required("*nama lengkap wajib diisi"),
  no_telp: yup.number().required("*nomor handphone wajib diisi"),
  usia: yup.number().required("*usia wajib diisi"),
  email: yup
    .string()
    .email("isi email dengan benar")
    .required("*email wajib diisi"),
  password: yup
    .string()
    .required("*password wajib diisi")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "*minimal 8 karakter, terdiri dari huruf besar dan angka"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "*Password tidak sama"),
});

export const loginSchemas = yup.object().shape({
  email: yup
    .string()
    .email("Masukkan dengan format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
