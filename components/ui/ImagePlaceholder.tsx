interface ImagePlaceholderProps {
  ratio?: string
  label?: string
  height?: number
  style?: React.CSSProperties
}

export default function ImagePlaceholder({
  ratio = '16/9',
  label = 'hero image · 1200px+',
  height,
  style,
}: ImagePlaceholderProps) {
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
