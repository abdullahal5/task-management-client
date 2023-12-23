import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-gray-100 lg:h-[100vh] md:h-[100vh] h-auto lg:pt-32 md:pt-28 pt-20">
      <Container>
        <div className="flex lg:flex-row md:flex-row flex-col w-[100%] justify-between items-center">
          <div className="lg:text-left md:text-left text-center">
            <h1 className="text-6xl font-semibold">
              Streamline Your Day,
              <br /> <span className="text-[#304D30]">Task by Task</span>
            </h1>
            <p className="italic py-5 font-semibold">
              Revolutionize productivity. Organize tasks, deadlines, collaborate
              <br />
              seamlessly. Simplify workflow, conquer goals. Elevate efficiency,
              <br />
              stay focused, achieve more effortlessly—all in one intuitive
              platform
            </p>
            <Link to="/dashboard">
              <Button
                variant="outlined"
                className="border-2 hover:text-[#304D30]"
                sx={{
                  backgroundColor: "#304D30",
                  color: "white",
                  px: 2,
                }}
              >
                Let's explore
              </Button>
            </Link>
          </div>
          <div className="">
            <img
              src="https://i.ibb.co/z61SwX4/undraw-chore-list-re-2lq8-removebg-preview.png"
              alt="Banner logo"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
