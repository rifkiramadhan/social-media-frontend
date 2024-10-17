import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createPlanAPI } from '../../../APIServices/plans/plansAPI';
import AlertMessage from '../../Alert/AllertMessage/AllertMessage';

const CreatePlan = () => {
  //navigate
  const navigate = useNavigate();
  // user mutation
  const planMutation = useMutation({
    mutationKey: ['user-registration'],
    mutationFn: createPlanAPI,
  });
  // formik config
  const formik = useFormik({
    // initial data
    initialValues: {
      planName: '',
      features: '',
      limitations: '',
      price: '',
    },
    // validation
    validationSchema: Yup.object({
      planName: Yup.string().required('Plan Name is required'),
      features: Yup.string().required('Features is/are required'),
      limitations: Yup.string().required('Limitations is/are required'),
      price: Yup.string().required('Price  is required'),
    }),
    // submit
    onSubmit: async values => {
      console.log(values);
      //prepare the data for creation
      const planData = {
        planName: values.planName,
        features: values.features.split(',').map(feature => feature.trim()),
        limitations: values.limitations,
        price: values.price,
      };

      planMutation
        .mutateAsync(planData)
        .then(() => {
          // redirect
          navigate('/dashboard');
        })
        .catch(err => console.log(err));
    },
  });

  console.log(planMutation);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={formik.handleSubmit}
        className='max-w-md w-full p-6 mt-8 bg-white rounded-lg shadow-4xl'
      >
        <h2 className='mb-4 text-xl font-semibold text-center text-gray-700'>
          Create New Plan
        </h2>
        {/* show mesage */}
        {planMutation.isPending && (
          <AlertMessage type='loading' message='Loading please wait...' />
        )}
        {planMutation.isSuccess && (
          <AlertMessage type='success' message='Plan created successfully' />
        )}
        {planMutation.isError && (
          <AlertMessage
            type='error'
            message={planMutation?.error?.response?.data?.message}
          />
        )}

        {/* Type Name Input */}
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Type Name:
          </label>
          <select
            id='planName'
            {...formik.getFieldProps('planName')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          >
            <option value='Free'>Free</option>
            <option value='Premium'>Premium</option>
          </select>
          {formik.touched.planName && formik.errors.planName && (
            <div className='text-red-500 mt-1'>{formik.errors.planName}</div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Features (comma separated):
          </label>
          <input
            type='text'
            id='features'
            {...formik.getFieldProps('features')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          {formik.touched.features && formik.errors.features && (
            <div className='text-red-500 mt-1'>{formik.errors.features}</div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Limitations:
          </label>
          <input
            type='number'
            id='limitations'
            {...formik.getFieldProps('limitations')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          {formik.touched.limitations && formik.errors.limitations && (
            <div className='text-red-500 mt-1'>{formik.errors.limitations}</div>
          )}
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>
            Price:
          </label>
          <input
            type='number'
            id='price'
            {...formik.getFieldProps('price')}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
          {formik.touched.price && formik.errors.price && (
            <div className='text-red-500 mt-1'>{formik.errors.price}</div>
          )}
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-700 focus:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePlan;
