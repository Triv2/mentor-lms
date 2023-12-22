
const AuthLayout = ( {
  children
}: {children: React.ReactNode}) => {
  return (
  <div className="min-h-screen h-auto w-full flex items-center justify-center bg-[url(/cbg6.png)] bg-no-repeat bg-cover bg-center">
    {children}
  </div>
  );
}
export default AuthLayout;