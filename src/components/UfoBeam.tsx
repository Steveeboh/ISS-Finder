import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import productPhotography1png from '/assets/versteigerung/product_chocolate.png'
import productPhotography2png from '/assets/versteigerung/product_gift.png'
import productPhotography3png from '/assets/versteigerung/product_phone.png'
import UfoImageOhne from '/assets/ufo_versteigerung_ohne.png'

export function UfoBeam() {
    const [stars, setStars] = useState<{ x: number; y: number; delay: number }[]>([])

    useEffect(() => {
        const newStars = Array.from({length: 20}, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 2,
        }))
        setStars(newStars)
    }, [])

    return (
        <div className="relative min-h-fit w-full bg-[#0a001f] overflow-x-hidden overflow-y-hidden">
            {/* Stars in the background */}
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-300"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 2,
                        delay: star.delay,
                        repeat: Infinity,
                    }}
                />
            ))}

            {/* UFO */}
            <motion.div
                className="w-full h-40 flex justify-center z-7 -mt-20"
                animate={{y: [0, -10, 0]}}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="relative w-640 h-auto">
                    <motion.img
                        src={UfoImageOhne}
                        alt="UFO Image"
                        className="w-640 h-auto object-contain"
                        animate={{
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </motion.div>

            {/* Central light beam */}
            <div className="absolute left-1/2 h-full w-full -translate-x-1/2">
                <div
                    className="h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-20"
                    style={{
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                />
            </div>

            {/* Alternating images with animations */}
            <div className="relative mx-auto max-w-4xl">
                {/* First image - Right side */}
                <div className="h-screen flex items-center lg:justify-end sm:justify-center p-4">
                    <motion.div
                        className="w-64 aspect-[4/5]"
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="w-full h-full">
                            <img
                                src={productPhotography1png}
                                alt="Product Photography Placeholder 1"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Second image - Left side */}
                <div className="h-screen flex items-center lg:justify-start sm:justify-center p-4">
                    <motion.div
                        className="w-64 aspect-[4/5]"
                        animate={{
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="w-full h-full">
                            <img
                                src={productPhotography2png}
                                alt="Product Photography 2"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Third image - Right side */}
                <div className="h-screen flex items-center lg:justify-end sm:justify-center p-4">
                    <motion.div
                        className="w-64 aspect-[4/5]"
                        animate={{
                            y: [-20, 0, -20],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="w-full h-full">
                            <img
                                src={productPhotography3png}
                                alt="Product Photography 3"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}