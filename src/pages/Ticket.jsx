import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Ticket = () => {
  const location = useLocation();
  const { formData, avatarPreview } = location.state || {};
  const today = new Date();
  const [geoLocation, setGeoLocation] = useState({ city: "", country: "" });
  const ticketno = Math.floor(10000 + Math.random() * 90000);
  const [firstName, lastName] = formData.name.trim().split(" ");

  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        setGeoLocation({
          city: data.city,
          country: data.country,
        });
      })
      .catch((err) => console.error("Location error:", err));
  }, []);

  const formatted = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <div className="relative w-full h-screen overflow-hidden z-0">
        {/* Backgrounds and patterns... */}
        <img
          src="/background-desktop.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="/pattern-lines.svg"
          alt="Pattern Lines"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="/pattern-circle.svg"
          alt="Pattern Circle"
          className="absolute w-[250px] h-[250px] top-[calc(100%-110%)] left-[calc(100%-95.4%)] 
          max-md:w-[100px] max-md:h-[100px] max-md:left-[calc(100%-105%)] max-md:top-[calc(100%-104%)]"
        />
        <img
          src="/pattern-circle.svg"
          alt="Pattern Circle"
          className="absolute w-[250px] h-[250px] top-[calc(100%-48%)] left-[calc(100%-40%)]
          max-md:w-[100px] max-md:h-[100px] max-md:left-[calc(100%-17%)] max-md:top-[calc(100%-29%)]"
        />
        <img
          src="/pattern-squiggly-line-bottom-desktop.svg"
          alt="Squiggly Bottom"
          className="absolute bottom-[calc(100%-99.5%)] left-[calc(100%-99%)] -rotate-10 max-md:left-[calc(100%-135%)] "
        />
        <img
          src="/pattern-squiggly-line-top.svg"
          alt="Squiggly Top"
          className="absolute top-[calc(100%-90%)] right-0 max-md:right-[calc(100%-105%)] max-md:size-35 max-md:top-[calc(100%-101%)]"
        />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start">
        {/* Logo */}
        <div className="py-10 mb-2">
          <img src="/logo-full.svg" alt="logo" />
        </div>

        {/* Text block */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold text-center text-white font-inconsolata text-[52px] leading-[60px] max-md:text-[28px] max-md:leading-[30px]">
            Congrats,{" "}
            <span className="text-gradient">
              {firstName} <br className="md:hidden" /> {lastName}!
            </span>
            <br className="max-md:hidden" /> Your ticket is ready.
          </p>
          <p className="text-neutral-300 font-inconsolata py-5 text-[22px] text-center max-md:text-[18px] max-md:leading-[25px]">
            We have emailed your ticket to <br />
            <span className="text-orange-500">{formData.email}</span> and will
            send <br className="md:hidden" />
            updates in <br className="max-md:hidden" />
            the run up to the event.
          </p>
        </div>

        {/* Ticket section */}
        <div className="relative mt-20 z-10">
          <img
            src="pattern-ticket.svg"
            alt="ticket"
            className="backdrop-blur-[8px] px-3"
          />

          <div className="absolute top-0 max-md:-top-2 max-md:left-7 left-6 text-white flex font-inconsolata items-center md:ml-2">
            <img src="logo-mark.svg" alt="logo" className="max-md:size-7" />
            <div className="ml-5 max-md:ml-3 mt-4 flex flex-col">
              <p className="font-bold text-[38px] max-md:text-[24px]">
                Coding Conf
              </p>
              <p className="text-neutral-300 max-md:text-[14px]">
                {formatted} / {geoLocation.city},<br className="md:hidden" />{" "}
                {geoLocation.country}
              </p>
            </div>
          </div>

          <div className="absolute bottom-5 max-md:bottom-1 left-6 text-white flex font-inconsolata items-center mb-3 md:ml-2">
            <img
              src={avatarPreview}
              alt="avtar"
              className="h-[80px] w-[80px] max-md:h-[50px] max-md:w-[50px] rounded-xl object-contain object-center"
            />
            <div className="pl-5 max-md:pl-2">
              <p className="text-[32px] max-md:text-[20px]">{formData.name}</p>
              <div className="flex flex-row">
                <img
                  src="icon-github.svg"
                  alt="git"
                  className="max-md:size-5"
                />
                <p className="text-neutral-300 ml-2 max-md:ml-1 max-md:text-[14px]">
                  {formData.github}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute right-1 bottom-30 max-md:right-4 max-md:bottom-18 text-neutral-500 flex font-inconsolata items-center">
            <p className="rotate-90 text-3xl max-md:text-[20px]">#{ticketno}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
