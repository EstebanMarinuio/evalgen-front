import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Datos simulados de estudiantes con correlaciones entre materias
    const data = [
      { python: 7.2, spark: 6.8, r: 7.5, analitica: 7.0, visualizacion: 6.9, estudiante: 'Estudiante 1' },
      { python: 8.5, spark: 8.1, r: 8.3, analitica: 8.2, visualizacion: 8.0, estudiante: 'Estudiante 2' },
      { python: 9.1, spark: 8.7, r: 8.9, analitica: 8.8, visualizacion: 8.6, estudiante: 'Estudiante 3' },
      { python: 6.8, spark: 6.5, r: 7.0, analitica: 6.7, visualizacion: 6.4, estudiante: 'Estudiante 4' },
      { python: 8.9, spark: 8.4, r: 8.6, analitica: 8.5, visualizacion: 8.3, estudiante: 'Estudiante 5' },
      { python: 7.5, spark: 7.2, r: 7.8, analitica: 7.3, visualizacion: 7.1, estudiante: 'Estudiante 6' },
      { python: 8.2, spark: 7.9, r: 8.1, analitica: 8.0, visualizacion: 7.8, estudiante: 'Estudiante 7' },
      { python: 9.3, spark: 8.9, r: 9.1, analitica: 9.0, visualizacion: 8.8, estudiante: 'Estudiante 8' },
      { python: 7.8, spark: 7.5, r: 8.0, analitica: 7.6, visualizacion: 7.4, estudiante: 'Estudiante 9' },
      { python: 8.7, spark: 8.3, r: 8.5, analitica: 8.4, visualizacion: 8.2, estudiante: 'Estudiante 10' },
      { python: 6.9, spark: 6.6, r: 7.2, analitica: 6.8, visualizacion: 6.5, estudiante: 'Estudiante 11' },
      { python: 8.4, spark: 8.0, r: 8.2, analitica: 8.1, visualizacion: 7.9, estudiante: 'Estudiante 12' },
      { python: 9.0, spark: 8.6, r: 8.8, analitica: 8.7, visualizacion: 8.5, estudiante: 'Estudiante 13' },
      { python: 7.3, spark: 7.0, r: 7.6, analitica: 7.1, visualizacion: 6.8, estudiante: 'Estudiante 14' },
      { python: 8.6, spark: 8.2, r: 8.4, analitica: 8.3, visualizacion: 8.1, estudiante: 'Estudiante 15' }
    ];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.python))
      .nice()
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.spark))
      .nice()
      .range([height, 0]);

    // Color scale basado en rendimiento general
    const colorScale = d3.scaleLinear()
      .domain([6, 10])
      .range(["#EF4444", "#10B981"]);

    // Línea de tendencia
    const xValues = data.map(d => d.python);
    const yValues = data.map(d => d.spark);
    
    const n = xValues.length;
    const sumX = d3.sum(xValues);
    const sumY = d3.sum(yValues);
    const sumXY = d3.sum(xValues.map((x, i) => x * yValues[i]));
    const sumXX = d3.sum(xValues.map(x => x * x));
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const trendLine = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    const trendData = [
      { x: d3.min(xValues), y: slope * d3.min(xValues) + intercept },
      { x: d3.max(xValues), y: slope * d3.max(xValues) + intercept }
    ];

    g.append("path")
      .datum(trendData)
      .attr("fill", "none")
      .attr("stroke", "#6B7280")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("d", trendLine);

    // Puntos
    g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.python))
      .attr("cy", d => y(d.spark))
      .attr("r", 6)
      .attr("fill", d => colorScale((d.python + d.spark + d.r + d.analitica + d.visualizacion) / 5))
      .attr("opacity", 0.7)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("r", 8);
        
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "8px 12px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", "1000");

        const promedio = (d.python + d.spark + d.r + d.analitica + d.visualizacion) / 5;
        
        tooltip.html(`
          <strong>${d.estudiante}</strong><br/>
          Python: ${d.python}<br/>
          Spark: ${d.spark}<br/>
          R: ${d.r}<br/>
          Analítica: ${d.analitica}<br/>
          Visualización: ${d.visualizacion}<br/>
          <strong>Promedio: ${promedio.toFixed(1)}</strong>
        `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("r", 6);
        d3.selectAll(".tooltip").remove();
      });

    // Ejes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#6B7280");

    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#6B7280");

    // Etiquetas de ejes
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#374151")
      .text("Calificación Spark");

    g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 5})`)
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#374151")
      .text("Calificación Python");

    // Título
    g.append("text")
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#374151")
      .text("Correlación Python vs Spark");

    // Leyenda de color
    const legend = g.append("g")
      .attr("transform", `translate(${width - 100}, 20)`);

    const legendScale = d3.scaleLinear()
      .domain([6, 10])
      .range([0, 80]);

    const legendAxis = d3.axisRight(legendScale)
      .tickValues([6, 7, 8, 9, 10])
      .tickFormat(d3.format(".1f"));

    legend.append("g")
      .call(legendAxis)
      .selectAll("text")
      .style("font-size", "10px")
      .style("fill", "#6B7280");

    legend.append("text")
      .attr("x", 10)
      .attr("y", -10)
      .style("font-size", "12px")
      .style("fill", "#374151")
      .text("Promedio General");

    // Gradiente de color para la leyenda
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "colorGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 0).attr("y2", 80);

    gradient.selectAll("stop")
      .data([
        { offset: "0%", color: "#EF4444" },
        { offset: "100%", color: "#10B981" }
      ])
      .enter().append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);

    legend.append("rect")
      .attr("width", 10)
      .attr("height", 80)
      .attr("fill", "url(#colorGradient)");

  }, []);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🔵 Correlaciones entre Materias</h3>
        <div className="text-sm text-gray-500">
          Python vs Spark
        </div>
      </div>
      <svg
        ref={svgRef}
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <div className="mt-4 text-sm text-gray-600">
        <p>Cada punto representa un estudiante. El color indica el promedio general de todas las materias.</p>
      </div>
    </div>
  );
};

export default ScatterChart;
