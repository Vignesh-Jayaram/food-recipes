import Veggie from "../components/Veggie";
import Trending from "../components/Trending";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Veggie />
      <Trending />
    </motion.div>
  );
}

export default Home;
