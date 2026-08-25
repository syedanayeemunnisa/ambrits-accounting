import { useState } from 'react';
import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export default function Admissions() {
  const { students, courses } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ studentName: '', courseId: '' });

  const admissions = students.map(s => ({
    id: `adm-${s.id}`, studentName: s.name, courseName: s.courseName,
    counsellorName: s.counsellorName || '—', admissionDate: s.createdAt,
    status: s.status === 'active' ? 'confirmed' : s.status,
  }));

  const handleAdd = () => {
    if (!form.studentName || !form.courseId) return;
    setShowAdd(false);
    setToast(`Admission created for "${form.studentName}"`);
    setForm({ studentName: '', courseId: '' });
  };

  const columns = [
    { key: 'studentName', label: 'Student', sortable: true },
    { key: 'courseName', label: 'Course', sortable: true },
    { key: 'counsellorName', label: 'Counsellor' },
    { key: 'admissionDate', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{r.status}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admissions</h1>
          <p className="text-sm text-slate-500 mt-1">{admissions.length} admissions</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ New Admission</button>
      </div>
      <DataTable columns={columns} data={admissions} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="New Admission">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Student Name *</label>
            <input value={form.studentName} onChange={e => setForm(f => ({ ...f, studentName: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="Enter student name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course *</label>
            <select value={form.courseId} onChange={e => setForm(f => ({ ...f, courseId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Admission</button>
          </div>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
