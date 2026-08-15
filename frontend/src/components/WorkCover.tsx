import { IconType } from "react-icons";
import { FaRobot, FaFileInvoice, FaBuilding, FaTruckFast, FaChessKnight, FaHeart } from "react-icons/fa6";
import "./styles/WorkCover.css";

const ICONS: Record<string, IconType> = {
  robot: FaRobot,
  invoice: FaFileInvoice,
  building: FaBuilding,
  truck: FaTruckFast,
  chess: FaChessKnight,
  heart: FaHeart,
};

type Props = {
  icon?: string;
  title: string;
  category?: string;
  variant?: number;
};

const WorkCover = ({ icon = "robot", title, category, variant = 0 }: Props) => {
  const Icon = ICONS[icon] ?? FaRobot;
  const tone = (variant % 5) + 1;

  return (
    <div className={`work-cover work-cover-${tone}`} aria-hidden="true">
      <span className="work-cover-orb work-cover-orb-a" />
      <span className="work-cover-orb work-cover-orb-b" />
      <div className="work-cover-grid" />
      <div className="work-cover-icon">
        <Icon />
      </div>
      <div className="work-cover-meta">
        {category && <span>{category}</span>}
        <strong>{title}</strong>
      </div>
    </div>
  );
};

export default WorkCover;
