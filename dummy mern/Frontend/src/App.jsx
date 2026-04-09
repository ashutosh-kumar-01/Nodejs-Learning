import { useEffect, useMemo, useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  role: '',
  salary: '',
};

const App = () => {
  const [formData, setFormData] = useState(initialForm);
  const [employees, setEmployees] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sortedEmployees = useMemo(
    () => [...employees].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [employees]
  );

  const fetchEmployees = async () => {
    try {
      setIsLoadingList(true);
      const response = await fetch('/api/v1/employees');
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to fetch employees');
      }

      setEmployees(result.data || []);
    } catch (fetchError) {
      setError(fetchError.message || 'Something went wrong while loading employees');
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        salary: Number(formData.salary),
      };

      const response = await fetch('/api/v1/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to create employee');
      }

      setEmployees((prev) => [result.data, ...prev]);
      setFormData(initialForm);
      setSuccess('Employee created and saved to MongoDB successfully.');
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong while creating employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-5">
        <section className="lg:col-span-2 rounded-3xl border border-emerald-400/20 bg-slate-900/80 p-6 shadow-2xl shadow-emerald-900/20 backdrop-blur-sm">
          <h1 className="text-3xl font-bold tracking-tight text-emerald-300">Add Employee</h1>
          <p className="mt-2 text-sm text-slate-400">
            Create a new employee. It will be stored in MongoDB and instantly visible on this page.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm text-slate-300">Full Name</span>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                placeholder="John Carter"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm text-slate-300">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@company.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm text-slate-300">Role</span>
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder="Frontend Developer"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm text-slate-300">Salary (INR)</span>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                min={0}
                placeholder="50000"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-emerald-400"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Creating...' : 'Create Employee'}
            </button>
          </form>

          {error && <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-2 text-sm text-red-300">{error}</p>}
          {success && <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-2 text-sm text-emerald-300">{success}</p>}
        </section>

        <section className="lg:col-span-3 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/60">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-100">Employee Directory</h2>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Total: {employees.length}
            </span>
          </div>

          {isLoadingList ? (
            <p className="mt-6 text-slate-400">Loading employees...</p>
          ) : sortedEmployees.length === 0 ? (
            <p className="mt-6 text-slate-400">No employees yet. Add your first employee using the form.</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {sortedEmployees.map((employee) => (
                <article
                  key={employee._id}
                  className="rounded-2xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4"
                >
                  <h3 className="text-lg font-semibold text-emerald-300">{employee.name}</h3>
                  <p className="mt-1 text-sm text-slate-300">{employee.role}</p>
                  <p className="mt-1 text-sm text-slate-400">{employee.email}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-200">INR {Number(employee.salary).toLocaleString('en-IN')}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
