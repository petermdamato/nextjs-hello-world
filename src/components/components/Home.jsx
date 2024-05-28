import { useRouter } from "next/navigation";
import styles from "./home.module.css";

const Home = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.frontPage}>
      <img src="/logo.png" alt="Arc Chart Logo" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <button
          className={styles.navButton}
          onClick={() => navigateTo("/complex")}
        >
          Complex Arc Chart
        </button>
        <button
          className={styles.navButton}
          onClick={() => navigateTo("/arcs")}
        >
          Simple Arc Chart
        </button>
      </div>
    </div>
  );
};

export default Home;
