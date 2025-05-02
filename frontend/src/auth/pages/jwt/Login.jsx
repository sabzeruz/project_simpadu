import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { KeenIcon } from '@/components';
import { Alert } from '@/components';
import { useAuthContext } from '@/auth/useAuthContext';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  // default redirect: /
  const from = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);
      try {
        await login(values.username, values.password);
        navigate(from, { replace: true });
      } catch (err) {
        setStatus(err.message || 'Login gagal!');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="card max-w-[390px] w-full">
      <form
        className="card-body flex flex-col gap-5 p-10"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div className="text-center mb-2.5">
          <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
            Sign in
          </h3>
        </div>

        <Alert variant="primary">
          Dalam tahap pengembangan. <br />
          Username :  <span className="font-semibold text-gray-900">iqbal</span> 
          <br />{' '}
          Password : <span className="font-semibold text-gray-900">iqbal</span>
        </Alert>

        {formik.status && <Alert variant="danger">{formik.status}</Alert>}

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Username</label>
          <label className="input">
            <input
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              className={clsx('form-control', {
                'is-invalid': formik.touched.username && formik.errors.username,
              })}
            />
          </label>
          {formik.touched.username && formik.errors.username && (
            <span className="text-danger text-xs mt-1">
              {formik.errors.username}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Password</label>
          <label className="input">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={clsx('form-control', {
                'is-invalid': formik.touched.password && formik.errors.password,
              })}
            />
            <button className="btn btn-icon" onClick={togglePassword}>
              <KeenIcon
                icon={showPassword ? 'eye-slash' : 'eye'}
                className="text-gray-500"
              />
            </button>
          </label>
          {formik.touched.password && formik.errors.password && (
            <span className="text-danger text-xs mt-1">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary flex justify-center grow"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export { Login };
