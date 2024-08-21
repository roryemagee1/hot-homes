import Image from 'next/image'

export function Cover({ children, background}) {
  return (
    <div className="h-screen text-white bg-slate-700 relative min-h-[400px] flex justify-center items-center">
      <Image 
        alt="cover" 
        src={background} 
        fill  
        className="mix-blend-soft-light object-cover"
        priority={true}
      />
      <div className="max-w-5xl z-10">
        {children}
      </div>
    </div>
  )
}