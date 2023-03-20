import Cover from "../components/Home/Cover"
import Section from "../components/Home/Section"

export const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full w-full mt-20">
        <div className="h-3/4 w-9/12">
          <Cover />
          <Section />
        </div>
      </div>
    </div>
  )
}
