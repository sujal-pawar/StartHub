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
    author: { _id: "1",name:"Sujal" },
    _id: "1",
    description: 'This is description of the startup. It is a great startup that aims to solve many problems in the world.',
    image:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN0YXJ0dXB8ZW58MHx8MHx8fDA%3D',
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

      <section className="selection_container dark:bg-black">
        <p className="text-center text-3xl font-semibold dark:text-white">
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
