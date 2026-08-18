import React from 'react';
import { useApp } from '../../context/AppContext';

interface HeaderKopSekolahProps {
  documentTitle?: string;
  subTitle?: string;
  hideBorder?: boolean;
}

export const HeaderKopSekolah: React.FC<HeaderKopSekolahProps> = ({
  documentTitle,
  subTitle,
  hideBorder = false
}) => {
  const { schoolInfo } = useApp();

  return (
    <div className={`mb-6 text-center text-black print:text-black ${!hideBorder ? 'border-b-4 border-double border-slate-900 pb-3' : ''}`}>
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* Logo Kemdikbud / Tut Wuri Handayani */}
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-blue-900 text-white shadow-sm print:border print:border-black">
          <div className="text-center font-serif text-xs font-bold leading-tight">
            <span className="block text-[10px] tracking-wider text-amber-300">TUT WURI</span>
            <span className="text-sm tracking-wider font-extrabold text-white">SDN</span>
            <span className="block text-[9px] text-amber-200">HANDAYANI</span>
          </div>
        </div>

        {/* Text Header Kop */}
        <div className="text-center">
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-700 print:text-black">
            PEMERINTAH PROVINSI {schoolInfo.province.toUpperCase()}
          </h3>
          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700 print:text-black">
            DINAS PENDIDIKAN DAN KEBUDAYAAN
          </h3>
          <h1 className="text-base sm:text-xl font-extrabold uppercase tracking-tight text-blue-900 print:text-black">
            {schoolInfo.schoolName}
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-600 print:text-black">
            {schoolInfo.address}, Kec. {schoolInfo.subdistrict}, {schoolInfo.city}, Kode Pos {schoolInfo.postalCode}
          </p>
          <p className="text-[10px] sm:text-xs text-slate-600 print:text-black">
            NPSN: <span className="font-semibold">{schoolInfo.npsn}</span> | Telp: {schoolInfo.phoneNumber} | Email: {schoolInfo.email}
          </p>
        </div>

        {/* Logo Provinsi / Sekolah */}
        <div className="hidden sm:flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white shadow-sm print:flex print:border print:border-black">
          <div className="text-center font-sans text-xs font-bold leading-tight">
            <span className="block text-[9px] uppercase tracking-wider text-orange-100">KAMPUS</span>
            <span className="text-xs tracking-wider font-extrabold text-white">MERDEKA</span>
            <span className="block text-[8px] text-orange-200">BELAJAR</span>
          </div>
        </div>
      </div>

      {documentTitle && (
        <div className="mt-4 border-t border-slate-300 pt-3 print:mt-3 print:pt-2">
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 print:text-black underline underline-offset-4">
            {documentTitle}
          </h2>
          {subTitle && (
            <p className="mt-0.5 text-xs font-medium text-slate-600 print:text-black">
              {subTitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
