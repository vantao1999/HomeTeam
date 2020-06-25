import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('emailInvalid').required('emailRequired'),
  password: Yup.string().min(6('passwordMin')).max(20('passwordMax')).required('passwordRequired'),
});

export const registerSchema = Yup.object({
  email: Yup.string().email('emailInvalid').required('emailRequired'),
  password: Yup.string().min(6, 'passwordMin').max(20, 'passwordMax').required('passwordRequired'),
});
