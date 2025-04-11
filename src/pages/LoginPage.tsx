import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import * as Joi from 'joi';
import { login } from '../redux/auth/authActions';
import { AppDispatch } from '../redux/store';
import FormComponent from '../components/FormComponent';
import { LoginFormValues } from '../redux/auth/authTypes';
import { FormFieldInterface } from '../common/interface';
import { useNavigate } from 'react-router-dom';

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Enter a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const handleSubmit = (values: LoginFormValues) => {
    dispatch(login(values)).then(()=>{
        navigate('/')
    });
  };

  const formFields: FormFieldInterface[] = [
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'password', label: 'Password', type: 'text' },
  ];

  return (
    <Box className="flex items-center justify-center w-full bg-gray-100" sx={{border: '1px dashed grey' }}>
      <Box className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <Typography variant="h5" className="mb-14 text-center">
          Login
        </Typography>
        <FormComponent<LoginFormValues>
          initialValues={{ email: '', password: ''}}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
          formFields={formFields}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
