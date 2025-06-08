import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { countries, countryPhoneCodes } from '../data';

const initialData = {
  firstName: '', lastName: '', username: '', email: '', password: '',
  phoneCode: '', phoneNumber: '', country: '', city: '', pan: '', aadhar: '',
};

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (data = formData) => {
    const errs = {};
    const { firstName, lastName, username, email, password, phoneCode, phoneNumber, country, city, pan, aadhar } = data;

    if (!firstName.trim()) errs.firstName = "First Name is required.";
    if (!lastName.trim()) errs.lastName = "Last Name is required.";
    if (!username.trim()) errs.username = "Username is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Invalid Email.";
    if (!password || password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (!/^\+\d+$/.test(phoneCode)) errs.phoneCode = "Invalid country code.";
    if (!/^\d{10}$/.test(phoneNumber)) errs.phoneNumber = "Phone number must be 10 digits.";
    if (!country) errs.country = "Country is required.";
    if (!city) errs.city = "City is required.";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) errs.pan = "PAN must be 10 characters (ABCDE1234F).";
    if (!/^\d{12}$/.test(aadhar)) errs.aadhar = "Aadhar must be 12-digit number.";

    return errs;
  };

  const handleChange = ({ target: { name, value } }) => {
    let updatedData = { ...formData, [name]: value };

    if (name === "country") {
      const code = countryPhoneCodes[value];
      if (code) {
        updatedData.phoneCode = code;
      
      }
    }

    if (name === "phoneCode") {
      const matchedCountry = Object.entries(countryPhoneCodes).find(
        ([country, code]) => code === value
      );
      if (matchedCountry) {
        updatedData.country = matchedCountry[0];
      
      }
    }

    setFormData(updatedData);


    const newErrors = validate(updatedData);
    setErrors(newErrors);
  };

  
  useEffect(() => {
    setFormData(prev => ({ ...prev, city: '' }));
  }, [formData.country]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate('/completion', { state: formData });
    }
  };

  
  const isSubmitDisabled =
    Object.keys(errors).length > 0 ||
    Object.values(formData).some(value => value === '');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Register Account
        </h2>

        <SectionTitle title="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { name: 'firstName', label: 'First Name' },
            { name: 'lastName', label: 'Last Name' },
            { name: 'username', label: 'Username' },
            { name: 'email', label: 'Email', type: 'email' }
          ].map(({ name, label, type = 'text' }) => (
            <InputField
              key={name}
              name={name}
              label={label}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              error={errors[name]}
              required
            />
          ))}
          <div className="md:col-span-2">
            <InputField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="mt-1 text-sm text-teal-600 hover:underline font-medium"
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>
        </div>

        <SectionTitle title="Contact Details" />
        <div className="grid grid-cols-3 gap-6 mb-8">
          <InputField
            name="phoneCode"
            label="Phone Code"
            placeholder="+91"
            value={formData.phoneCode}
            onChange={handleChange}
            error={errors.phoneCode}
            required
          />
          <InputField
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
            required
            className="col-span-2"
          />
        </div>

        <SectionTitle title="Location" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DropdownField
            name="country"
            label="Country"
            options={Object.keys(countries)}
            value={formData.country}
            onChange={handleChange}
            error={errors.country}
            required
          />
          <DropdownField
            name="city"
            label="City"
            options={countries[formData.country] || []}
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
          />
        </div>

        <SectionTitle title="Identification" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <InputField
            name="pan"
            label="PAN No."
            value={formData.pan}
            onChange={handleChange}
            error={errors.pan}
            required
          />
          <InputField
            name="aadhar"
            label="Aadhar No."
            value={formData.aadhar}
            onChange={handleChange}
            error={errors.aadhar}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-4 font-semibold text-white text-lg rounded-lg transition duration-300 ${
            isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <h3 className="text-xl font-semibold text-gray-800 mb-5 border-l-4 border-teal-500 pl-3">
    {title}
  </h3>
);

const InputField = ({ label, name, value, onChange, error, type = 'text', placeholder = '', className = '', required = false }) => (
  <div className={className}>
    <label className="block mb-1 text-gray-700 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent outline-none transition-colors duration-200"
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const DropdownField = ({ label, name, options, value, onChange, error, required = false }) => (
  <div>
    <label className="block mb-1 text-gray-700 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-2 py-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent outline-none transition-colors duration-200"
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default UserForm;
