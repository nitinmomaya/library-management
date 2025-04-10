import { Formik, Form, Field, ErrorMessage, FieldProps, FormikValues } from 'formik';
import { TextField, Checkbox, FormControlLabel, Button, Box } from '@mui/material';
import * as Joi from 'joi';
import { FormFieldInterface } from '../common/interface';


interface FormComponentProps<T extends FormikValues> {
  initialValues: T;
  validationSchema: Joi.ObjectSchema;
  onSubmit: (values: T) => void;
  formFields: FormFieldInterface[];
}

const FormComponent = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  formFields,
}: FormComponentProps<T>) => {
  const validate = (values: T) => {
    const { error } = validationSchema.validate(values, { abortEarly: false });
    const errors: Partial<Record<keyof T, string>> = {};
    if (error) {
      error.details.forEach((detail) => {
        errors[detail.path[0] as keyof T] = detail.message;
      });
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ handleChange, handleBlur }) => (
        <Form className="flex flex-col gap-4">
          {formFields.map((field) => (
            <Box key={field.name} mb={2}>
              <Field name={field.name}>
                {({ field: formikField }: FieldProps) => {
                  switch (field.type) {
                    case 'checkbox':
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...formikField}
                              checked={formikField.value}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                          label={field.label}
                        />
                      );
                    default:
                      return (
                        <TextField
                          {...formikField}
                          label={field.label}
                          type={field.type}
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                        />
                      );
                  }
                }}
              </Field>
              <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
            </Box>
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
