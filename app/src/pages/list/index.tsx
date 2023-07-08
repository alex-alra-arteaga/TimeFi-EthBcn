import { Layout } from "~/components/Layout";
import Card from "../../components/Card";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center gap-5 pt-10 pb-10 justify-center flex-row flex-wrap  bg-gradient-to-r from-black via-gray-800 to-gray-700 min-h-screen">
        {Array.from({ length: 12 }).map((index, item) => <Card id={item} key={Math.random().toString()} list={true} />)}
      </div>
    </Layout>
  );
}