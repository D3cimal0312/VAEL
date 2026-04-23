


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
    3: 'grid-cols-[repeat(auto-fill,minmax(255px,1fr))]',
    5: 'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
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