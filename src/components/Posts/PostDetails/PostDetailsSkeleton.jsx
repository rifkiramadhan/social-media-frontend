const PostDetailsSkeleton = () => {
  const skeletonComments = Array(3).fill(null);

  return (
    <div className='mx-auto px-4 sm:px-8 lg:px-8 bg-gray-100'>
      <div className='pt-10'>
        {/* Main Post Content */}
        <div className='bg-white rounded-lg shadow-4xl p-2'>
          {/* Image Skeleton */}
          <div className='w-full h-96 bg-gray-200 animate-pulse rounded-lg mb-4' />

          {/* Action Buttons Skeleton */}
          <div className='flex gap-4 items-center mb-4'>
            {/* Like, Dislike, Views buttons */}
            {[1, 2, 3].map((_, index) => (
              <div key={index} className='flex items-center gap-1'>
                <div className='w-6 h-6 bg-gray-200 animate-pulse rounded-full' />
                <div className='w-8 h-4 bg-gray-200 animate-pulse rounded' />
              </div>
            ))}
          </div>

          {/* Follow Button Skeleton */}
          <div className='w-28 h-10 bg-gray-200 animate-pulse rounded-md' />

          {/* Author Section Skeleton */}
          <div className='flex justify-between items-center'>
            <div className='flex font-bold pt-6 pb-3 px-2 gap-2 items-center'>
              {/* Author Avatar */}
              <div className='h-10 w-10 bg-gray-200 animate-pulse rounded-full' />
              {/* Author Name */}
              <div className='w-32 h-6 bg-gray-200 animate-pulse rounded' />
            </div>

            {/* Edit/Delete Buttons Skeleton */}
            <div className='flex gap-2'>
              <div className='w-24 h-10 bg-gray-200 animate-pulse rounded-md' />
              <div className='w-24 h-10 bg-gray-200 animate-pulse rounded-md' />
            </div>
          </div>

          {/* Post Description Skeleton */}
          <div className='mt-6 mb-3 space-y-2'>
            <div className='w-full h-4 bg-gray-200 animate-pulse rounded' />
            <div className='w-full h-4 bg-gray-200 animate-pulse rounded' />
            <div className='w-3/4 h-4 bg-gray-200 animate-pulse rounded' />
          </div>
        </div>

        {/* Comments Section */}
        <div className='bg-white rounded-lg shadow-4xl p-2 mt-5'>
          {/* Comment Form Skeleton */}
          <div className='w-full h-32 bg-gray-200 animate-pulse rounded-lg mb-2' />
          <div className='w-28 h-10 bg-gray-200 animate-pulse rounded-md mb-6' />

          {/* Comments List Title */}
          <div className='w-32 h-6 bg-gray-200 animate-pulse rounded mb-6' />

          {/* Comments List */}
          <div className='space-y-4'>
            {skeletonComments.map((_, index) => (
              <div key={index} className='border-b border-gray-200 pb-4'>
                {/* Comment Header */}
                <div className='flex items-center gap-2 mb-2'>
                  <div className='h-5 w-5 bg-gray-200 animate-pulse rounded-full' />
                  <div className='w-24 h-4 bg-gray-200 animate-pulse rounded' />
                  <div className='w-4 h-4 bg-gray-200 animate-pulse rounded-full' />
                  <div className='w-20 h-4 bg-gray-200 animate-pulse rounded' />
                </div>
                {/* Comment Content */}
                <div className='space-y-2'>
                  <div className='w-full h-4 bg-gray-200 animate-pulse rounded' />
                  <div className='w-3/4 h-4 bg-gray-200 animate-pulse rounded' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsSkeleton;
