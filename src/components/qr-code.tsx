'use client'

import { useQRCode } from 'next-qrcode';

type Props = {
  url: string
}

export function QRCode({ url }: Props) {
  const { Canvas } = useQRCode();

  return (
    <div>
      <Canvas
        text={url}
        options={{
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#000',
            light: '#fff',
          },
        }}
      />
    </div>

  )
}