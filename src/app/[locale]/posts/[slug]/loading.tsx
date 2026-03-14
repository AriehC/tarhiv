import { Skeleton } from "@/components/ui/Skeleton";

export default function PostLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar placeholder */}
      <div className="h-20" />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link skeleton */}
          <Skeleton variant="text" width={120} className="mb-8" />

          {/* Title skeleton */}
          <Skeleton variant="rect" className="w-full h-10 mb-4" />
          <Skeleton variant="rect" className="w-3/4 h-10 mb-8" />

          {/* Meta skeleton */}
          <div className="flex items-center gap-4 mb-8">
            <Skeleton variant="circle" width={40} height={40} />
            <div className="space-y-1">
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={80} />
            </div>
          </div>

          {/* Hero image skeleton */}
          <Skeleton variant="rect" className="w-full aspect-[16/9] mb-8" />

          {/* Content skeletons */}
          <div className="space-y-4">
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-5/6" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-3/4" />

            <div className="py-4" />

            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-2/3" />

            <Skeleton variant="rect" className="w-full h-60 my-4" />

            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-4/5" />
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-surface-200" />

          {/* Comment section skeleton */}
          <div className="space-y-4">
            <Skeleton variant="text" width={150} className="h-6" />
            <Skeleton variant="rect" className="w-full h-24" />
            <div className="space-y-4 mt-6">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton variant="circle" width={28} height={28} />
                    <Skeleton variant="text" width={120} />
                  </div>
                  <Skeleton variant="text" className="w-4/5" />
                  <Skeleton variant="text" className="w-3/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
