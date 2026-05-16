export function Banner() {
  return (
    <div className="relative overflow-hidden h-[30vh] flex items-center mb-4">
      <div className="absolute inset-0 w-full h-full bg-stone-300 animate-pulse rounded-none" />

      <div className="relative z-10 px-14 py-8 flex flex-col gap-3">
        <div className="h-3 w-40 bg-stone-300 animate-pulse" />
        <div className="h-8 w-64 bg-stone-300 animate-pulse" />
        <div className="h-6 w-48 bg-stone-300 animate-pulse" />
        <div className="h-5 w-36 mt-1 bg-stone-300 animate-pulse" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton({ limit = 10, cols = 5 }) {
  const gridMap = {
    3: "grid-cols-[repeat(auto-fill,minmax(255px,1fr))]",
    5: "grid-cols-[repeat(auto-fill,minmax(300px,1fr))]",
  };

  return (
    <div className="w-full px-4 lg:px-14 py-7">
      <div className={`grid ${gridMap[cols] || gridMap[5]} gap-8`}>
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="flex flex-col bg-cream rounded-b-lg">
            <div className="h-72 w-full bg-stone-300 animate-pulse rounded-none" />

            <div className="px-4 py-4 flex flex-col gap-1.5">
              <div className="h-5 w-3/4 bg-stone-300 animate-pulse" />

              <div className="flex gap-2 mt-1">
                <div className="h-4 w-12 rounded-full bg-stone-300 animate-pulse" />
                <div className="h-4 w-16 rounded-full bg-stone-300 animate-pulse" />
              </div>

              <div className="h-6 w-1/3 mt-1 bg-stone-300 animate-pulse" />

              <div className="flex gap-1.5 mt-1">
                <div className="h-4 w-4 rounded-full bg-stone-300 animate-pulse" />
                <div className="h-4 w-4 rounded-full bg-stone-300 animate-pulse" />
                <div className="h-4 w-4 rounded-full bg-stone-300 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function ProductDetailSkeleton() {
  return (
    <div className="pl-12 xl:pl-0 xl:pr-14 pb-12">
      <div className="flex gap-24 flex-wrap xl:flex-nowrap">
        {/* left — images */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 h-fit w-full xl:w-200 items-center">
          <div className="h-[calc(100vh)] w-200 bg-stone-300 animate-pulse rounded-sm" />
          <div className="flex z-50 justify-center ml-4 flex-row md:absolute md:flex-col w-full md:w-fit gap-4">
            <div className="w-20 h-25 bg-stone-300 animate-pulse rounded-sm" />
            <div className="w-20 h-25 bg-stone-300 animate-pulse rounded-sm" />
            <div className="w-20 h-25 bg-stone-300 animate-pulse rounded-sm" />
          </div>
        </div>

        {/* right — info */}
        <div className="mt-12 flex flex-col gap-4 w-full">
          <div className="h-3 w-32 bg-stone-300 animate-pulse" />
          <div className="h-10 w-72 bg-stone-300 animate-pulse" />

          <div className="flex items-center gap-2">
            <div className="h-5 w-28 bg-stone-300 animate-pulse" />
            <div className="h-4 w-8 bg-stone-300 animate-pulse" />
            <div className="h-4 w-12 bg-stone-300 animate-pulse" />
          </div>

          <div className="flex gap-2">
            <div className="h-4 w-12 rounded-full bg-stone-300 animate-pulse" />
            <div className="h-4 w-16 rounded-full bg-stone-300 animate-pulse" />
            <div className="h-4 w-6 rounded-full bg-stone-300 animate-pulse" />
          </div>

          <div className="flex gap-4 items-end">
            <div className="h-16 w-40 bg-stone-300 animate-pulse" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-full bg-stone-300 animate-pulse" />
            <div className="h-4 w-full bg-stone-300 animate-pulse" />
            <div className="h-4 w-3/4 bg-stone-300 animate-pulse" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-28 bg-stone-300 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full bg-stone-300 animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-stone-300 animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-stone-300 animate-pulse" />
            </div>
          </div>

          <div className="flex gap-12">
            <div className="flex gap-4 items-center">
              <div className="h-5 w-14 bg-stone-300 animate-pulse" />
              <div className="flex gap-1">
                <div className="h-12 w-12 bg-stone-300 animate-pulse" />
                <div className="h-12 w-12 bg-stone-300 animate-pulse" />
                <div className="h-12 w-12 bg-stone-300 animate-pulse" />
                <div className="h-12 w-14 bg-stone-300 animate-pulse" />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="h-5 w-10 bg-stone-300 animate-pulse" />
              <div className="h-12 w-28 bg-stone-300 animate-pulse" />
            </div>
          </div>

          <div className="flex gap-1">
            <div className="h-16 w-full bg-stone-300 animate-pulse" />
            <div className="h-16 w-12 bg-stone-300 animate-pulse" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-12 w-full bg-stone-200 animate-pulse" />
            <div className="h-12 w-full bg-stone-200 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="pl-12 mt-12 flex flex-col gap-2">
        <div className="h-3 w-32 bg-stone-300 animate-pulse" />
        <div className="h-8 w-56 bg-stone-300 animate-pulse" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-32 bg-stone-300 animate-pulse rounded-2xl"
          />
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4 h-72 bg-stone-300 animate-pulse rounded-2xl" />
        <div className="col-span-1 h-72 bg-stone-300 animate-pulse rounded-2xl" />
      </div>

      <div className="flex gap-6">
        <div className="flex-1 h-94 bg-stone-300 animate-pulse rounded-2xl" />
        <div className="flex-1 h-94 bg-stone-300 animate-pulse rounded-2xl" />
      </div>
    </div>
  );
}


export function CartSkeleton() {
  return (
    <div className="font-fair flex flex-col md:flex-row min-h-screen">

 
      <div className="flex-1 px-6 md:px-14 py-14 bg-white">

      
        <div className="h-8 w-40 bg-stone-300 animate-pulse mb-8" />


        <div className="flex justify-between items-center mb-8">
          <div className="h-5 w-24 bg-stone-300 animate-pulse" />
          <div className="h-5 w-24 bg-stone-300 animate-pulse" />
        </div>

        
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 md:gap-8 border-b pb-6 border-gray-200">

          
              <div className="w-24 md:w-36 h-42 bg-stone-300 animate-pulse shrink-0" />

              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-24 bg-stone-300 animate-pulse" />
                    <div className="h-6 w-40 bg-stone-300 animate-pulse" />
                    <div className="h-4 w-32 bg-stone-300 animate-pulse" />

                    <div className="flex gap-1 mt-1">
                      <div className="h-8 w-8 bg-stone-300 animate-pulse" />
                      <div className="h-8 w-8 bg-stone-300 animate-pulse" />
                      <div className="h-8 w-8 bg-stone-300 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="h-8 w-20 bg-stone-300 animate-pulse" />
                </div>

  
                <div className="flex justify-between mt-2">
                  <div className="h-5 w-28 bg-stone-300 animate-pulse" />
                  <div className="h-5 w-20 bg-stone-300 animate-pulse" />
                </div>
              </div>

            </div>
          ))}
        </div>


        <div className="h-12 w-48 bg-stone-300 animate-pulse mt-6" />
      </div>

      <div className="w-full md:w-96  border-t md:border-t-0 md:border-l border-hair bg-cream-light p-4 md:p-8">

   
        <div className="h-4 w-24 bg-stone-300 animate-pulse mb-4" />

        
        <div className="flex gap-3 mb-4">
          <div className="h-9 flex-1 bg-stone-300 animate-pulse rounded-lg" />
          <div className="h-9 flex-1 bg-stone-300 animate-pulse rounded-lg" />
        </div>


        <div className="rounded-xl bg-stone-200 animate-pulse p-4 flex flex-col gap-3 mb-6">
          <div className="h-5 w-32 bg-stone-300 animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-4 w-full bg-stone-300 animate-pulse" />
            <div className="h-4 w-full bg-stone-300 animate-pulse" />
            <div className="h-4 w-full bg-stone-300 animate-pulse" />
            <div className="h-4 w-full bg-stone-300 animate-pulse" />
          </div>
          <div className="h-4 w-28 bg-stone-300 animate-pulse mt-1" />
        </div>

    
        <div className="h-7 w-40 bg-stone-300 animate-pulse mb-4" />

     
        <div className="flex flex-col gap-3 mb-8">
          {["Subtotal", "Tax", "Shipping"].map((l) => (
            <div key={l} className="flex justify-between">
              <div className="h-5 w-20 bg-stone-300 animate-pulse" />
              <div className="h-5 w-16 bg-stone-300 animate-pulse" />
            </div>
          ))}
          <div className="border-t border-stone-300 pt-3 flex justify-between mt-1">
            <div className="h-7 w-16 bg-stone-300 animate-pulse" />
            <div className="h-7 w-20 bg-stone-300 animate-pulse" />
          </div>
        </div>

        
        <div className="h-14 w-full bg-stone-300 animate-pulse" />

      </div>

    </div>
  );
}
