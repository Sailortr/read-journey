import Logo from "../assets/logo.svg";
import LogoYazi from "../assets/logo-yazi.svg";
import Iphone from "../assets/iphone.svg";
import IphoneMobil from "../assets/iphone-mobil.svg";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col lg:flex-row items-stretch">
      <section className="w-full lg:w-1/2 flex items-center justify-center px-5 md:px-10 py-8">
        <div className="w-full max-w-[600px] h-full max-h-[736px] rounded-[30px] bg-[#1F1F1F] border border-white/10 p-6 sm:p-8 md:p-10 relative">
          <img
            src={Logo}
            alt="Read Journey"
            className="block md:hidden absolute top-6 left-6 w-8"
          />
          <img
            src={LogoYazi}
            alt="Read Journey"
            className="hidden md:block absolute top-8 left-8 w-40"
          />

          <h1
            className="mt-16 md:mt-20 mb-8 font-bold leading-[1.05] tracking-[-0.02em]
                         text-[36px] sm:text-[44px] md:text-[56px]"
          >
            Expand your <br />
            mind, reading <span className="text-[#686868]">a book</span>
          </h1>

          <div className="mt-2">
            <LoginForm />
          </div>
        </div>
      </section>

      <aside className="hidden lg:flex w-1/2 items-center justify-center px-10 py-10">
        <div className="relative w-[600px] h-[736px] rounded-[30px] bg-[#1F1F1F] border border-white/10 overflow-hidden">
          <img
            src={Iphone}
            alt="App preview"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[92%] w-auto object-contain pointer-events-none"
          />
        </div>
      </aside>

      <div className="lg:hidden md:hidden w-full flex items-center justify-center px-5 pb-10">
        <div className="relative w-[335px] h-[411px] rounded-[30px] bg-[#1F1F1F] border border-white/10 overflow-hidden">
          <img
            src={IphoneMobil}
            alt="App preview mobile"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] w-auto object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
