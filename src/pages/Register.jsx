import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useLanguage } from "../context/LanguageContext";

const Register = () => {

  const { text } = useLanguage();

  return (
      <form className="flex flex-col gap-4 max-w-md px-10 pb-8 pt-7 m-auto bg-neutral-700 rounded-md">
        <p className="text-2xl font-bold">{text.register.title}</p>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email2"
              value="Your email"
            />
          </div>
          <TextInput
            id="email2"
            type="email"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password2"
              value="Your password"
            />
          </div>
          <TextInput
            id="password2"
            type="password"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="repeat-password"
              value="Repeat password"
            />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            required={true}
            shadow={true}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree">
            I agree with the
            <a
              href="/forms"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </Label>
        </div>
        <Button type="submit">
          Register new account
        </Button>
      </form>
  )
}

export default Register;