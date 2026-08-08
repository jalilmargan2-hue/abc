import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import TwofactImg from "../../../assets/img/twofactauth.png";
import Foot from '../../../components/foot';
import { useEffect, useRef, useState, type FormEvent } from 'react';


export const Route = createLazyFileRoute('/profile/phone/verify')({
  component: Verify,
})

function Verify() {
  const [prefix, setPrefix] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [line, setLine] = useState('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

  const navigate = useNavigate();
  const email = sessionStorage.getItem('email') ?? '';
  const session_token = sessionStorage.getItem('session_token') ?? '';

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

    const phoneNumber = `${prefix}-${areaCode}-${line}`;

    try {
      const response = await fetch(`${API_URL}/api/phone/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, session_token }),
      });

      const data = await response.json();

      if(response.ok) {
        const lastFour = line.slice(-4);
        localStorage.setItem('lastFour', lastFour);
        navigate({ to: '/profile/2FAuthentication' });

      } else{
        console.error('Phone verification failed:', data);
      }

    } catch (error) {
      console.error('Error submitting phone number:', error);
    }
  };

  const goBack = () => {
    navigate({ to: '/' });
  }

  return <>
    <div>
        <div className="flex flex-col items-center text-sm max-md:w-full max-md:p-3 max-w-350 mx-auto">
           
            <div className="w-full border-b-2 border-[#364153] mt-16"></div>

            <div className="w-2/5 max-w-xl rounded-xl border-4 border-[#364153] mt-16 flex flex-col text-center justify-center items-center gap-5 p-5 max-lg:w-full max-md:mx-3">
                <div className="flex flex-col gap-4 items-center pt-6">
                    <div className="flex items-center justify-center">
                        <img src={TwofactImg} alt="twofactauthimg" className="w-20 h-auto" />
                    </div>
                    <h2 className="text-center text-[16.8px] font-semibold text-[#364153]">
                       Enter your registered phone number to continue
                    </h2>
                </div>
                <form id="phoneForm" onSubmit={handleSubmit} className="flex items-center flex-col gap-5 w-full">
                    <div className="flex flex-col max-md:w-full">
                        <div className="grid grid-cols-3 gap-3 px-9 mt-4 max-md:px-5 border  py-5 w-[70%]  max-md:max-w-100 max-md:w-full justify-center items-center mx-auto">
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
                                    onChange={(e) => handleDigitInput(e.target.value, setPrefix, 1)}
                                    required
                                    className="p-2 text-[#999] h-14 w-full bg-slate-100 border"
                                />
                            </div>
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
                                    onChange={(e) => handleDigitInput(e.target.value, setAreaCode, 2)}
                                    required
                                    className="p-2 text-[#999] h-14 w-full bg-slate-100 border"
                                />
                            </div>
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
                                    onChange={(e) => handleDigitInput(e.target.value, setLine)}
                                    required
                                    className="p-2 text-[#999] h-14 w-full bg-slate-100 border"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-4/5">
                        <div className="flex gap-1 justify-center">
                            <button type="button" id="goBackBtn"
                                className="bg-white px-7.5 py-3.75 text-[#364153] border-2 hover:border-[#79bde9] hover:bg-[#79bde9] hover:text-black cursor-pointer transition" onClick={goBack}>
                                Go Back
                            </button>
                            <button type="submit" id="continueBtn"
                                className="bg-white px-7.5 py-3.75 text-[#364153] border-2 hover:border-[#79bde9] hover:bg-[#79bde9] hover:text-black cursor-pointer transition disabled:cursor-not-allowed disabled:bg-[#e2eff9] disabled:text-[#8fa6b7]">
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
}
