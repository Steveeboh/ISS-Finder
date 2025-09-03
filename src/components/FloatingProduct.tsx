import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface FloatingProductProps {
    imageUrl: string
    position: number // 0 to 1, represents vertical position
    angle: number // 0 to 360, represents position around the beam
    distance: number // distance from beam center in vw units
}

export function FloatingProduct({ imageUrl, position, angle, distance }: FloatingProductProps) {
    const productRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: productRef,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0, 1, 1, 0]
    )

    // Calculate position based on angle and distance
    const x = Math.cos(angle * Math.PI / 180) * distance

    return (
        <motion.div
            ref={productRef}
            className="absolute left-1/2"
            style={{
                top: `${position * 100}%`,
                x: `calc(${x}vw - 50%)`,
                opacity,
            }}
        >
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <img
                    src={imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Connecting line to beam */}
                <div 
                    className="absolute top-1/2 left-1/2 h-px bg-white/30"
                    style={{
                        width: `${distance}vw`,
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: angle > 180 ? 'left' : 'right',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                    }}
                />
            </div>
        </motion.div>
    )
} 