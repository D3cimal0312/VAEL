
const Animatebtn = ({ str, outofStock=false }) => {

  return (
    <button
      className="bg-lux relative px-6 py-2 group h-16 w-full overflow-hidden cursor-pointer flex justify-center items-center"
      disabled={outofStock}
    >
      <div
        className={`absolute inset-0 z-10  w-full h-full 
        ${outofStock ? "bg-gray-500/80 cursor-not-allowed" : "bg-black transition-transform duration-600 ease-in-out group-hover:translate-x-full"}`}
      />
      <div className="relative z-20 text-white text-2xl group-hover:text-cream transition-all duration-600 ease-in-out">
        <div className="w-full font-bold">
          {outofStock ? "Out of Stock" : str}
        </div>
      </div>
    </button>
  );
};

export default Animatebtn;
