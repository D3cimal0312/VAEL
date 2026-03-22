
import Heading from "../common/Heading";
const Categoriespage = () => {
  return (
    <div className="p-14" >
      <Heading subheading={"shop by"} mainheading={"Browse Categories"} />

      <div className="mt-8 overflow-hidden">
        <div className="grid_layout grid grid-cols-4 grid-rows-4 gap-x-4 h-[70vh] ">
          <div className="group col-span-2 row-span-4 bg-lux  flex flex-col justify-end p-5" data-aos="fade-right">
            

            <p className="text-3xl font-cormorant">Women</p>
            <p className="text-cream font-fair text-2xl">84 Pieces</p>

            <p className=" text-cream opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 animation-all duration-500 ease-in-out">Show more →</p>

          </div>
          <div data-aos="fade-left" className="bg-lux  flex flex-col justify-end p-5 group row-span-2 ">
            
            <p className="text-3xl font-cormorant">Women</p>
            <p className="text-cream font-fair text-2xl">84 Pieces</p>
            <p className=" text-cream opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 animation-all duration-500 ease-in-out">Show more →</p>

          </div>
          <div data-aos="fade-left" className="bg-lux  flex flex-col justify-end p-5 group row-span-2 ">
            
            <p className="text-3xl font-cormorant">Women</p>
            <p className="text-cream font-fair text-2xl">84 Pieces</p>
            <p className=" text-cream opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 animation-all duration-500 ease-in-out">Show more →</p>

          </div>
          <div data-aos="fade-up" className="bg-lux  flex flex-col justify-end p-5 group mt-4 row-span-2">
            
            <p className="text-3xl font-cormorant">Women</p>
            <p className="text-cream font-fair text-2xl">84 Pieces</p>
            <p className=" text-cream opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 animation-all duration-500 ease-in-out">Show more →</p>

          </div>
          <div data-aos="fade-up" className="bg-lux  flex flex-col justify-end p-5 group mt-4 row-span-2">
            
            <p className="text-3xl font-cormorant">Women</p>
            <p className="text-cream font-fair text-2xl">84 Pieces</p>
            <p className=" text-cream opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 animation-all duration-500 ease-in-out">Show more →</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Categoriespage;
