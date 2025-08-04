import RegisterForm from "../components/auth/LoginForm";
import Logo from "../assets/Logo.svg";
import LogoYazi from "../assets/Logo-yazi.svg";
import Iphone from "../assets/iPhone.svg";
import IphoneMobil from "../assets/iPhone-mobil.svg";
import LoginForm from "../components/auth/LoginForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* LEFT PANEL — Text + Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative">
        {/* LOGO: Mobilde sadece ikon, tablette-desktopta yazılı logo */}
        <img
          src={Logo}
          alt="Logo"
          className="block md:hidden absolute top-6 left-6 w-8"
        />
        <img
          src={LogoYazi}
          alt="Logo"
          className="hidden md:block absolute top-8 left-10 w-40"
        />

        {/* METİN */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mt-20 md:mt-10 mb-8 leading-tight">
          Expand your <br />
          mind, reading <span className="text-gray-400">a book</span>
        </h1>

        {/* REGISTER FORM */}
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

      {/* RIGHT PANEL — iPhone Görseli */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#1a1a1a] p-6">
        <img
          src={Iphone}
          alt="App Preview"
          className="max-w-[320px] md:max-w-[360px] lg:max-w-[420px]"
        />
      </div>

      {/* MOBİL iPHONE GÖRSELİ */}
      <div className="block md:hidden px-6 pb-10">
        <img src={IphoneMobil} alt="App Preview Mobile" className="w-full" />
      </div>
    </div>
  );
}
