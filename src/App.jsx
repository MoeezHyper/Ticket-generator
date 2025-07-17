import Form from "./pages/Form.jsx";

const App = () => {
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
      <div className="absolute inset-0 flex items-start justify-center z-10 px-5">
        <Form />
      </div>
    </div>
  );
};

export default App;
