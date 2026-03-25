import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { MdArrowBack } from 'react-icons/md';
import { useApplications } from '../../hooks/useApplications';
import './ApplicationForm.css';

const schema = yup.object().shape({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Role is required'),
  location: yup.string().required('Location is required'),
  salary: yup.number().typeError('Enter a valid salary').min(0).required('Salary is required'),
  platform: yup.string().required('Platform is required'),
  status: yup.string().required('Status is required'),
  appliedDate: yup.string().required('Applied date is required'),
  interviewDate: yup.string().nullable(),
  notes: yup.string(),
});

export default function AddApplication() {
  const navigate = useNavigate();
  const { add } = useApplications();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    // Extract domain from company name for logo
    const domain = `${data.company.toLowerCase().replace(/\s+/g, '')}.com`;
    add({ ...data, domain });
    toast.success(`✅ "${data.company}" application added!`);
    navigate('/applications');
  };

  return (
    <div className="form-page">
      <div className="page-header">
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          <MdArrowBack size={18} /> Back
        </button>
        <h1 className="page-title" style={{ marginTop: 16 }}>Add New Application</h1>
        <p className="page-subtitle">Track a new job application</p>
      </div>

      <div className="glass-card form-card">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-section">
            <h3 className="form-section-title">Company Details</h3>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input className="form-input" placeholder="e.g. Google" {...register('company')} />
                {errors.company && <span className="form-error">{errors.company.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Job Role *</label>
                <input className="form-input" placeholder="e.g. Frontend Developer" {...register('role')} />
                {errors.role && <span className="form-error">{errors.role.message}</span>}
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Location *</label>
                <select className="form-input" {...register('location')}>
                  <option value="">Select location type</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
                {errors.location && <span className="form-error">{errors.location.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Annual Salary (₹) *</label>
                <input className="form-input" type="number" placeholder="e.g. 1200000" {...register('salary')} />
                {errors.salary && <span className="form-error">{errors.salary.message}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Application Details</h3>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Platform *</label>
                <select className="form-input" {...register('platform')}>
                  <option value="">Select platform</option>
                  <option>LinkedIn</option>
                  <option>Company Website</option>
                  <option>Naukri</option>
                  <option>Wellfound</option>
                  <option>Internshala</option>
                  <option>Referral</option>
                  <option>Other</option>
                </select>
                {errors.platform && <span className="form-error">{errors.platform.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Status *</label>
                <select className="form-input" {...register('status')}>
                  <option value="">Select status</option>
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
                {errors.status && <span className="form-error">{errors.status.message}</span>}
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Applied Date *</label>
                <input className="form-input" type="date" {...register('appliedDate')} />
                {errors.appliedDate && <span className="form-error">{errors.appliedDate.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Interview Date</label>
                <input className="form-input" type="date" {...register('interviewDate')} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Notes</h3>
            <div className="form-group">
              <textarea
                className="form-input"
                rows={4}
                placeholder="Any notes, contacts, or follow-up reminders..."
                {...register('notes')}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : '+ Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
