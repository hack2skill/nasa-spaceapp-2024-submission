import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaWater, FaCloudSunRain, FaSeedling, FaVirus, FaCarrot, FaCloudShowersHeavy, FaDownload } from "react-icons/fa"; // Changed FaCloudDownload to FaDownload
import { useRef } from "react";
import { Link } from "react-router-dom";

export const Explore = () => {
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Nav />
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <Link to="/" className="text-xs text-zinc-400">
        Return to Home
      </Link>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      {/* Scroll Down Text */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold">
        Scroll Down
      </div>
      
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D )",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        key="img1"
        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Farm"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        key="img2"
        src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Farm"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        key="img3"
        src="https://images.unsplash.com/9/fields.jpg?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Farm"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        key="img4"
        src="https://plus.unsplash.com/premium_photo-1663945779301-2c51b59c911e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Farm"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      >
        Farming Insights
      </motion.h1>
      <div className="grid grid-cols-3 gap-4">
        <InfoItem icon={<FaWater />} title="Moisture" />
        <InfoItem icon={<FaCloudSunRain />} title="Weather Prediction" />
        <InfoItem icon={<FaSeedling />} title="Vegetation Health" />
        <InfoItem icon={<FaCarrot />} title="Crop Recommendation" />
        <InfoItem icon={<FaVirus />} title="Crop Disease" />
        <InfoItem icon={<FaCloudShowersHeavy />} title="Rainfall" />
        {/* New game download box */}
        <DownloadItem title="Download Our Game" downloadLink="https://drive.google.com/uc?export=download&id=YOUR_FILE_ID" />
      </div>
    </section>
  );
};

const InfoItem = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
};

const DownloadItem = ({ title, downloadLink }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-center">
      <button className="text-3xl mb-2">
        <FaDownload />
      </button>
      <h2 className="text-lg font-bold">{title}</h2>
      <a
        href={"https://drive.google.com/file/d/1_4sirZMjIWyxgu352VLTWSuf6qy80_MK/view?usp=sharing"}
        className="mt-2 text-sm text-blue-400 hover:underline"
        download
      >
        Download ZIP
      </a>
    </div>
  );
};
export default Explore;