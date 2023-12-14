import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import Button from './Button';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Login({setUser}) {
  function handleLogIn(user){
    setUser(user)
  }

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function handleSignUpClick() {
    navigate('/signup');
  }

  YupPassword(Yup);
  const errorMessagesSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('This field is required'),
    password: Yup.string().required('This field is required').min(6, 'Password must be at least 6 characters'),
  });

  return (
    <>
      <div className='flex flex-col bg-color-primary  items-center justify-center p-20'>
        <h1 className='font-semiBold text-color-blue2 text-2xl mb-8'>User Log In</h1>

        <Formik
          initialValues={{email: '', password: '', }}

          validationSchema={errorMessagesSchema}

          onSubmit={(values, e) => {

            fetch('/login_user', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })
              .then((res) => {
                if (res.status === 201) {
                  res.json()
                  .then(enqueueSnackbar('Log in successful!', { variant: 'success' }))
                  .then(navigate('/user/redflags'))
                  .then(values=>handleLogIn(values))
                  
                } else {
                  return res.json().then((data) => {
                    enqueueSnackbar(data.message || 'Invalid email or password', { variant: 'error' });
                    console.log(data); 
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
              <label className='m-2 text-color-tertiary font-bold' htmlFor='email'>
                Email address
              </label>
              <Field type='email' name='email' id='email' className='text-rich-black px-2 rounded' />
              {touched.email && errors.email && <div className='text-color-red'>{errors.email}</div>}

              <label className='m-2 text-color-tertiary font-bold' htmlFor='password'>
                Password
              </label>
              <Field type='password' name='password' id='password' className='text-rich-black px-2 rounded' />
              {touched.password && errors.password && <div className='text-color-red'>{errors.password}</div>}

              <Button type='submit' content='Log In' className='text-sm bg-color-blue2 my-5 mx-auto py-2  w-2/6' />
            </Form>
          )}
        </Formik>
        <p>
          Don't have an account? <span className='font-bold ' onClick={handleSignUpClick}>Sign Up</span>
        </p>

        <h1 className='mt-6 font-bold'>
            <span className='inline-flex items-center border-t-2  border-color-blue2'>
                <span className='text-color-secondary '>OR</span>
            </span>
        </h1>

        <Link to='/adminLogin'>
            <Button type='button' content='Log In as Admin' className='text-sm shadow-lg  bg-color-blue2 my-5 mx-auto py-2  w-80' />
        </Link>


       
      </div>
    </>
  );
}

export default Login;