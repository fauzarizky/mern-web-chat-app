import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/sidebar/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] md:w-[80vw] lg:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
