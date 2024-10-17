const CategoryListSkeleton = () => {
  const skeletonItems = Array(6).fill(null);

  return (
    <div className='relative mb-10'>
      <div className='overflow-hidden'>
        {/* Container untuk skeleton items */}
        <div className='flex gap-2'>
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className='px-1 flex-shrink-0'
              style={{ width: 'calc(100% / 6)' }}
            >
              {/* Skeleton button dengan animasi pulse */}
              <div className='h-10 w-full rounded-full bg-gray-200 animate-pulse'></div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className='absolute top-0 left-0 bottom-0 from-white to-transparent pointer-events-none'></div>
      <div className='absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none'></div>
    </div>
  );
};

export default CategoryListSkeleton;
