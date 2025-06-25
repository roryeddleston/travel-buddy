import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="pt-10 p-4">
        {children}
      </div>
    </>
  );
};

export default MainLayout;