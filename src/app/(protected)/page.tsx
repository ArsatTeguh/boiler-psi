import Home from "@/components/layout/form/home";
import { withAuth } from "@/utils/withAuth";

const HomePage = () => {
  return <Home />
};

export default withAuth(['visitor', 'admin'], HomePage) 
