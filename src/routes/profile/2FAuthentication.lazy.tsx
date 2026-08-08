import { createLazyFileRoute } from '@tanstack/react-router'
import TwoFactor from "../../assets/img/twofactauth.png"
import Foot from '../../components/foot';
import type React from 'react';
import { useNavigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/2FAuthentication')({
  component: TwoFAuthentication,
})

function TwoFAuthentication() {
  const lastFour = localStorage.getItem('lastFour') ?? '0000';
  const navigate = useNavigate();

  const handleContinue = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    localStorage.setItem('lastFour', lastFour);
    navigate({ to: '/profile/2FAuthenticationVerify' });
  }

  const handleGoBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    localStorage.setItem('lastFour', lastFour);
    navigate({ to: '/profile/phone/verify' });
  }

  return <>
    <div>
        <div className="flex flex-col items-center text-sm max-md:w-full max-md:p-3 max-w-350 mx-auto">
            <div className="w-full mt-8 py-8">
            </div>
            <div className="w-full border-b border mb-7"></div>
            <div className="w-2/5 max-w-150 rounded-xl border-3 border-[#364153] mt-5 flex flex-col text-center justify-center items-center gap-5 p-5 max-lg:w-full max-md:mx-3">
                <div className="flex flex-col gap-5 items-center pt-5">
                    <div>
                        <img src={TwoFactor} alt="twofactauthimg" className="w-20 h-auto" />
                    </div>
                    <h2 className="text-[16.8px] text-center px-4">
                        To keep your account safe, we require you to enter a secure code in order to verify your account. Please select how you'd like to receive a secure code.
                    </h2>
                </div>
                <div className="flex flex-col gap-3 w-4/5">
                    <div className="flex items-center border border-[#364153] py-3 px-2">
                        <input type="radio" name="otp-method" id="sms" className="mr-4 ml-4" checked />
                        <label htmlFor="sms" className="text-sm">Send a text to my mobile, (***)***-<span id="lastFour">{lastFour}</span></label>
                    </div>
                    <p className="mb-4 opacity-60 italic">† Message and data rates may apply. 1 message/request.</p>
                </div>
                <div className="w-4/5">
                    <p className="mb-5">Once you receive your code, you will be required to enter it on the next page in order to access your account.</p>
                    <div className="flex gap-1 justify-center">
                        <button type="button" id="goBackBtn" onClick={handleGoBack}
                            className="bg-white px-7.5 py-3.75 border hover:border-[#79bde9] hover:bg-[#79bde9] cursor-pointer hover:text-black transition">
                            Go Back
                        </button>
                        <button type="button" onClick={handleContinue}
                            className="bg-white px-7.5 py-3.75 border hover:border-[#79bde9] cursor-pointer hover:bg-[#79bde9] hover:text-black transition">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 items-center justify-center w-3/5 mt-5 p-5 text-[11px] text-[#364153] text-center max-md:gap-2 max-md:w-full max-md:px-5">
                <p>† 1 message/request. To opt out, text STOP to 23951 or remove the mobile number from your profile. For help, text HELP to 24951. Message and data rates may apply. Please see your mobile service provider for details.</p>
                <p>Please be advised that we do not guarantee the delivery of alerts. Receipt of alerts may be delayed or prevented by factor(s) affecting your mobile service provider and such other relevant entities. Please review the Privacy Policy and Terms and Conditions.</p>
            </div>
            <div className="w-full border-b-2 border-gray-300"></div>

            <Foot/>
        </div>
    </div>
  </>
}
