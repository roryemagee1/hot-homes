import Image from 'next/image';

export function Gallery({ columns, cropImages, items }) {
  const columnWidth = 100 / columns;
  let maxHeight = 0;
  let maxWidth = 0;

  if (cropImages) {
    items.forEach(item => {
      if (item.attributes.height > maxHeight) {
        maxHeight = item.attributes.height;
      }
      if (item.attributes.width > maxWidth) {
        maxWidth = item.attributes.width;
      }
    })
  }

  return (
    <div className="flex flex-wrap max-w-5xl mx-auto" >
      { 
        items.map(item => (
          <div 
            key={item.id} 
            style={{ width: `${columnWidth}%`}}
            className="p-5 flex-grow"
          >
            <Image 
              src={item.attributes.url}
              height={maxHeight || item.attributes.height}
              width={maxWidth || item.attributes.width}
              alt={item.attributes.alt}
              style={{ objectFit: "cover" }}
            />
          </div>
       ))
      }
    </div>
  )
}