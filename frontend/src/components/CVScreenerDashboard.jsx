import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Briefcase, 
  Mail, 
  FileSearch,
  AlertCircle
} from 'lucide-react';

function CVScreenerDashboard({ results }) {
  if (!results || results.length === 0) return null;

  const passedCVs = results.filter(r => r.passed).length;
  const failedCVs = results.length - passedCVs;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex items-center gap-5">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
            <FileSearch className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Tổng CV</p>
            <p className="text-3xl font-black text-slate-800">{results.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex items-center gap-5">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Đạt (Pass)</p>
            <p className="text-3xl font-black text-emerald-600">{passedCVs}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex items-center gap-5">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl">
            <XCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Loại (Fail)</p>
            <p className="text-3xl font-black text-rose-600">{failedCVs}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Chi tiết Phân tích ({results.length} Candidates)</h3>
        </div>

        {results.map((result, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h4 className="text-xl font-black text-slate-800">
                  {result.candidate_name || result.filename || 'Ứng viên không xác định'}
                </h4>
                <div className="flex items-center gap-3 mt-3 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>{result.filename || 'N/A'}</span>
                  </div>
                  {result.email && (
                    <>
                      <span className="opacity-30 text-lg">•</span>
                      <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        <Mail className="w-4 h-4" />
                        <span>{result.email}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col items-center justify-center min-w-[80px] bg-white rounded-2xl py-2 px-4 border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Điểm AI</span>
                  <span className="text-2xl font-black text-indigo-600 leading-none">{result.score || 0}</span>
                </div>
                
                {result.passed ? (
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 py-2.5 px-5 rounded-2xl border border-emerald-200 font-bold shadow-sm shadow-emerald-100">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>TRẠNG THÁI ĐẠT</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-rose-50 text-rose-700 py-2.5 px-5 rounded-2xl border border-rose-200 font-bold shadow-sm shadow-rose-100">
                    <XCircle className="w-5 h-5" />
                    <span>TRẠNG THÁI LOẠI</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-slate-400" />
                Evaluation Result
              </h5>
              
              <div className="space-y-6">
                {result.summary && (
                  <div className="bg-indigo-50/50 border border-indigo-100/60 rounded-2xl p-5">
                    <h6 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.15em] mb-3 flex items-center gap-1.5">
                      Overall Summary
                    </h6>
                    <p className="text-[15px] text-slate-700 leading-relaxed font-medium">{result.summary}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-6">
                    <h6 className="text-[11px] font-black text-emerald-700 uppercase tracking-[0.15em] mb-5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4"/> Strengths
                    </h6>
                    {result.strengths && result.strengths.length > 0 ? (
                      <ul className="space-y-3.5 mb-0">
                        {result.strengths.map((str, i) => (
                          <li key={i} className="text-[14px] text-emerald-950 flex items-start gap-3">
                            <span className="text-emerald-500 mt-1.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            </span>
                            <span className="leading-relaxed opacity-90">{str}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-emerald-700 italic opacity-80">Không có điểm mạnh nổi bật.</p>
                    )}
                  </div>

                  <div className="bg-rose-50/30 border border-rose-100/50 rounded-2xl p-6">
                    <h6 className="text-[11px] font-black text-rose-700 uppercase tracking-[0.15em] mb-5 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4"/> Weaknesses & Missing
                    </h6>
                    {(() => {
                      const renderableWeaknesses = (result.weaknesses || []).filter(
                        wk => typeof wk === 'string' && wk.trim() !== '' && !wk.toLowerCase().includes("không có điểm yếu")
                      );

                      if (renderableWeaknesses.length > 0) {
                        return (
                          <ul className="space-y-3.5 mb-0">
                            {renderableWeaknesses.map((wk, i) => (
                              <li key={i} className="text-[14px] text-rose-950 flex items-start gap-3">
                                <span className="text-rose-500 mt-1.5 flex-shrink-0">
                                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                </span>
                                <span className="leading-relaxed opacity-90">{wk}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <div className="flex items-center gap-2 mt-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <p className="text-sm text-emerald-700 italic opacity-90 font-medium">Bám sát JD, ứng viên không có điểm yếu nào đáng chú ý.</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CVScreenerDashboard;