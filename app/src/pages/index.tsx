import { type NextPage } from "next";
import Hero from "../components/Hero";
import { Layout } from "~/components/Layout";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
        <Layout>
          <Hero />
      </Layout>
    </div>
  );
};
export default Home;
