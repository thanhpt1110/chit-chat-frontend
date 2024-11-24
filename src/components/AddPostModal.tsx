import { enqueueSnackbar } from "notistack";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { GlobalState, setAddPostModalOpen } from "../data/global/global.slice";
import { useCreatePostMutation } from "../data/post/post.api";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import Show from "./condition/Show";
import { CameraFillIcon } from "./icons/CameraFillIcon";
import { XIcon } from "./icons/XIcon";
import ImageSlider from "./ImageSlider";
import ImageWithFallback from "./ImageWithFallback";
import { Modal } from "./Modal";
import UserNameDisplay from "./UserNameDisplay";

function AddPostModal() {
  const { addPostModalOpen }: GlobalState = useAppSelector(
    (state) => state.global
  );
  const dispatch = useAppDispatch();

  const [images, setImages] = useState<string[]>([]); // Images already uploaded
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to hidden file input

  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  const handleClose = () => {
    dispatch(setAddPostModalOpen(false));
  };

  const handleButtonClick = () => {
    // Trigger the hidden input file
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...newImages]);

    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { handleSubmit, control, reset } = useForm<{ description: string }>({
    defaultValues: {
      description: "", // Initial value for the textarea
    },
  });

  const [createPost, { isLoading: isAddingPost }] = useCreatePostMutation();

  const onSubmit = async (data: { description: string }) => {
    if (images.length === 0) {
      console.error("No images selected");
      return;
    }

    const formData = new FormData();
    for (const image of images) {
      const blob = await fetch(image).then((r) => r.blob());
      formData.append("Files", blob);
    }
    formData.append("Description", data.description);

    // Log tất cả các cặp key-value trong FormData
    console.log("FormData");
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      await createPost(formData).unwrap();
      enqueueSnackbar("Post created successfully", { variant: "success" });
      reset();
      setImages([]);
      handleClose();
    } catch (error) {
      enqueueSnackbar("Failed to create post", { variant: "error" });
      console.error("Upload failed:", error);
    }
  };

  return (
    <Modal
      isOpen={addPostModalOpen}
      onClose={handleClose}
      content={
        <div className="flex flex-row h-full justify-center items-center">
          <div className="flex flex-col bg-white rounded-xl">
            <div className="w-full flex flex-row border-b">
              <div className="flex-1 py-2 text-center font-medium">
                {"Add new post"}
              </div>
              <button
                disabled={isAddingPost}
                onClick={handleSubmit(onSubmit)}
                className="px-8 py-2 h-full font-medium text-blue-400 hover:text-blue-800"
              >
                {"Share"}
              </button>
            </div>
            <div className="flex flex-row max-h-[500px]">
              <Show when={images.length > 0}>
                <ImageSlider
                  className="h-[500px] w-[500px] max-w-[500px] rounded-bl-xl"
                  images={[...images]}
                  imageClassName="h-[500px] w-[500px] object-cover"
                />
              </Show>
              <Show when={images.length === 0}>
                <div className="h-[500px] w-[500px] max-w-[500px] justify-center flex items-center flex-col rounded-bl-xl bg-white border-r">
                  <div className="border mt-16 border-gray-600 w-max h-max px-4 py-4 rounded-full">
                    <CameraFillIcon className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="font-bold text-lg text-center mt-4">
                    {"Post your photo or video"}
                  </div>
                  <div className="text-gray-500 text-center text-sm mt-2">
                    {"Share your photos and they will appear on your profile."}
                  </div>
                  <button
                    onClick={handleButtonClick}
                    className="font-semibold text-sm text-blue-400 mt-16"
                  >
                    {"Upload your image"}
                  </button>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </Show>
              <div className="flex flex-col w-[360px] ">
                <div className="px-4 py-2 flex flex-row items-center gap-1">
                  <ImageWithFallback
                    className="h-8 w-8 rounded-full"
                    alt={userInfo.displayName}
                    src={userInfo.avatarUrl}
                  />
                  <UserNameDisplay
                    className="font-medium text-sm text-blue-400"
                    username={"@" + userInfo.username}
                  />
                </div>
                <Form>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="border-b w-full h-[120px] focus:outline-none text-sm px-4 py-2"
                        placeholder="Write something here..."
                      />
                    )}
                  />
                </Form>
                <div className="flex flex-row w-full overflow-auto flex-wrap gap-4 px-4 py-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <ImageWithFallback
                        src={image}
                        alt="Image"
                        className="h-24 w-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 hover:opacity-50 opacity-80 rounded-full bg-black p-2"
                      >
                        <XIcon className="h-2 w-2 text-white" />
                      </button>
                    </div>
                  ))}
                  <Show when={images.length > 0}>
                    <button
                      onClick={handleButtonClick}
                      className="h-24 w-24 flex flex-col justify-center items-center rounded-xl border gap-2"
                    >
                      <CameraFillIcon className="h-6 w-6 text-gray-600" />
                      <div className="text-gray-600 text-xs">Add more</div>
                    </button>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </Show>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default AddPostModal;
