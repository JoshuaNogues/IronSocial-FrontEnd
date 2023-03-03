import { ThemeContext } from "../context/theme.context"
import { useContext } from "react"

const Home = () => {

    const { mode } = useContext(ThemeContext)

  return (
    <div className={"Home " + mode}><h1>Timeline</h1></div>
  )
}

export default Home