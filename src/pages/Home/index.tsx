import { useAppSelector } from "@/api/hook";

const Home = () => {
  const count = useAppSelector((state) => state.user.value);

  return (
    <div className="text-sm font-semibold">
      <p>This is the Home Page</p>

      <p>{count}</p>

    </div>
  );
};

export default Home;