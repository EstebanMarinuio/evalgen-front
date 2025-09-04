import React from 'react';
import { GraduationCap, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-10 w-10 text-navy-300" />
            <div>
              <h1 className="text-3xl font-bold">Dashboard Académico</h1>
              <p className="text-navy-200 text-lg">Ciencia de Datos</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-2 text-navy-200">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">Tiempo real</span>
          </div>
        </div>
        
        <div className="bg-navy-800 rounded-lg p-6 border border-navy-700">
          <p className="text-navy-100 leading-relaxed">
            Este dashboard permite visualizar el progreso académico de estudiantes en diversas áreas clave de ciencia de datos. 
            Las métricas e indicadores se actualizan dinámicamente para reflejar el rendimiento individual y grupal.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
