import { useAppSelector, useAppDispatch } from "@/api/hook";
import { decrement, increment } from "@/api/slices/user";

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="text-sm font-semibold">
      <p>This should not be the Home Page</p>

      <p>{count}</p>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Home;
