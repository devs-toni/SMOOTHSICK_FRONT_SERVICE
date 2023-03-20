import Cover from "../components/Home/Cover"
import Section from "../components/Home/Section"

export const HomePage = () => {
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full w-full mt-20">
        <div className="w-5/6 md:flex md:w-3/5 p-2 lg:w-10/12">
          <Cover />
          <Section />
        </div>
      </div>
    </div>
  )
}
