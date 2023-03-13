import { createContext, useState } from "react"
import { Appearance } from "react-native"

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(Appearance.getColorScheme() || "light");

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            setTheme: setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}