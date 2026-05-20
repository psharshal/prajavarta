import Image from 'next/image'

interface ImagePlaceholderProps {
  ratio?: string
  label?: string
  height?: number
  style?: React.CSSProperties
  src?: string
}

export default function ImagePlaceholder({
  ratio = '16/9',
  label = 'hero image · 1200px+',
  height,
  style,
  src,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        style={{
          position: 'relative',
          aspectRatio: height ? undefined : ratio,
          height: height || undefined,
          width: '100%',
          overflow: 'hidden',
          ...style,
        }}
      >
        <Image
          src={src}
          alt={label}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
    )
  }

  return (
    <div
      className="imgph"
      style={{
        aspectRatio: height ? undefined : ratio,
        height: height || undefined,
        width: '100%',
        ...style,
      }}
    >
      {label}
    </div>
  )
}
