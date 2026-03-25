import { useAppContext } from '../context/ApplicationContext';
import { generateId } from '../utils/helpers';

export function useApplications() {
  const {
    applications,
    loading,
    addApplication,
    updateApplication,
    deleteApplication,
    toggleBookmark,
  } = useAppContext();

  const add = (formData) => {
    const newApp = {
      ...formData,
      id: generateId(),
      bookmarked: false,
    };
    addApplication(newApp);
    return newApp;
  };

  const update = (id, formData) => {
    updateApplication(id, formData);
  };

  const remove = (id) => {
    deleteApplication(id);
  };

  const bookmark = (id) => {
    toggleBookmark(id);
  };

  const getById = (id) => applications.find((app) => app.id === id);

  const bookmarked = applications.filter((app) => app.bookmarked);

  const stats = {
    total: applications.length,
    interviews: applications.filter((a) => a.status === 'Interviewing').length,
    offers: applications.filter((a) => a.status === 'Offer').length,
    rejections: applications.filter((a) => a.status === 'Rejected').length,
    applied: applications.filter((a) => a.status === 'Applied').length,
  };

  return {
    applications,
    loading,
    bookmarked,
    stats,
    add,
    update,
    remove,
    bookmark,
    getById,
  };
}
