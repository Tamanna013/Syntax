const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image
          href="/logo.png"
          width="100"
          height="35"
          x="0"
          y="0"></image>
      </svg>
      <span className="text-3xl font-semibold ">Syntax</span>
    </div>
  );
};

const Title=({text})=>{
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h6>
  )
}

const ContactsContainer = () => {
  return (
    <div className="relative md:w-[30vw] lg:w-[30vw] xl:[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex pr-10 justify-between items-center">
          <Title text="Direct Messages" />
        </div>
      </div>
      <div className="my-5">
        <div className="flex pr-10 justify-between items-center">
          <Title text="Channels" />
        </div>
      </div>
    </div>
  )
}

export default ContactsContainer;
