import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Login({ updateUser }) {
    //
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function handleSignUpClick() {
    navigate('/login');
  }

  YupPassword(Yup);
  const errorMessagesSchema = Yup.object().shape({
    username: Yup.string()
    .min(2, "Username too short!")
    .max(50, "Username too long")
    .required('This field is required'),
    password: Yup.string()
      .required('This field is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  return (
    <>
      <div className='flex flex-col items-center justify-center p-20'>
        <h1 className='font-semiBold text-color-blue2 text-2xl mb-8'> Admin Log In</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={errorMessagesSchema}
          onSubmit={(values, e) => {
            fetch('https://ireporter-backend.onrender.com/login_admin', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })
              .then((res) => {
                if (res.status === 201) {
                  enqueueSnackbar('Admin Logged in successful!', { variant: 'success' });
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
                e.resetForm();
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col content-center mb-1 justify-center bg-color-blue   max-w-xs w-full'>
              <label className='m-2 font-bold' htmlFor='username'>
                Username
              </label>
              <Field type='text' name='username' id='username' className='text-rich-black px-2 rounded' />
              {touched.username && errors.username && <div className='text-color-red'>{errors.username}</div>}

              <label className='m-2 font-bold' htmlFor='password'>
                Password
              </label>
              <Field type='password' name='password' id='password' className='text-rich-black px-2 rounded' />
              {touched.password && errors.password && <div className='text-color-red'>{errors.password}</div>}

              <Button type='submit' content='Log In' className='text-sm bg-color-blue2 my-5 mx-auto py-2  w-2/6' />
            </Form>
          )}
        </Formik>
        <p>
          Not an Admin? <span className='font-bold ' onClick={handleSignUpClick}>User Login</span>
        </p>

        

       

       


       
      </div>
    </>
  );
}

export default Login;
