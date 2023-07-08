import { Footer } from "./Footer";
import Navbar from "./Navbar";


type LayoutProps = {
    children: React.ReactNode,
  };

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <div className="z-10">
                <Footer />
            </div>
        </div>
    );
}