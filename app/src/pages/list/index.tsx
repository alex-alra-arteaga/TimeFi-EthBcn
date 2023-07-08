import { Layout } from "~/components/Layout";
import { CardData } from "../../components/CardList";
import { liveDataPropsArray } from "../../constants";

export default function Home() {
  return (
    <Layout>
      <div className="pt-10 pb-10 bg-gradient-to-r from-black via-gray-800 to-gray-700 min-h-screen grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
        {liveDataPropsArray.map((index, item) => 
          <CardData 
            id={String(item)}
            key={Math.random().toString()}
            deadlineDate={index.deadlineDate}
            name={index.name}
            description={index.description}
            age={index.age}
            linkedInUrl={index.linkedInUrl}
            youtubeUrl={index.youtubeUrl}
            twitterUrl={index.twitterUrl}
            instagramUrl={index.instagramUrl}
            industry={index.industry}
            goal={index.goal}
            image={index.image}
            deadline={index.deadline}
          />
        )}
      </div>
    </Layout>
  );
}