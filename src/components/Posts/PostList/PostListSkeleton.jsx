const PostListSkeleton = () => {
  const skeletonItems = Array(6).fill(null);

  return (
    <div className='flex flex-wrap mb-32 -mx-4'>
      {skeletonItems.map((_, index) => (
        <div key={index} className='w-full md:w-1/2 lg:w-1/3 p-4'>
          <div className='bg-white border border-gray-100 rounded-2xl h-full p-3'>
            {/* Image skeleton */}
            <div className='relative' style={{ height: 240 }}>
              <div className='w-full h-full bg-gray-200 animate-pulse rounded-2xl' />
            </div>

            <div className='pt-3 pb-3 px-2'>
              {/* Author skeleton */}
              <div className='inline-flex pt-3 pb-3 gap-2 items-center'>
                <div className='h-10 w-10 bg-gray-200 animate-pulse rounded-full' />
                <div className='h-4 w-32 bg-gray-200 animate-pulse rounded' />
              </div>

              {/* Description skeleton */}
              <div className='space-y-2 mb-4'>
                <div className='h-4 w-full bg-gray-200 animate-pulse rounded' />
                <div className='h-4 w-full bg-gray-200 animate-pulse rounded' />
                <div className='h-4 w-2/3 bg-gray-200 animate-pulse rounded' />
              </div>

              {/* Footer skeleton */}
              <div className='flex flex-wrap items-center gap-3'>
                <div className='h-4 w-24 bg-gray-200 animate-pulse rounded' />
                <div className='h-4 w-4 bg-gray-200 animate-pulse rounded-full' />
                <div className='h-6 w-20 bg-gray-200 animate-pulse rounded-md' />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostListSkeleton;
