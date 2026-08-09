function CardSkeleton({ instance }) {
    return(
        Array(instance).fill("decoy").map((_, index) => {
            return(
                <article key={index} className="flex grow flex-col p-4 border-3 border-slate-800 rounded-xl">
                    {/* Title */}
                    <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-700" />

                    {/* URL */}
                    <div className="mb-3 h-3 w-full animate-pulse rounded bg-gray-800" />

                    {/* Description / note */}
                    <div className="mb-1 h-3 w-full animate-pulse rounded bg-gray-800" />
                    <div className="mb-3 h-3 w-2/3 animate-pulse rounded bg-gray-800" />

                    {/* Tags */}
                    <div className="mb-3 flex gap-1.5">
                    <div className="h-5 w-14 animate-pulse rounded-md bg-gray-700" />
                    <div className="h-5 w-20 animate-pulse rounded-md bg-gray-700" />
                    <div className="h-5 w-12 animate-pulse rounded-md bg-gray-700" />
                    </div>

                    {/* Bottom information */}
                    <div className="mt-auto flex items-center justify-between">
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-800" />
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-800" />
                    </div>
                </article>
            );
        })
    );
}

export default CardSkeleton;