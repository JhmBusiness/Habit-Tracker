export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-bg-light px-20 py-15 rounded-lg md:rounded-xl">
        <h1 className="flex items-center gap-1 mb-2">
          Loading
          <span className="flex">
            <span className="animate-bounce [animation-delay:0ms]">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </h1>
        <div className="h-1 bg-gray-100 overflow-hidden rounded-full">
          <div className="h-full bg-gradient-to-r from-light-blue to-primary-accent animate-[slide_1.6s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
