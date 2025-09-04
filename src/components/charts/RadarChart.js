import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const RadarChart = () => {
  const svgRef = useRef();
  const [selectedStudents, setSelectedStudents] = useState(['Ana García', 'Carlos López']);

  const students = [
    { name: 'Ana García', python: 9.2, spark: 8.5, r: 8.8, analitica: 9.0, visualizacion: 8.7 },
    { name: 'Carlos López', python: 8.1, spark: 7.9, r: 8.3, analitica: 8.5, visualizacion: 8.0 },
    { name: 'María Rodríguez', python: 8.8, spark: 8.2, r: 8.6, analitica: 8.9, visualizacion: 8.4 },
    { name: 'José Martínez', python: 7.5, spark: 7.8, r: 7.9, analitica: 8.1, visualizacion: 7.7 },
    { name: 'Laura Sánchez', python: 9.0, spark: 8.7, r: 8.9, analitica: 9.1, visualizacion: 8.8 }
  ];

  const subjects = [
    { key: 'python', label: 'Python' },
    { key: 'spark', label: 'Spark' },
    { key: 'r', label: 'R' },
    { key: 'analitica', label: 'Analítica' },
    { key: 'visualizacion', label: 'Visualización' }
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2 - 20;

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

    // Escalas
    const angleScale = d3.scaleLinear()
      .domain([0, subjects.length])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, radius]);

    // Círculos concéntricos
    const circles = [2, 4, 6, 8, 10];
    g.selectAll(".circle")
      .data(circles)
      .enter().append("circle")
      .attr("class", "circle")
      .attr("r", d => radiusScale(d))
      .attr("fill", "none")
      .attr("stroke", "#E5E7EB")
      .attr("stroke-width", 1);

    // Líneas radiales
    g.selectAll(".radial-line")
      .data(subjects)
      .enter().append("line")
      .attr("class", "radial-line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => radius * Math.cos(angleScale(i) - Math.PI / 2))
      .attr("y2", (d, i) => radius * Math.sin(angleScale(i) - Math.PI / 2))
      .attr("stroke", "#E5E7EB")
      .attr("stroke-width", 1);

    // Etiquetas de materias
    g.selectAll(".subject-label")
      .data(subjects)
      .enter().append("text")
      .attr("class", "subject-label")
      .attr("x", (d, i) => (radius + 15) * Math.cos(angleScale(i) - Math.PI / 2))
      .attr("y", (d, i) => (radius + 15) * Math.sin(angleScale(i) - Math.PI / 2))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px")
      .style("fill", "#6B7280")
      .text(d => d.label);

    // Etiquetas de valores
    g.selectAll(".value-label")
      .data(circles)
      .enter().append("text")
      .attr("class", "value-label")
      .attr("x", 5)
      .attr("y", d => -radiusScale(d))
      .style("font-size", "10px")
      .style("fill", "#9CA3AF")
      .text(d => d);

    // Colores para estudiantes
    const colors = d3.schemeCategory10;

    // Datos de estudiantes seleccionados
    const selectedData = students.filter(s => selectedStudents.includes(s.name));

    // Función para crear polígono
    const createPolygon = (student, color) => {
      const points = subjects.map((subject, i) => {
        const angle = angleScale(i) - Math.PI / 2;
        const r = radiusScale(student[subject.key]);
        return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
      }).join(' ');

      return g.append("polygon")
        .attr("points", points)
        .attr("fill", color)
        .attr("opacity", 0.3)
        .attr("stroke", color)
        .attr("stroke-width", 2);
    };

    // Crear polígonos para estudiantes seleccionados
    selectedData.forEach((student, i) => {
      createPolygon(student, colors[i]);
    });

    // Puntos para cada estudiante
    selectedData.forEach((student, i) => {
      subjects.forEach((subject, j) => {
        const angle = angleScale(j) - Math.PI / 2;
        const r = radiusScale(student[subject.key]);
        
        g.append("circle")
          .attr("cx", r * Math.cos(angle))
          .attr("cy", r * Math.sin(angle))
          .attr("r", 4)
          .attr("fill", colors[i])
          .attr("stroke", "white")
          .attr("stroke-width", 2);
      });
    });

  }, [selectedStudents, students, subjects]);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🎯 Comparación de Estudiantes</h3>
        <div className="flex space-x-2">
          {students.map((student, index) => (
            <button
              key={student.name}
              onClick={() => {
                if (selectedStudents.includes(student.name)) {
                  setSelectedStudents(selectedStudents.filter(s => s !== student.name));
                } else if (selectedStudents.length < 3) {
                  setSelectedStudents([...selectedStudents, student.name]);
                }
              }}
              className={`px-3 py-1 text-xs rounded-full ${
                selectedStudents.includes(student.name)
                  ? 'bg-navy-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {student.name}
            </button>
          ))}
        </div>
      </div>
      <svg
        ref={svgRef}
        width={500}
        height={500}
        className="w-full h-auto"
      />
      <div className="mt-4 text-sm text-gray-600">
        <p>Selecciona hasta 3 estudiantes para comparar su rendimiento en las diferentes materias.</p>
      </div>
    </div>
  );
};

export default RadarChart;
