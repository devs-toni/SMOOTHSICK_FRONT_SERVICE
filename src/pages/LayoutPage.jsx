import { MyRouter } from "../router/MyRouter"
import { NavBar, Player } from "../components/index"

export const LayoutPage = () => {

  return (
    <>
      <NavBar />
      <MyRouter />
      <Player />
    </>
  )
}
