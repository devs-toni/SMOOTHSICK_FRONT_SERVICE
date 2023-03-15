
import { NavBar } from "../components/NavBar/NavBar"
import { MyRouter } from "../router/MyRouter"

export const Layout = () => {
    return (
        <div>
            <p className="text-9xl font-black">MUESTRATE</p>
            <NavBar/>
            <MyRouter/>
        </div>
    )
}
