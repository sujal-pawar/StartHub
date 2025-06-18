import Image from "next/image";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <section className="pink_container">
      <h1 className="heading">Pitch Your StartUp <br /> Connect with Entrepreneurs</h1>
      <p className="sub-heading !max-w-3xl">
        Join our community to share your vision and collaborate on innovative projects.
      </p>
      <SearchForm/>
    </section>
  );
}
