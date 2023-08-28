import { getUserSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import Link from "next/link"

const IndexPage = async () => {

  const user = await getUserSession()

  const findUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })

  return (
    <>
      <div
        className="
        bg-blue
        grotesk
        absolute
        top-0
        h-7
        w-full 
        text-center
        text-sm
        leading-6
        text-white
      "
      >
        Scelerisque egestas et euismod.
        <a href="/" className="pl-3 underline">
          Take me there
        </a>
      </div>
      <div className="grotesk mt-6 mb-16 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-20 sm:px-0 md:px-6">
        <div className="mt-4 inline-block pb-4 pl-8">
          <a href="/" className="align-middle text-3xl font-bold text-black">
            NINE4
          </a>
          <div className="hidden pl-14 align-middle xl:inline-block">
            <a href="/" className="pr-12 text-xl text-black">
              Cras.
            </a>
            <a href="/" className="pr-12 text-xl text-black">
              Cras.
            </a>
            <a href="/" className="pr-12 text-xl text-black">
              Fringilla.
            </a>
            <a href="/" className="text-xl text-black">
              Enim.
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden py-1 text-right xl:inline-block">

            {
              user ? (
                <Link
                  href="/auth/register"
                  className="mt-2 inline-flex items-center px-12 py-3 text-lg font-semibold tracking-tighter text-black"
                >
                  Salir, {user.name}
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="mt-2 inline-flex items-center px-12 py-3 text-lg font-semibold tracking-tighter text-black"
                >
                  Log in
                </Link>
              )
            }

            <a
              className="bg-blue mt-2 inline-flex items-center px-8 py-3 text-lg font-semibold tracking-tighter text-white"
              href="/"
            >
              Request a demo
            </a>
          </div>
          <button className="pr-12 pl-4">
            <svg
              className="mr-auto inline-block text-black xl:hidden"
              width="33"
              height="50"
              viewBox="0 0 23 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.892578 10.8691H22.1058"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M0.892578 18.8691H22.1058"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M22.1066 14.8688H0.893399"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>


      {/* LAYOUT */}

      <div className="grotesk max-w-8xl mx-auto" >
        <section className="w-full text-black">
          <div className="max-w-8xl mx-auto inline-block items-center p-3 pt-0 lg:flex lg:flex-wrap lg:pt-4">
            <div className="lg:w-3/6">
              <h2 className="max-w-xl lg:text-[4.2em] text-3xl font-bold leading-none text-black inline-block">
                Vel quis feugiat pharetra diam.
              </h2>

              <p className="mt-6 max-w-2xl text-xl font-semibold text-[#404040]">
                Lorem ipsum urna, consectetur adipiscing elit. Urna risus
                hendrerit dignissim duis fringilla sit. Lacus porttitor neque
                ipsum.
              </p>
            </div>
            <div className="mb-20 mt-44 hidden w-full flex-col lg:mt-12 lg:inline-block lg:w-3/6">
              <img src="/images/placeholder.png" alt="Hero" />
            </div>
            <div className="my-20 inline-block w-full flex-col lg:mt-0 lg:hidden lg:w-2/5">
              <img src="/images/placeholder.png" alt="image" />
            </div>
          </div>
          <div className="mt-0 bg-white lg:mt-40">
            <div className="mx-auto">
              <div className="mx-auto px-5 py-24 lg:px-24">
                <div className="my-10 flex w-full flex-col text-center">
                  <h2 className="mb-5 text-2xl font-bold text-black lg:text-3xl">
                    In ullamcorper magna nunc, non molestie augue feugiat eget.
                  </h2>
                </div>
                <div
                  className="
                grid grid-cols-2
                gap-16
                text-center
                lg:grid-cols-6"
                >
                  <div className="hidden items-center justify-center lg:inline-block">
                    <img
                      src="/images/segment.png"
                      alt="Segment"
                      className="block h-24 object-contain"
                    />
                  </div>
                  <div className="hidden items-center justify-center lg:inline-block">
                    <img
                      src="/images/segment.png"
                      alt="Segment"
                      className="block h-24 object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src="/images/segment.png"
                      alt="Segment"
                      className="block h-24 object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src="/images/segment.png"
                      alt="Segment"
                      className="block h-24 object-contain"
                    />
                  </div>
                  <div className="hidden items-center justify-center lg:inline-block">
                    <img
                      src="/images/segment.png"
                      alt="Segment"
                      className="block h-24 object-contain"
                    />
                  </div>
                  <div className="hidden items-center justify-center lg:inline-block">
                    <img
                      src="/images/segment.png"
                      alt="Segment"
                      className="block h-24 object-contain"
                    />
                  </div>
                </div>
                <div className="my-12 flex w-full flex-col pl-8 text-center">
                  <a
                    href="/"
                    className="
                  underline-blue
                  mb-8
                  mt-6
                  text-xl
                  font-bold
                  text-black
                "
                  >
                    Ut eleifend.
                  </a>
                </div>
              </div>
            </div>
            <div className="text-black">
              <div
                className="
              max-w-9xl
              mx-auto
              flex
              flex-col
              items-center
              justify-center
              px-5
            "
              >
                <div className="mr-0 mb-6 w-full py-4 text-center lg:w-2/3">
                  <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
                    Sem enim cursus orci at.
                  </h2>
                  <p className="mb-4 text-lg leading-relaxed">
                    In ullamcorper magna nunc, non molestie augue feugiat eget.
                    Mauris, vitae et, vitae et cursus amet tincidunt feugiat
                    nulla. Senectus maecenas diam risus sodales dictum eu. Eget
                    cursus sit bibendum pulvinar faucibus vitae nam sed. Faucibus
                    vel laoreet.
                  </p>
                  <a href="/" className="underline-blue font-semibold">
                    Learn more
                  </a>
                </div>
                <img
                  className="
                lg:w-5/7
                mb-40
                hidden
                w-5/6
                rounded object-cover
                object-center
                lg:inline-block 
                lg:w-4/6
              "
                  src="/images/placeholder.png"
                  alt="img"
                />

                <img
                  className="
              mb-24
              inline-block
              w-5/6
              rounded
              object-cover object-center
              lg:hidden
              lg:w-4/6 
            "
                  src="/images/placeholder.png"
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto px-5 pt-32 pb-24 lg:px-24">
            <div className="my-3 flex w-full flex-col text-left lg:text-center">
              <h2 className="bold mb-8 text-4xl font-bold leading-tight text-black lg:text-6xl">
                Lorem ipsum elit sit unar,{" "}
                <br className="hidden lg:inline-block" />
                consectetur adipiscing elit.
              </h2>
            </div>
            <div className="flex w-full flex-col text-left lg:text-center">
              <h3 className="text-2xl text-black">
                Lorem ipsum arcu, consectetur adipiscing elit. Viverra elementum
                pellentesque <br className="hidden lg:inline-block" />
                tortor, luctus blandit sed dolor et, semper. Posuere vitae vitae,
                ac mus. Arcu quis feugiat.
              </h3>
            </div>
            <div className="flex w-full flex-row justify-center pt-24 text-center">
              <a
                href="/"
                className="underline-blue px-8 text-xl font-semibold text-black"
              >
                Ut eleifend.
              </a>
              <a
                href="/"
                className="underline-gray px-6 text-xl font-semibold text-gray-700"
              >
                Tempus in.
              </a>
            </div>
          </div>
          <div className="invisible mx-auto flex max-w-6xl p-3 pb-32 lg:visible lg:px-2">
            <img src="/images/placeholder.png" alt="img" />
          </div>
          <div className="bg-white text-black">
            <div className="mx-auto flex flex-col items-center px-5 pt-56 lg:flex-row">
              <div className="mb-16 flex flex-col text-left lg:mb-0 lg:w-1/2 lg:flex-grow lg:items-start lg:pr-16 lg:pr-6">
                <h2 className="mb-4 text-4xl font-bold leading-none sm:text-5xl">
                  Bibendum tortor et sit convallis nec morbi.
                </h2>
                <p className="font-3xl mb-8 font-semibold leading-relaxed">
                  Lorem ipsum auctor sit amet, consectetur adipiscing elit. Sit a
                  egestas tortor viverra nisl, in non. Neque viverra sollicitudin
                  amet volutpat auctor amet. Aliquam pellentesque condimentum
                  mauris sit tincidunt egestas ullamcorper sit.{" "}
                </p>
              </div>
              <div className="lg:w-full lg:max-w-2xl">
                <img src="/images/placeholder.png" alt="img" />
              </div>
            </div>
            <div className="mt-32">
              <div className="mx-auto flex flex-col px-5 py-24 text-left lg:flex-row">
                <div className="hidden lg:inline-block lg:w-full lg:max-w-xl">
                  <img src="/images/placeholder.png" alt="img" />
                </div>
                <div className="flex flex-col pt-0 text-left lg:w-1/2 lg:flex-grow lg:items-start lg:pl-16 lg:pl-24 lg:pt-24">
                  <h2 className="mb-4 text-4xl font-bold leading-none sm:text-5xl">
                    Eu diam in magna blandit sit magna dolor proin velit.
                  </h2>
                  <p className="mb-8 font-semibold leading-relaxed text-black">
                    Lorem ipsum ac neque, consectetur adipiscing elit. Nibh neque,
                    ut purus donec sed donec semper ac vestibulum. Mi urna,
                    facilisis arcu, auctor elit. Ut nunc non aenean netus ut.
                  </p>
                </div>
                <div className="inline-block lg:hidden lg:w-full lg:max-w-xl">
                  <img src="/images/placeholder.png" alt="img" />
                </div>
              </div>
            </div>
            <div className="my-24 p-4 text-black">
              <div className="max-w-9xl mx-auto flex flex-col items-center bg-gradient-to-r from-blue-200 to-blue-100 px-5 py-24 lg:flex-row">
                <div className="flex flex-col items-center pb-16 pl-0 text-center lg:mb-0 lg:w-1/2 lg:flex-grow lg:items-start lg:pl-12 lg:pr-24 lg:text-left">
                  <h2 className="pb-4 text-2xl font-bold leading-tight lg:text-4xl">
                    Lorem ipsum mi at amet, consecteturadipiscing elit. Mattis.
                  </h2>
                  <p className="text-md mb-8 lg:text-xl">
                    Lorem ipsum praesent amet, consectetur adipiscing elit. Cursus
                    ullamcorper id tristique tincidunt. Tincidunt feugiat at mi
                    feugiat hendrerit. Ac faucibus accumsan, quis lacus, lectus
                    eget bibendum. At praesent quisque sollicitudin fusce.
                  </p>
                </div>
                <div className="w-4/7 pr-12 lg:w-2/5">
                  <img
                    src="/images/placeholder.png"
                    className="hidden object-cover object-center lg:inline-block"
                    alt="image"
                  />
                  <img
                    src="/images/placeholder.png"
                    className="inline-block object-cover object-center lg:hidden"
                    alt="image"
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto">
              <div className="max-w-8xl mx-auto px-5 py-24 lg:px-24">
                <div className="my-6 flex w-full flex-col text-left lg:text-center">
                  <h3 className="mb-8 text-5xl font-bold text-black">
                    Dui tellus quis magna id ultricies eu sed.
                  </h3>
                  <h3 className="mb-12 px-0 text-lg font-semibold text-gray-900 lg:px-52">
                    Lorem ipsum accumsan arcu, consectetur adipiscing elit.
                    Aliquet vestibulum molestie amet, maecenas id amet. Ipsum
                    accumsan arcu, aenean viverra penatibus quis. Laoreet.
                  </h3>
                </div>
                <img src="/images/placeholder.png" alt="img" />
              </div>
            </div>
            <div className="text-black">
              <div className="max-w-8xl mx-auto flex flex-col px-5 py-48 text-black lg:flex-row">
                <div className="lg:mb-0 lg:w-full lg:max-w-xl">
                  <img
                    className="rounded object-cover object-center"
                    alt="image"
                    src="/images/placeholder1.png"
                  />
                </div>
                <div className="items-left flex flex-col pt-16 text-left lg:w-1/2 lg:flex-grow lg:items-start lg:pl-32 lg:pl-48 lg:text-left">
                  <h2 className="mb-2 text-lg leading-tight text-gray-700 sm:text-lg">
                    Viverra enim diam gravida risus nisl.
                  </h2>
                  <h2 className="mb-6 text-lg font-bold sm:text-lg">
                    Lectus eu.
                  </h2>
                  <h2 className="mb-4 text-3xl font-bold sm:text-3xl">
                    Lorem ipsum accumsan arcu, consectetur adipiscing elit. Sed
                    eget enim vel.
                  </h2>
                  <a
                    href="/"
                    className="underline-blue mt-12 text-lg font-bold leading-relaxed"
                  >
                    Ut convallis massa.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >


      {/* FOOTER */}

      < footer className="grotesk bg-[#f9fbfb]" >
        <div className="max-w-8xl mx-auto px-5 py-24 text-black">
          <div className="order-first flex flex-wrap text-left">
            <div className="w-full px-4 md:w-2/4 lg:w-1/5">
              <h2 className="mb-3 text-lg tracking-widest">Est.</h2>
              <nav className="list-none space-y-2 py-3">
                <li>
                  <a href="/">Vitae nec.</a>
                </li>
                <li>
                  <a href="/">Purus</a>
                </li>
                <li>
                  <a href="/">Nibh.</a>
                </li>
                <li>
                  <a href="/">Proin semper justo.</a>
                </li>
                <li>
                  <a href="/">Blandit.</a>
                </li>
                <li>
                  <a href="/">Malesuada.</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 md:w-2/4 lg:w-1/5">
              <h2 className="mb-3 text-lg tracking-widest">Et.</h2>
              <nav className="mb-10 list-none space-y-2 py-3">
                <li>
                  <a href="/">Ninc elementum.</a>
                </li>
                <li>
                  <a href="/">Sit ac interdum</a>
                </li>
                <li>
                  <a href="/">Ac ut cras.</a>
                </li>
                <li>
                  <a href="/">Sed ipsum lobortis.</a>
                </li>
                <li>
                  <a href="/">Nulla maecenas nunc.</a>
                </li>
                <li>
                  <a href="/">Purus</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 md:w-2/4 lg:w-1/5">
              <h2 className="mb-3 text-lg tracking-widest">Placerat.</h2>
              <nav className="mb-10 list-none space-y-2 py-3">
                <li>
                  <a href="/">Et cursus fringilla.</a>
                </li>
                <li>
                  <a href="/">In velit sagittis.</a>
                </li>
                <li>
                  <a href="/">Mattis.</a>
                </li>
                <li>
                  <a href="/">Est.</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 md:w-2/4 lg:w-1/5">
              <h2 className="mb-3 text-lg tracking-widest">Messa.</h2>
              <nav className="mb-10 list-none space-y-2 py-3">
                <li>
                  <a href="/">Id.</a>
                </li>
                <li>
                  <a href="/">Aliquam.</a>
                </li>
                <li>
                  <a href="/">Interdum.</a>
                </li>
                <li>
                  <a href="/">Risus.</a>
                </li>
              </nav>
            </div>
            <div className="w-full md:w-2/4 lg:w-1/5">
              <a href="/">
                <div className="relative border border-black transition hover:border-gray-500">
                  <div className="absolute top-0 right-0 pt-2 pr-2">
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.66992 0.747559L0.669922 6.74756"
                        stroke="black"
                      />
                      <path
                        d="M0.669922 0.747559H6.66992V6.74756"
                        stroke="black"
                      />
                    </svg>
                  </div>
                  <div className="p-6">
                    Lorem ipsum accumsan arcu, consectetur adipiscing elit.
                    Consequat arcu.
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="px-2">
          <div className="max-w-8xl mx-auto px-5 py-6">
            <h2 className="text-black">Diam egestas ultrices odio vitae.</h2>
            <div>
              <h2 className="my-4 text-sm">
                Lorem ipsum accumsan arcu, consectetur adipiscing elit. Dolor
                proin tempor sed fermentum sit{" "}
                <br className="hidden lg:inline-block" /> pretium pellentesque.
                Dictumst risus elementum dignissim risus, lobortis molestie.
              </h2>
            </div>
            <div className="absolute right-0 -mt-24 hidden text-black lg:inline-block">
              <a href="/" className="mr-16">
                Terms & Conditions
              </a>
              <a href="/" className="mr-16">
                Privacy Policy
              </a>
              <a href="/" className="mr-16">
                Cookie Policy
              </a>
            </div>
            <div className="right-0 inline-block pt-12 pb-6 pr-20 text-sm text-black md:hidden">
              <a href="/" className="mr-16">
                Terms & Conditions
              </a>
              <a href="/" className="mr-16">
                Privacy Policy
              </a>
              <a href="/" className="mr-16">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
        /</footer>
    </>
  )
}

export default IndexPage

