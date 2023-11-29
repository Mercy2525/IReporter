import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Login({ updateUser }) {
  //test
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function handleSignUpClick() {
    navigate('/signup');
  }

  YupPassword(Yup);
  const errorMessagesSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('This field is required'),
    password: Yup.string()
      .required('This field is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  return (
    <>
      <div className='flex flex-col items-center justify-center p-20'>
        <h1 className='font-bold text-2xl mb-8'> Log In</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={errorMessagesSchema}
          onSubmit={(values, { resetForm }) => {
            fetch('https://ireporter-backend.onrender.com/login_user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })
              .then((res) => {
                if (res.status === 200) {
                  enqueueSnackbar('Log in successful!', { variant: 'success' });
                  navigate('/home');
                } else {
                  return res.json().then((data) => {
                    enqueueSnackbar(data.message || 'Invalid username or password', { variant: 'error' });
                    console.log(data); // Log the response for debugging
                  });
                }
              })
              .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Something went wrong', { variant: 'error' });
              })
              .finally(() => {
                resetForm();
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col content-center justify-center max-w-xs w-full'>
              <label className='m-2 font-bold' htmlFor='email'>
                Email address
              </label>
              <Field type='text' name='email' id='email' className='text-rich-black px-2 rounded' />
              {touched.email && errors.email && <div className='text-indian-red'>{errors.email}</div>}

              <label className='m-2 font-bold' htmlFor='password'>
                Password
              </label>
              <Field type='password' name='password' id='password' className='text-rich-black px-2 rounded' />
              {touched.password && errors.password && <div className='text-indian-red'>{errors.password}</div>}

              <Button type='submit' content='Log In' className='text-sm my-5 mx-auto py-2  w-2/6' />
            </Form>
          )}
        </Formik>
        <p>
          Don't have an account? <span className='font-bold' onClick={handleSignUpClick}>Sign Up</span>
        </p>
      </div>
    </>
  );
}

export default Login;
