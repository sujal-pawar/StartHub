import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartUpCard from "../../components/StartUpCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date().toISOString(), // Convert Date to string
    views: 55,
    author: { _id: "1" },
    _id: "1",
    slug: "we-robots",
    description: 'This is description of the startup. It is a great startup that aims to solve many problems in the world.',
    logo: '/file.svg', // Using a file from your public folder
    category: 'Robots',
    title: "We Robots",
  },]

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">Pitch Your StartUp <br /> Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Join our community to share your vision and collaborate on innovative projects.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="selection_container dark:bg-black ">
        <p className=" font-semibold text-center text-2xl dark:text-blue-300">
          {query ? `Search results for "${query}"` : "Explore Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <StartUpCard key={post._id} post={post} />
            ))
          ) : (<p className="no-results text-white light:dark-black" >No StartUp Found </p>)
          }
        </ul>
      </section>
    </>
  );
}
