import { usePathname } from 'next/navigation';

export const LoginButton = () => {
  const pathname = usePathname()
  console.log("🚀 ~ file: login-button.js:5 ~ LoginButton ~ pathname:", pathname)

  return (
    <a
      className="bg-first hover:bg-second py-2 px-6 rounded-full text-third font-semibold transition duration-300 ease-in-out inline-block"
      href={`/api/auth/login?returnTo=${pathname}`}
    >
      Log In
    </a>
  );
};