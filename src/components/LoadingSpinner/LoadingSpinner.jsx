export default function LoadingSpinner({ overlay = false }) {
  if (overlay) {
    return (
      <div className="spinner-overlay">
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" />
          <p style={{ color: 'var(--text-secondary)', marginTop: 16, fontSize: 14 }}>
            Loading your applications...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <div className="spinner" />
    </div>
  );
}
