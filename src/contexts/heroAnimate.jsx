import { createContext, useState } from 'react'

const HeroAnimateContext = createContext()

export const HeroAnimateProvider = ({ children }) => {
    const [heroAnimated, setHeroAnimated] = useState(false)
    const value = [heroAnimated, setHeroAnimated]

    return (
        <HeroAnimateContext.Provider value={value}>
            {children}
        </HeroAnimateContext.Provider>
    )
}

export default HeroAnimateContext
