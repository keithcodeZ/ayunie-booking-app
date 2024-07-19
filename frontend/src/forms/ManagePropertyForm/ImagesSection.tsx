import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "./ManagePropertyForm";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<PropertyFormData>();

    const existingImagesUrls = watch("imageUrls");

    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
      ) => {
        event.preventDefault();
        setValue(
          "imageUrls",
          existingImagesUrls.filter((url) => url !== imageUrl)
        );
      };

      return (
        <div>
            <span className="flex justify-between py-8 px-8">
                <h1 className="text-xl font-bold text-custom-gray"> Property Images </h1>
            </span>
          <div className="border rounded p-4 flex flex-col gap-4">
            {existingImagesUrls && (
              <div className="grid grid-cols-6 gap-4">
                {existingImagesUrls.map((url) => (
                  <div className="relative group">
                    <img src={url} className="min-h-full object-cover" />
                    <button
                      onClick={(event) => handleDelete(event, url)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

                <input
                    type="file" 
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", 
                        {
                            validate: (imageFiles) => {
                                const totalLength = imageFiles.length + (existingImagesUrls?.length || 0);

                                if(totalLength === 0) {
                                    return "At least one image must be selected"
                                }

                                if(totalLength > 6) {
                                    return "Maximum of 6 images allowed"
                                }

                                return true;
                            }
                        })}
                />
            </div>

            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.imageFiles.message}
                </span>
            )}

        </div>
    )
}

export default ImagesSection