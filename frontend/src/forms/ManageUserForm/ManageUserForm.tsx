import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";

export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  paymentMethods: { id: number; name: string; accountNumber: string }[]; // Added id for identification
};

type Props = {
  user?: UserFormData;
  onSave: (userFormData: FormData) => void;
  isLoading: boolean;
};

const ManageUserForm = ({ onSave, isLoading, user }: Props) => {
  const formMethods = useForm<UserFormData>();
  const { handleSubmit, reset, register, watch, setValue } = formMethods;
  const [showFields, setShowFields] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const paymentMethodRef = useRef<HTMLInputElement>(null);
  const accountNumberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        paymentMethods: user.paymentMethods || [], // Ensure paymentMethods is an empty array if not present
      });
    }
  }, [user, reset]);

  const onSubmit = handleSubmit((formDataJSON: UserFormData) => {
    const formData = new FormData();
    formData.append("firstName", formDataJSON.firstName);
    formData.append("lastName", formDataJSON.lastName);
    formData.append("email", formDataJSON.email);
    formData.append("paymentMethods", JSON.stringify(formDataJSON.paymentMethods));

    console.log([...formData.entries()]); // Debugging: Check FormData contents

    onSave(formData);
  });

  const handleAddPaymentMethod = () => {
    setShowFields(true);
    setEditIndex(null); // Clear edit state
  };

  const handleSavePaymentMethod = () => {
    const name = paymentMethodRef.current?.value;
    const accountNumber = accountNumberRef.current?.value;

    if (name && accountNumber) {
      const currentPaymentMethods = watch('paymentMethods') || [];
      const newPaymentMethod = { id: Date.now(), name, accountNumber }; // Generate a unique id for the new entry

      if (editIndex !== null) {
        // Editing existing payment method
        const updatedPaymentMethods = currentPaymentMethods.map((method, index) =>
          index === editIndex ? newPaymentMethod : method
        );
        setValue('paymentMethods', updatedPaymentMethods);
      } else {
        // Adding new payment method
        setValue('paymentMethods', [...currentPaymentMethods, newPaymentMethod]);
      }

      if (paymentMethodRef.current) paymentMethodRef.current.value = '';
      if (accountNumberRef.current) accountNumberRef.current.value = '';

      setShowFields(false);
    }
  };

  const handleEditPaymentMethod = (index: number) => {
    const paymentMethod = watch('paymentMethods')[index];
    if (paymentMethod) {
      if (paymentMethodRef.current) paymentMethodRef.current.value = paymentMethod.name;
      if (accountNumberRef.current) accountNumberRef.current.value = paymentMethod.accountNumber;
      setEditIndex(index);
      setShowFields(true);
    }
  };

  const handleDeletePaymentMethod = (index: number) => {
    const currentPaymentMethods = watch('paymentMethods') || [];
    const updatedPaymentMethods = currentPaymentMethods.filter((_, i) => i !== index);
    setValue('paymentMethods', updatedPaymentMethods);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-300"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Your Profile</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium mb-2">First Name</label>
            <input
              className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              {...register('firstName')}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium mb-2">Last Name</label>
            <input
              className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              {...register('lastName')}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              className="border rounded-lg py-2 px-3 text-gray-500 bg-gray-100 cursor-not-allowed"
              type="text"
              readOnly
              {...register('email')}
            />
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <label className="text-gray-700 text-sm font-medium mb-2">Payment Methods</label>
          <div className="bg-gray-100 p-4 rounded-md border border-gray-200 mb-4 text-center">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                {watch('paymentMethods', []).length > 0 ? (
                watch('paymentMethods').map((method, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-200 px-2 py-1 rounded-lg text-custom-gray">
                    {method.name} - {method.accountNumber}
                    <div className="flex space-x-2">
                        <button
                        type="button"
                        onClick={() => handleEditPaymentMethod(index)}
                        className="text-custom-gray hover:text-blue-600"
                        >
                        <MdEditSquare className="w-5 h-5" />
                        </button>
                        <button
                        type="button"
                        onClick={() => handleDeletePaymentMethod(index)}
                        className="text-custom-gray hover:text-red-600"
                        >
                        <MdDelete className="w-5 h-5" />
                        </button>
                    </div>
                    </li>
                ))
                ) : (
                <span className="text-gray-500 italic text-sm">No payment methods added yet</span>
                )}
            </ul>
            </div>

          {showFields && (
            <div className="flex flex-col gap-4 mb-4">
              <input
                ref={paymentMethodRef}
                type="text"
                placeholder="Payment Method"
                className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                ref={accountNumberRef}
                type="text"
                placeholder="Account Number"
                className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleSavePaymentMethod}
                className="bg-brown text-white font-bold py-2 px-4 rounded-lg hover:bg-light-brown hover:text-custom-gray"
              >
                {editIndex !== null ? 'Update' : 'Save'}
              </button>
            </div>
          )}
          {!showFields && (
            <button
              type="button"
              onClick={handleAddPaymentMethod}
              className="bg-gray-100 text-gray-600 flex items-center justify-center text-sm rounded-md hover:bg-gray-200 py-2 px-4"
            >
              + Add Payment Method
            </button>
          )}
        </div>

        <div className="flex justify-end mt-8">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-brown text-white font-bold py-2 px-4 rounded-lg hover:bg-light-brown hover:text-custom-gray disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageUserForm;