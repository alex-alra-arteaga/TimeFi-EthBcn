import { Layout } from "~/components/Layout";
import LoginPage from "~/components/Login";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Disclaimer
          </h1>

          <p className="mt-3 text-2xl">
            Web2 login not integrated. The integration is however done, check on github: 
            <a href="https://github.com/your-repo/pages/login" className="underline text-blue-500">pages/login</a>
            . We have implemented it but decided to focus on Web3  for the MVP.
          </p>
        </main>
      </div>
    </Layout>
  );
}
