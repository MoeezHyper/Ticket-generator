import { useState } from "react";
import { useNavigate } from "react-router";
import InfoIcon from "../assets/icon-info.svg?react";

const Form = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarError, setAvatarError] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    github: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.github.trim()) {
      newErrors.github = "GitHub username is required";
    }

    if (!avatarPreview) {
      setAvatarError("Please upload an avatar");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0 || !avatarPreview) return;

    navigate("/ticket", {
      state: {
        formData,
        avatarPreview,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container flex flex-col items-center justify-center"
    >
      {/*logo*/}
      <div className="py-6 mb-1 mt-4">
        <img src="/logo-full.svg" alt="logo" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-center text-white font-inconsolata text-[52px] leading-[60px] max-md:text-[28px] max-md:leading-[30px]">
          Your Journey to Coding <br className="md:hidden" /> Conf
          <br className="max-md:hidden" /> 2025 Starts Here!
        </p>

        <p className=" text-neutral-300 font-inconsolata py-5 text-[22px] max-md:text-[18px] text-center justify-center">
          Secure your spot at next year's <br className="md:hidden" /> biggest
          coding conference.
        </p>
      </div>

      <div className="flex flex-col items-start mt-5 font-inconsolata">
        <label className="text-white mb-2">Upload Avatar</label>

        <div
          className="w-[400px] max-md:w-[325px] h-[120px] group rounded-xl border-2 border-dashed border-neutral-500/50 bg-neutral-700/30 hover:bg-neutral-700/80 
        transition-all duration-200 overflow-hidden flex flex-col items-center justify-center"
        >
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
          >
            <div className="bg-neutral-700/50 w-[50px] h-[50px] border-1 group-hover:border-neutral-500 border-neutral-700 rounded-xl flex items-center justify-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="upload"
                  className="w-[50px] h-[50px] rounded-xl object-cover object-center border-neutral-500 border-1"
                />
              ) : (
                <img src="icon-upload.svg" alt="upload" />
              )}
            </div>
          </label>

          {avatarPreview ? (
            <div className="flex gap-4 mt-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setAvatarPreview(null);
                  setAvatarFile(null);
                  setAvatarError(false);
                  document.getElementById("avatar-upload").value = "";
                }}
                className="text-xs underline bg-neutral-700/50 text-neutral-300 px-3 py-1 rounded hover:bg-black/40 transition cursor-pointer"
              >
                Remove Image
              </button>

              <label
                htmlFor="avatar-upload"
                className="text-xs bg-neutral-700/50 text-neutral-300 px-3 py-1 rounded hover:bg-black/40 transition cursor-pointer"
              >
                Change Image
              </label>
            </div>
          ) : (
            <p className="text-neutral-300 text-sm text-center mb-4">
              Drag and drop or click to upload
            </p>
          )}
        </div>

        {/* File input */}
        <input
          id="avatar-upload"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!["image/png", "image/jpeg"].includes(file.type)) {
              setAvatarError("Only JPG or PNG files are allowed.");
              return;
            }

            if (file.size > 500 * 1024) {
              setAvatarError("File size is too big. Max 500KB.");
              return;
            }

            setAvatarError("");

            const reader = new FileReader();
            reader.onloadend = () => {
              setAvatarPreview(reader.result);
              setAvatarFile(file);
            };
            reader.readAsDataURL(file);
          }}
          className="hidden"
        />

        {/* Info row */}
        <div className="flex items-start mt-3">
          <InfoIcon
            className={`w-4 h-4 mr-1 ${
              avatarError ? "text-red-500" : "text-neutral-300"
            }`}
          />
          {avatarError ? (
            <p className="text-red-500 text-[12px] font-inconsolata">
              {avatarError}
            </p>
          ) : (
            <p className="text-neutral-300 text-[12px] font-inconsolata">
              Upload your photo (JPG or PNG, max size: 500KB).
            </p>
          )}
        </div>
      </div>

      {/*Forms*/}
      <div className="flex flex-col font-inconsolata">
        <label className="block text-white mt-5 mb-2 ml-1">Full Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-[400px] max-md:w-[325px] px-4 py-2  text-white bg-neutral-700/30 border hover:bg-neutral-700/80 border-neutral-500 rounded-xl focus:outline-2
           focus:outline-black focus:ring-[2.5px] focus:ring-white transition-all focus:duration-100 duration-0"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 -mb-2">{errors.name}</p>
        )}
      </div>

      <div className="flex flex-col font-inconsolata">
        <label className="block text-white  mt-5 mb-2 ml-1">
          Email Address
        </label>
        <input
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          className="w-[400px] max-md:w-[325px] px-4 py-2 text-white bg-neutral-700/30 border hover:bg-neutral-700/80 border-neutral-500 rounded-xl focus:outline-2
           focus:outline-black focus:ring-[2.5px] focus:ring-white transition-all focus:duration-100 duration-0"
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 -mb-2">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col font-inconsolata">
        <label className="block text-white  mt-5 mb-2 ml-1">
          GitHub Username
        </label>
        <input
          name="github"
          type="text"
          value={formData.github}
          onChange={handleChange}
          className="w-[400px] max-md:w-[325px] px-4 py-2 text-white bg-neutral-700/30 border hover:bg-neutral-700/80 border-neutral-500 rounded-xl focus:outline-2
           focus:outline-black focus:ring-[2.5px] focus:ring-white transition-all focus:duration-100 duration-0"
          placeholder="@yourusername"
        />
        {errors.github && (
          <p className="text-red-500 text-sm mt-1 -mb-2">{errors.github}</p>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <button
          className="bg-orange-700 w-[400px] max-md:w-[325px] py-2 font-inconsolata font-extrabold border border-neutral-500 rounded-xl focus:outline-2
           focus:outline-black focus:ring-[2.5px] focus:ring-white transition-all focus:duration-100 duration-0 cursor-pointer"
        >
          Generate My Ticket
        </button>
      </div>
    </form>
  );
};

export default Form;
