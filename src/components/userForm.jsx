import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countries } from '../data';

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '',
    phoneCode: '', phoneNumber: '', country: '', city: '', pan: '', aadhar: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (data) => {
    const errs = {};
    if (!data.firstName.trim()) errs.firstName = "First Name is required.";
    if (!data.lastName.trim()) errs.lastName = "Last Name is required.";
    if (!data.username.trim()) errs.username = "Username is required.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Invalid Email.";
    if (!data.password || data.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (!/^\+\d+$/.test(data.phoneCode)) errs.phoneCode = "Invalid country code.";
    if (!/^\d{10}$/.test(data.phoneNumber)) errs.phoneNumber = "Phone number must be 10 digits.";
    if (!data.country) errs.country = "Country is required.";
    if (!data.city) errs.city = "City is required.";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan)) errs.pan = "PAN must be 10 characters (ABCDE1234F).";
    if (!/^\d{12}$/.test(data.aadhar)) errs.aadhar = "Aadhar must be 12-digit number.";
    return errs;
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };


  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldError = validate(formData)[name];
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/Completion', { state: formData });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-10 font-sans"
        noValidate
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">
          Register Account
        </h2>

        <SectionTitle title="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {['firstName', 'lastName', 'username', 'email'].map(field => (
            <InputField
              key={field}
              label={formatLabel(field)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[field]}
              required
              type={field === 'email' ? 'email' : 'text'}
            />
          ))}

          <div className="md:col-span-2">
            <InputField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(show => !show)}
              className="mt-1 text-sm text-teal-600 hover:underline font-medium"
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>
        </div>

        <SectionTitle title="Contact Details" />
        <div className="grid grid-cols-3 gap-6 mb-8">
          <InputField
            label="Phone Code"
            name="phoneCode"
            placeholder="+91"
            value={formData.phoneCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phoneCode}
            required
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phoneNumber}
            required
            className="col-span-2"
          />
        </div>

        <SectionTitle title="Location" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DropdownField
            label="Country"
            name="country"
            options={Object.keys(countries)}
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.country}
            required
          />
          <DropdownField
            label="City"
            name="city"
            options={countries[formData.country] || []}
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.city}
            required
            disabled={!formData.country}
          />
        </div>

        <SectionTitle title="Identification" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <InputField
            label="PAN No."
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.pan}
            required
          />
          <InputField
            label="Aadhar No."
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.aadhar}
            required
          />
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className={`w-full py-4 font-semibold text-white text-lg rounded-lg transition duration-300
            ${Object.keys(errors).length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <h3 className="text-xl font-semibold text-gray-800 mb-5 border-l-4 border-teal-500 pl-3 tracking-wide">
    {title}
  </h3>
);

const InputField = ({
  label, name, value, onChange, onBlur, error,
  type = 'text', placeholder = '', className = '', required = false,
  disabled = false
}) => (
  <div className={className}>
    <label
      htmlFor={name}
      className="block mb-1 text-gray-700 font-medium"
    >
      {label} {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={`${name}-error`}
      className={`w-full px-3 py-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent outline-none transition-colors duration-200
        ${error ? 'border-red-500' : ''}`}
    />
    {error && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
);

const DropdownField = ({
  label, name, options, value, onChange, onBlur, error,
  required = false, disabled = false
}) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-1 text-gray-700 font-medium"
    >
      {label} {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={`${name}-error`}
      className={`w-full px-3 py-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent outline-none transition-colors duration-200
        ${error ? 'border-red-500' : ''}`}
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
);

const formatLabel = (label) =>
  label
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());

export default UserForm;
