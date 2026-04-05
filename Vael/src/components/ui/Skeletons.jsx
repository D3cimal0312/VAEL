import { Skeleton } from "@/components/ui/skeleton"


export function Banner (){

  return(
 <div className='relative overflow-hidden h-[30vh] flex items-center mb-4'>
      
      <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-stone-300" />

      <div className='relative z-10 px-14 py-8 flex flex-col gap-3'>

        <Skeleton className="h-3 w-40 bg-stone-300" />

        <Skeleton className="h-8 w-64 bg-stone-300" />

        <Skeleton className="h-6 w-48 bg-stone-300" />

        <Skeleton className="h-5 w-36 bg-stone-300 mt-1" />

      </div>
    </div>
  )
}

export function ProductCardSkeleton({ limit = 10, cols = 5 }) {
  const gridMap = {
    3: 'grid-cols-[repeat(auto-fill,minmax(255px,1fr))]',
    5: 'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
  }

  return (
    <div className='w-full px-4 lg:px-14 py-7'>
      <div className={`grid ${gridMap[cols] || gridMap[5]} gap-8`}>
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="flex flex-col bg-cream rounded-b-lg">

            <Skeleton className="h-72 w-full rounded-none bg-stone-300" />

            <div className="px-4 py-4 flex flex-col gap-1.5">

              <Skeleton className="h-5 w-3/4 bg-stone-300" />

              <div className="flex gap-2 mt-1">
                <Skeleton className="h-4 w-12 rounded-full bg-stone-300" />
                <Skeleton className="h-4 w-16 rounded-full bg-stone-300" />
              </div>

              <Skeleton className="h-6 w-1/3 mt-1 bg-stone-300" />

              <div className="flex gap-1.5 mt-1">
                <Skeleton className="h-4 w-4 rounded-full bg-stone-300" />
                <Skeleton className="h-4 w-4 rounded-full bg-stone-300" />
                <Skeleton className="h-4 w-4 rounded-full bg-stone-300" />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="pl-12 xl:pl-0 xl:pr-14 pb-12">

      {/* main product section */}
      <div className="flex gap-24 flex-wrap xl:flex-nowrap">

        {/* left — image section */}
        <div className="flex-wrap md:flex-nowrap flex gap-4 h-fit items-center w-full xl:w-200">

          {/* main image */}
          <Skeleton className="h-[calc(100vh)] w-200 bg-stone-300 rounded-sm" />

          {/* thumbnails */}
          <div className="z-50 flex justify-center ml-4 flex-row md:absolute md:flex-col w-full md:w-fit gap-4">
            <Skeleton className="w-20 h-25 bg-stone-300 rounded-sm" />
            <Skeleton className="w-20 h-25 bg-stone-300 rounded-sm" />
            <Skeleton className="w-20 h-25 bg-stone-300 rounded-sm" />
          </div>
        </div>

        {/* right — info section */}
        <div className="mt-12 flex flex-col gap-4 w-full">

          {/* category subheading + product name */}
          <Skeleton className="h-3 w-32 bg-stone-300" />
          <Skeleton className="h-10 w-72 bg-stone-300" />

          {/* rating row */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-28 bg-stone-300" />
            <Skeleton className="h-4 w-8 bg-stone-300" />
            <Skeleton className="h-4 w-12 bg-stone-300" />
          </div>

          {/* tags */}
          <div className="flex gap-2">
            <Skeleton className="h-4 w-12 rounded-full bg-stone-300" />
            <Skeleton className="h-4 w-16 rounded-full bg-stone-300" />
            <Skeleton className="h-4 w-6 rounded-full bg-stone-300" />
          </div>

          {/* price — original strikethrough + discount % + main price */}
          <div className="flex gap-4 items-end">

            <Skeleton className="h-16 w-40 bg-stone-300" />
          </div>

          {/* description lines */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full bg-stone-300" />
            <Skeleton className="h-4 w-full bg-stone-300" />
            <Skeleton className="h-4 w-3/4 bg-stone-300" />
          </div>

          {/* color label + dots */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28 bg-stone-300" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full bg-stone-300" />
              <Skeleton className="h-8 w-8 rounded-full bg-stone-300" />
              <Skeleton className="h-8 w-8 rounded-full bg-stone-300" />
            </div>
          </div>

          {/* sizes + qty row */}
          <div className="flex gap-12">

            {/* sizes */}
            <div className="flex gap-4 items-center">
              <Skeleton className="h-5 w-14 bg-stone-300" />
              <div className="flex gap-1">
                <Skeleton className="h-12 w-12 bg-stone-300" />
                <Skeleton className="h-12 w-12 bg-stone-300" />
                <Skeleton className="h-12 w-12 bg-stone-300" />
                <Skeleton className="h-12 w-14 bg-stone-300" />
              </div>
            </div>

            {/* qty */}
            <div className="flex gap-4 items-center">
              <Skeleton className="h-5 w-10 bg-stone-300" />
              <Skeleton className="h-12 w-28 bg-stone-300" />
            </div>
          </div>

          {/* add to cart + wishlist buttons */}
          <div className="flex gap-1">
            <Skeleton className="h-16 w-full bg-stone-300" />
            <Skeleton className="h-16 w-12 bg-stone-300" />
          </div>

          {/* accordions */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-12 w-full bg-stone-200" />
            <Skeleton className="h-12 w-full bg-stone-200" />
          </div>

        </div>
      </div>

      {/* you may also like section */}
      <div className="pl-12 mt-12 flex flex-col gap-2">
        <Skeleton className="h-3 w-32 bg-stone-300" />
        <Skeleton className="h-8 w-56 bg-stone-300" />
      </div>

    </div>
  )
}

export function CartSkeleton() {

}