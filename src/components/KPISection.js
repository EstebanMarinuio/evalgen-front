import React from 'react';
import { Users, CheckCircle, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

const KPISection = () => {
  const kpis = [
    {
      title: 'Total de Estudiantes',
      value: '247',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Evaluaciones Completadas',
      value: '1,847',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Promedio General',
      value: '8.4',
      icon: BarChart3,
      color: 'text-navy-600',
      bgColor: 'bg-navy-50',
      change: '+0.3',
      changeType: 'positive'
    },
    {
      title: 'Avance del Curso',
      value: '73%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Estudiantes en Riesgo',
      value: '23',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-3',
      changeType: 'negative'
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Indicadores Clave de Rendimiento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <div key={index} className="kpi-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                <p className="text-sm text-gray-600">{kpi.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KPISection;
