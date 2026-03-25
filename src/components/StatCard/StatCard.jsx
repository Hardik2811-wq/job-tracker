import { motion } from 'framer-motion';
import './StatCard.css';

export default function StatCard({ icon: Icon, label, value, color, subtitle }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ '--stat-color': color }}
    >
      <div className="stat-icon" style={{ background: `${color}20`, color }}>
        <Icon size={22} />
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </motion.div>
  );
}
