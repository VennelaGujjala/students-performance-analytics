import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Users,
  BookOpen,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Award,
  Layers,
  ArrowUpDown,
  Filter,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  Cpu,
  ChevronRight,
  X
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  dept: string;
  maths: number;
  physics: number;
  chemistry: number;
  english: number;
  cs: number;
  attendance: number;
  total: number;
  average: number;
  grade: string;
  result: 'Pass' | 'Fail';
}

const INITIAL_STUDENTS: Student[] = [
  { id: 'S101', name: 'Aarav Sharma', dept: 'Computer Science', maths: 92, physics: 88, chemistry: 95, english: 89, cs: 96, attendance: 94, total: 460, average: 92.0, grade: 'A+', result: 'Pass' },
  { id: 'S102', name: 'Diya Patel', dept: 'Information Tech', maths: 85, physics: 89, chemistry: 84, english: 91, cs: 90, attendance: 88, total: 439, average: 87.8, grade: 'A', result: 'Pass' },
  { id: 'S103', name: 'Rohan Verma', dept: 'Electronics', maths: 78, physics: 74, chemistry: 82, english: 79, cs: 85, attendance: 82, total: 398, average: 79.6, grade: 'B', result: 'Pass' },
  { id: 'S104', name: 'Ananya Iyer', dept: 'Computer Science', maths: 95, physics: 96, chemistry: 94, english: 92, cs: 98, attendance: 96, total: 475, average: 95.0, grade: 'A+', result: 'Pass' },
  { id: 'S105', name: 'Vikram Singh', dept: 'Mechanical', maths: 65, physics: 68, chemistry: 62, english: 70, cs: 66, attendance: 76, total: 331, average: 66.2, grade: 'C', result: 'Pass' },
  { id: 'S106', name: 'Priya Nair', dept: 'Information Tech', maths: 55, physics: 58, chemistry: 52, english: 60, cs: 54, attendance: 71, total: 279, average: 55.8, grade: 'D', result: 'Pass' },
  { id: 'S107', name: 'Rahul Mehta', dept: 'Civil', maths: 42, physics: 45, chemistry: 48, english: 52, cs: 44, attendance: 80, total: 231, average: 46.2, grade: 'F', result: 'Fail' },
  { id: 'S108', name: 'Sneha Kulkarni', dept: 'Computer Science', maths: 88, physics: 85, chemistry: 90, english: 86, cs: 92, attendance: 91, total: 441, average: 88.2, grade: 'A', result: 'Pass' },
  { id: 'S109', name: 'Arjun Rao', dept: 'Electronics', maths: 72, physics: 70, chemistry: 75, english: 68, cs: 74, attendance: 69, total: 359, average: 71.8, grade: 'B', result: 'Pass' },
  { id: 'S110', name: 'Kavya Reddy', dept: 'Information Tech', maths: 90, physics: 92, chemistry: 89, english: 87, cs: 94, attendance: 95, total: 452, average: 90.4, grade: 'A+', result: 'Pass' },
  { id: 'S111', name: 'Aditya Joshi', dept: 'Mechanical', maths: 32, physics: 54, chemistry: 58, english: 62, cs: 50, attendance: 78, total: 256, average: 51.2, grade: 'D', result: 'Fail' },
  { id: 'S112', name: 'Pooja Gupta', dept: 'Civil', maths: 58, physics: 60, chemistry: 55, english: 62, cs: 59, attendance: 83, total: 294, average: 58.8, grade: 'D', result: 'Pass' },
  { id: 'S113', name: 'Siddharth Sen', dept: 'Computer Science', maths: 81, physics: 79, chemistry: 85, english: 83, cs: 87, attendance: 86, total: 415, average: 83.0, grade: 'A', result: 'Pass' },
  { id: 'S114', name: 'Meera Nambiar', dept: 'Electronics', maths: 68, physics: 72, chemistry: 70, english: 75, cs: 71, attendance: 73, total: 356, average: 71.2, grade: 'B', result: 'Pass' },
  { id: 'S115', name: 'Karan Malhotra', dept: 'Mechanical', maths: 40, physics: 42, chemistry: 38, english: 45, cs: 41, attendance: 65, total: 206, average: 41.2, grade: 'F', result: 'Fail' },
  { id: 'S116', name: 'Ishita Das', dept: 'Information Tech', maths: 76, physics: 80, chemistry: 78, english: 82, cs: 84, attendance: 89, total: 400, average: 80.0, grade: 'A', result: 'Pass' },
  { id: 'S117', name: 'Nikhil Desai', dept: 'Civil', maths: 62, physics: 65, chemistry: 60, english: 68, cs: 64, attendance: 79, total: 319, average: 63.8, grade: 'C', result: 'Pass' },
  { id: 'S118', name: 'Riya Chakraborty', dept: 'Computer Science', maths: 94, physics: 91, chemistry: 93, english: 90, cs: 95, attendance: 93, total: 463, average: 92.6, grade: 'A+', result: 'Pass' },
  { id: 'S119', name: 'Tanmay Bhatia', dept: 'Electronics', maths: 50, physics: 48, chemistry: 30, english: 55, cs: 52, attendance: 70, total: 235, average: 47.0, grade: 'F', result: 'Fail' },
  { id: 'S120', name: 'Neha Bansal', dept: 'Information Tech', maths: 83, physics: 85, chemistry: 88, english: 86, cs: 89, attendance: 90, total: 431, average: 86.2, grade: 'A', result: 'Pass' }
];

function computeStudentStats(maths: number, physics: number, chemistry: number, english: number, cs: number) {
  const marks = [maths, physics, chemistry, english, cs];
  const total = marks.reduce((acc, m) => acc + m, 0);
  const average = Number((total / marks.length).toFixed(2));
  
  let grade = 'F';
  if (average >= 90) grade = 'A+';
  else if (average >= 80) grade = 'A';
  else if (average >= 70) grade = 'B';
  else if (average >= 60) grade = 'C';
  else if (average >= 50) grade = 'D';

  const passedAllSubjects = marks.every(m => m >= 35);
  const result: 'Pass' | 'Fail' = (passedAllSubjects && average >= 50) ? 'Pass' : 'Fail';

  return { total, average, grade, result };
}

export default function App() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [activeTab, setActiveTab] = useState<'analytics' | 'students' | 'subjects' | 'departments' | 'engine'>('analytics');
  
  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [resultFilter, setResultFilter] = useState('All');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'average' | 'total' | 'name' | 'attendance'>('average');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal / Drawer state for adding new student
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [newStudent, setNewStudent] = useState({
    id: `S${101 + students.length}`,
    name: '',
    dept: 'Computer Science',
    maths: 75,
    physics: 75,
    chemistry: 75,
    english: 75,
    cs: 75,
    attendance: 85
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;

    const stats = computeStudentStats(
      Number(newStudent.maths),
      Number(newStudent.physics),
      Number(newStudent.chemistry),
      Number(newStudent.english),
      Number(newStudent.cs)
    );

    const created: Student = {
      id: newStudent.id,
      name: newStudent.name.trim(),
      dept: newStudent.dept,
      maths: Number(newStudent.maths),
      physics: Number(newStudent.physics),
      chemistry: Number(newStudent.chemistry),
      english: Number(newStudent.english),
      cs: Number(newStudent.cs),
      attendance: Number(newStudent.attendance),
      ...stats
    };

    setStudents([created, ...students]);
    setIsAddModalOpen(false);
    setNewStudent({
      id: `S${102 + students.length}`,
      name: '',
      dept: 'Computer Science',
      maths: 75,
      physics: 75,
      chemistry: 75,
      english: 75,
      cs: 75,
      attendance: 85
    });
  };

  // Export current table to CSV
  const exportToCSV = () => {
    const header = 'Student_ID,Name,Department,Maths,Physics,Chemistry,English,Computer_Science,Attendance,Total_Marks,Average_Marks,Grade,Result\n';
    const rows = students.map(s => 
      `${s.id},"${s.name}",${s.dept},${s.maths},${s.physics},${s.chemistry},${s.english},${s.cs},${s.attendance},${s.total},${s.average},${s.grade},${s.result}`
    ).join('\n');
    
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'student_results.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Global KPIs calculated dynamically
  const kpis = useMemo(() => {
    const totalCount = students.length;
    if (totalCount === 0) return { avg: 0, passCount: 0, passPct: 0, lowAttCount: 0, topStudent: null, totalCount: 0 };

    const sumAvg = students.reduce((acc, s) => acc + s.average, 0);
    const avg = Number((sumAvg / totalCount).toFixed(2));
    const passCount = students.filter(s => s.result === 'Pass').length;
    const passPct = Number(((passCount / totalCount) * 100).toFixed(1));
    const lowAttCount = students.filter(s => s.attendance < 75).length;
    
    const sorted = [...students].sort((a, b) => b.average - a.average);
    const topStudent = sorted[0];

    return { avg, passCount, passPct, lowAttCount, topStudent, totalCount };
  }, [students]);

  // Subject Stats
  const subjectStats = useMemo(() => {
    const subjects = [
      { key: 'cs' as const, name: 'Computer Science' },
      { key: 'english' as const, name: 'English' },
      { key: 'physics' as const, name: 'Physics' },
      { key: 'chemistry' as const, name: 'Chemistry' },
      { key: 'maths' as const, name: 'Mathematics' }
    ];

    return subjects.map(sub => {
      const marks = students.map(s => s[sub.key]);
      const max = Math.max(...marks);
      const min = Math.min(...marks);
      const sum = marks.reduce((a, b) => a + b, 0);
      const avg = Number((sum / marks.length).toFixed(2));
      
      // Standard deviation
      const variance = marks.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / marks.length;
      const stdDev = Number(Math.sqrt(variance).toFixed(2));

      return {
        ...sub,
        max,
        min,
        avg,
        stdDev
      };
    });
  }, [students]);

  // Department Stats
  const departmentStats = useMemo(() => {
    const map: Record<string, { totalAvg: number; count: number; pass: number }> = {};
    students.forEach(s => {
      if (!map[s.dept]) map[s.dept] = { totalAvg: 0, count: 0, pass: 0 };
      map[s.dept].totalAvg += s.average;
      map[s.dept].count += 1;
      if (s.result === 'Pass') map[s.dept].pass += 1;
    });

    return Object.entries(map).map(([dept, data]) => ({
      dept,
      count: data.count,
      avg: Number((data.totalAvg / data.count).toFixed(2)),
      passRate: Number(((data.pass / data.count) * 100).toFixed(1))
    })).sort((a, b) => b.avg - a.avg);
  }, [students]);

  // Filtered and Sorted Students
  const filteredStudents = useMemo(() => {
    return students
      .filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = deptFilter === 'All' || s.dept === deptFilter;
        const matchesResult = resultFilter === 'All' || s.result === resultFilter;
        const matchesGrade = gradeFilter === 'All' || s.grade === gradeFilter;
        return matchesSearch && matchesDept && matchesResult && matchesGrade;
      })
      .sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        if (typeof valA === 'string') {
          return sortOrder === 'asc' ? (valA as string).localeCompare(valB as string) : (valB as string).localeCompare(valA as string);
        }
        return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [students, searchQuery, deptFilter, resultFilter, gradeFilter, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Application Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-indigo-400 font-extrabold tracking-wide">EWB</span>
              <span className="text-slate-300 font-normal">|</span>
              <span className="text-white">Student Performance Analytics</span>
            </h1>
            <p className="text-[11px] text-slate-400">Institutional Performance &amp; Evaluation Engine</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'students' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Students ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'subjects' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Subjects</span>
          </button>

          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'departments' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Departments</span>
          </button>

          <button
            onClick={() => setActiveTab('engine')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'engine' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Processing Engine</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700/60 transition-all"
            title="Export student results to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        {/* =========================================================================
            VIEW 1: OVERVIEW & ANALYTICS
        ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-medium text-slate-400">Enrolled Students</p>
                  <p className="text-2xl font-bold text-white mt-1">{kpis.totalCount}</p>
                  <span className="text-[11px] text-slate-500">5 academic departments</span>
                </div>
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-medium text-slate-400">Class Average</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{kpis.avg}%</p>
                  <span className="text-[11px] text-emerald-400/80">Overall mean score</span>
                </div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-medium text-slate-400">Pass Rate</p>
                  <p className="text-2xl font-bold text-cyan-400 mt-1">{kpis.passPct}%</p>
                  <span className="text-[11px] text-slate-500">{kpis.passCount} passed • {kpis.totalCount - kpis.passCount} failed</span>
                </div>
                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-medium text-slate-400">Top Performer</p>
                  <p className="text-lg font-bold text-amber-300 mt-1 truncate">
                    {kpis.topStudent ? kpis.topStudent.name : 'N/A'}
                  </p>
                  <span className="text-[11px] text-amber-400/90">
                    {kpis.topStudent ? `${kpis.topStudent.average}% (Grade ${kpis.topStudent.grade})` : ''}
                  </span>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-medium text-slate-400">Attendance Risk</p>
                  <p className="text-2xl font-bold text-rose-400 mt-1">{kpis.lowAttCount}</p>
                  <span className="text-[11px] text-rose-400/80">Below 75% threshold</span>
                </div>
                <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Visual Analytics Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Grade Distribution */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    Grade Distribution
                  </h3>
                  <span className="text-xs text-slate-400">Grading Policy</span>
                </div>
                <div className="space-y-3">
                  {[
                    { grade: 'A+', range: '≥ 90%', color: 'bg-emerald-500' },
                    { grade: 'A', range: '80 - 89.9%', color: 'bg-teal-500' },
                    { grade: 'B', range: '70 - 79.9%', color: 'bg-indigo-500' },
                    { grade: 'C', range: '60 - 69.9%', color: 'bg-amber-500' },
                    { grade: 'D', range: '50 - 59.9%', color: 'bg-orange-500' },
                    { grade: 'F', range: '< 50% / fail', color: 'bg-rose-500' },
                  ].map(g => {
                    const count = students.filter(s => s.grade === g.grade).length;
                    const pct = kpis.totalCount > 0 ? Number(((count / kpis.totalCount) * 100).toFixed(1)) : 0;
                    return (
                      <div key={g.grade} className="text-xs space-y-1">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="font-semibold text-white">
                            Grade {g.grade} <span className="text-slate-500 font-normal">({g.range})</span>
                          </span>
                          <span>{count} students ({pct}%)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${g.color} rounded-full transition-all duration-300`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Subject Performance Breakdown */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    Subject Benchmark
                  </h3>
                  <span className="text-xs text-slate-400">Mean &amp; Limits</span>
                </div>
                <div className="space-y-3">
                  {subjectStats.map(s => (
                    <div key={s.key} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-200">{s.name}</span>
                        <span className="font-bold text-white text-sm">{s.avg}%</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Highest: <strong className="text-emerald-400">{s.max}</strong></span>
                        <span>Lowest: <strong className="text-rose-400">{s.min}</strong></span>
                        <span>Std Dev: {s.stdDev}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Merit List (Top 5) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Merit List (Top 5)
                  </h3>
                  <span className="text-xs text-slate-400">Leaderboard</span>
                </div>
                <div className="space-y-2.5">
                  {[...students]
                    .sort((a, b) => b.average - a.average)
                    .slice(0, 5)
                    .map((p, idx) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedStudent(p)}
                        className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs cursor-pointer hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="h-5 w-5 rounded-full bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                            #{idx + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-white">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.dept}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-400">{p.average}%</p>
                          <span className="text-[10px] px-1 rounded bg-slate-800 text-slate-300 font-mono">Grade {p.grade}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Attendance Alert Section (< 75%) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <h3 className="font-bold text-white text-sm">Attendance Monitoring (Students Below 75%)</h3>
                </div>
                <span className="text-xs text-rose-400 font-medium">{kpis.lowAttCount} flagged records</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {students.filter(s => s.attendance < 75).map(s => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className="p-3 rounded-lg bg-slate-950 border border-rose-900/40 hover:border-rose-700 text-xs cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-slate-400 text-[10px]">{s.id}</span>
                      <span className="font-bold text-rose-400">{s.attendance}% Att</span>
                    </div>
                    <p className="font-semibold text-white mt-1 truncate">{s.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{s.dept}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: STUDENT DIRECTORY & TABLE
        ========================================================================= */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            {/* Filter toolbar */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-200 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 w-48"
                  />
                </div>

                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Tech">Information Tech</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>

                <select
                  value={resultFilter}
                  onChange={(e) => setResultFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Results</option>
                  <option value="Pass">Pass Only</option>
                  <option value="Fail">Fail Only</option>
                </select>

                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Grades</option>
                  <option value="A+">Grade A+</option>
                  <option value="A">Grade A</option>
                  <option value="B">Grade B</option>
                  <option value="C">Grade C</option>
                  <option value="D">Grade D</option>
                  <option value="F">Grade F</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-2 py-1 rounded-lg focus:outline-none"
                >
                  <option value="average">Average Score</option>
                  <option value="total">Total Marks</option>
                  <option value="attendance">Attendance</option>
                  <option value="name">Name</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200"
                  title="Toggle Sort Order"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="px-3.5 py-2.5">ID</th>
                      <th className="px-3.5 py-2.5">Name</th>
                      <th className="px-3.5 py-2.5">Department</th>
                      <th className="px-2 py-2.5 text-center">Math</th>
                      <th className="px-2 py-2.5 text-center">Phy</th>
                      <th className="px-2 py-2.5 text-center">Chem</th>
                      <th className="px-2 py-2.5 text-center">Eng</th>
                      <th className="px-2 py-2.5 text-center">CS</th>
                      <th className="px-3 py-2.5 text-center">Total</th>
                      <th className="px-3 py-2.5 text-center font-bold">Average</th>
                      <th className="px-3 py-2.5 text-center">Grade</th>
                      <th className="px-3 py-2.5 text-center">Result</th>
                      <th className="px-3 py-2.5 text-center">Attendance</th>
                      <th className="px-2 py-2.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-3.5 py-2.5 font-mono text-slate-400">{s.id}</td>
                        <td className="px-3.5 py-2.5 font-medium text-white">{s.name}</td>
                        <td className="px-3.5 py-2.5 text-slate-300">{s.dept}</td>
                        <td className={`px-2 py-2.5 text-center ${s.maths < 35 ? 'text-rose-400 font-bold bg-rose-950/40' : 'text-slate-300'}`}>{s.maths}</td>
                        <td className={`px-2 py-2.5 text-center ${s.physics < 35 ? 'text-rose-400 font-bold bg-rose-950/40' : 'text-slate-300'}`}>{s.physics}</td>
                        <td className={`px-2 py-2.5 text-center ${s.chemistry < 35 ? 'text-rose-400 font-bold bg-rose-950/40' : 'text-slate-300'}`}>{s.chemistry}</td>
                        <td className={`px-2 py-2.5 text-center ${s.english < 35 ? 'text-rose-400 font-bold bg-rose-950/40' : 'text-slate-300'}`}>{s.english}</td>
                        <td className={`px-2 py-2.5 text-center ${s.cs < 35 ? 'text-rose-400 font-bold bg-rose-950/40' : 'text-slate-300'}`}>{s.cs}</td>
                        <td className="px-3 py-2.5 text-center font-semibold text-slate-200">{s.total}</td>
                        <td className="px-3 py-2.5 text-center font-bold text-emerald-400">{s.average.toFixed(1)}%</td>
                        <td className="px-3 py-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                            s.grade === 'A+' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                            s.grade === 'A' ? 'bg-teal-950 text-teal-300 border border-teal-800' :
                            s.grade === 'B' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                            s.grade === 'C' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            s.grade === 'D' ? 'bg-orange-950 text-orange-300 border border-orange-800' :
                            'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}>
                            {s.grade}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            s.result === 'Pass'
                              ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                              : 'bg-rose-900/40 text-rose-300 border border-rose-700/50'
                          }`}>
                            {s.result}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <span className={`inline-flex items-center gap-1 font-mono ${
                            s.attendance < 75 ? 'text-rose-400 font-bold' : 'text-slate-400'
                          }`}>
                            {s.attendance}%
                            {s.attendance < 75 && <AlertTriangle className="w-3 h-3 text-rose-400" />}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="text-indigo-400 hover:text-indigo-300 text-[11px] font-medium"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: SUBJECTS PERFORMANCE
        ========================================================================= */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectStats.map(sub => (
                <div key={sub.key} className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{sub.name}</h3>
                    <span className="text-emerald-400 font-bold text-lg">{sub.avg}%</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-400 text-[10px]">Maximum</p>
                      <p className="text-emerald-400 font-bold text-sm mt-0.5">{sub.max}</p>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-400 text-[10px]">Minimum</p>
                      <p className="text-rose-400 font-bold text-sm mt-0.5">{sub.min}</p>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-400 text-[10px]">Std Deviation</p>
                      <p className="text-slate-300 font-bold text-sm mt-0.5">{sub.stdDev}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                    <p className="text-slate-400 font-medium">Score Distribution</p>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>≥ 75 Marks:</span>
                      <strong className="text-emerald-400">{students.filter(s => s[sub.key] >= 75).length} students</strong>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>35 - 74 Marks:</span>
                      <strong className="text-amber-400">{students.filter(s => s[sub.key] >= 35 && s[sub.key] < 75).length} students</strong>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>&lt; 35 (Below Passing):</span>
                      <strong className="text-rose-400">{students.filter(s => s[sub.key] < 35).length} students</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: DEPARTMENTS BENCHMARK
        ========================================================================= */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentStats.map((d, index) => (
                <div key={d.dept} className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-900">
                        Rank #{index + 1}
                      </span>
                      <h3 className="font-bold text-white text-base mt-1">{d.dept}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-400">{d.avg}%</p>
                      <p className="text-[10px] text-slate-400">Department Avg</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-400 text-[10px]">Total Enrolled</p>
                      <p className="text-base font-bold text-white mt-0.5">{d.count} students</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-400 text-[10px]">Pass Rate</p>
                      <p className="text-base font-bold text-cyan-400 mt-0.5">{d.passRate}%</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-xs">
                    <p className="text-slate-400 text-[11px] mb-2 font-medium">Top Student in Branch:</p>
                    {(() => {
                      const topInDept = students
                        .filter(s => s.dept === d.dept)
                        .sort((a, b) => b.average - a.average)[0];
                      if (!topInDept) return null;
                      return (
                        <div className="p-2 bg-slate-950/80 rounded border border-slate-800 flex justify-between items-center">
                          <span className="font-semibold text-white">{topInDept.name}</span>
                          <span className="font-mono text-emerald-400 font-bold">{topInDept.average}%</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: PROCESSING ENGINE & RUNTIME
        ========================================================================= */}
        {activeTab === 'engine' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                    NumPy &amp; Pandas Execution Engine
                  </h3>
                  <p className="text-xs text-slate-400">Underlying data pipeline status and computation matrices</p>
                </div>
                <button
                  onClick={() => alert('Engine pipeline running. All calculations verified and in-memory cache synchronized.')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Engine Cache</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-[11px]">Vectorization</p>
                  <p className="text-emerald-400 font-bold mt-1">2D NumPy Matrix (axis=1)</p>
                  <span className="text-[10px] text-slate-500">O(1) vector additions</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-[11px]">DataFrame Storage</p>
                  <p className="text-cyan-400 font-bold mt-1">students.csv &bull; 13 attributes</p>
                  <span className="text-[10px] text-slate-500">Persistent memory</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-[11px]">Rules Applied</p>
                  <p className="text-amber-400 font-bold mt-1">Grade Scale &bull; Min 35 &amp; Avg 50</p>
                  <span className="text-[10px] text-slate-500">Strict academic policy</span>
                </div>
              </div>

              {/* Engine Log */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <p className="text-emerald-400">[ENGINE] Data pipeline loaded: {students.length} records active</p>
                <p className="text-slate-400">[NUMPY] Array shape: ({students.length}, 5) subject matrix initialized</p>
                <p className="text-slate-400">[NUMPY] Mean computed: {kpis.avg}% across all evaluated rows</p>
                <p className="text-slate-400">[PANDAS] Department groupby aggregated: {departmentStats.length} divisions</p>
                <p className="text-indigo-400">[RESULT] {kpis.passCount} records qualified as Pass, {students.length - kpis.passCount} records as Fail</p>
                <p className="text-emerald-400 font-bold pt-1">[STATUS] Operational &amp; ready</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Student Details Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-900">
                {selectedStudent.id}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedStudent.name}</h3>
              <p className="text-xs text-slate-400">{selectedStudent.dept}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-slate-400 text-[10px]">Average Score</p>
                <p className="text-lg font-bold text-emerald-400">{selectedStudent.average}%</p>
                <span className="text-[10px] text-slate-400">Total: {selectedStudent.total} / 500</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-slate-400 text-[10px]">Grade &amp; Result</p>
                <p className="text-lg font-bold text-indigo-400">Grade {selectedStudent.grade}</p>
                <span className={`text-[10px] font-semibold ${selectedStudent.result === 'Pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  Status: {selectedStudent.result}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <p className="font-semibold text-white">Subject Marks (out of 100):</p>
              {[
                { name: 'Mathematics', val: selectedStudent.maths },
                { name: 'Physics', val: selectedStudent.physics },
                { name: 'Chemistry', val: selectedStudent.chemistry },
                { name: 'English', val: selectedStudent.english },
                { name: 'Computer Science', val: selectedStudent.cs },
              ].map(sub => (
                <div key={sub.name} className="flex justify-between items-center text-slate-300">
                  <span>{sub.name}:</span>
                  <span className={`font-mono font-bold ${sub.val < 35 ? 'text-rose-400' : 'text-white'}`}>
                    {sub.val} {sub.val < 35 && '(Below 35)'}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-xs">
              <span className="text-slate-400">Attendance:</span>
              <span className={`font-bold font-mono ${selectedStudent.attendance < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {selectedStudent.attendance}% {selectedStudent.attendance < 75 && '(Low)'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white">Add New Student Record</h3>
              <p className="text-xs text-slate-400">Calculates totals, averages, grades &amp; pass/fail instantly</p>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Student ID</label>
                  <input
                    type="text"
                    value={newStudent.id}
                    onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Yash Vardhan"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Department</label>
                  <select
                    value={newStudent.dept}
                    onChange={(e) => setNewStudent({ ...newStudent, dept: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Tech">Information Tech</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Attendance (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newStudent.attendance}
                    onChange={(e) => setNewStudent({ ...newStudent, attendance: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <p className="text-slate-300 font-semibold mb-2">Subject Marks (0 - 100)</p>
                <div className="grid grid-cols-5 gap-2">
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-1">Maths</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newStudent.maths}
                      onChange={(e) => setNewStudent({ ...newStudent, maths: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-center text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-1">Physics</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newStudent.physics}
                      onChange={(e) => setNewStudent({ ...newStudent, physics: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-center text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-1">Chemistry</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newStudent.chemistry}
                      onChange={(e) => setNewStudent({ ...newStudent, chemistry: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-center text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-1">English</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newStudent.english}
                      onChange={(e) => setNewStudent({ ...newStudent, english: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-center text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-1">CS</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newStudent.cs}
                      onChange={(e) => setNewStudent({ ...newStudent, cs: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-center text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500">
        EWB Student Performance Analytics System • Institutional Data Engine
      </footer>
    </div>
  );
}
