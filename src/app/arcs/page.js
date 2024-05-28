import styles from "./../page.module.css";
import App from '../../components/App';
import Tooltip from "../../components/components/Tooltip";
import ArcSimple from "../../components/components/ArcSimple";
import labelConstants from '../../components/components/labelConstants.js'

const width = 600
const height = 400
export default function Arcs() {
  return (
    <div style={{width:600}}>
      <ArcSimple
        width={width}
        height={height}
      />
      <div className={styles.headlineMetricNameContainer}>
        <div className={styles.headlineMetricNameLine}>
        <div className={styles.headlineMetricName}>Composite Inflation</div>
        <Tooltip tooltipText={labelConstants.tooltips.sample} />
        </div>
      </div>
    </div>
  );
}