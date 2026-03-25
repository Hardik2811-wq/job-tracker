import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fetchMockJobs } from '../services/api';

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useLocalStorage('job-tracker-apps', []);
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useLocalStorage('job-tracker-seeded', false);

  useEffect(() => {
    if (!seeded) {
      setLoading(true);
      fetchMockJobs()
        .then((jobs) => {
          setApplications(jobs);
          setSeeded(true);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, []);

  const addApplication = (data) => {
    setApplications((prev) => [data, ...prev]);
  };

  const updateApplication = (id, data) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...data } : app))
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
      )
    );
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loading,
        addApplication,
        updateApplication,
        deleteApplication,
        toggleBookmark,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error('useAppContext must be used within ApplicationProvider');
  return ctx;
}
