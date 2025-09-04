import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [
      { materia: 'Python', promedio: 8.7, estudiantes: 247 },
      { materia: 'Spark', promedio: 7.9, estudiantes: 198 },
      { materia: 'R', promedio: 8.2, estudiantes: 156 },
      { materia: 'Analítica de Datos', promedio: 8.5, estudiantes: 234 },
      { materia: 'Visualización', promedio: 8.1, estudiantes: 189 }
    ];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.materia))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.promedio)])
      .nice()
      .range([height, 0]);

    // Barras
    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.materia))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.promedio))
      .attr("height", d => height - y(d.promedio))
      .attr("fill", (d, i) => d3.schemeCategory10[i])
      .attr("opacity", 0.8)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("opacity", 1);
        
        // Tooltip
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

        tooltip.html(`
          <strong>${d.materia}</strong><br/>
          Promedio: ${d.promedio}<br/>
          Estudiantes: ${d.estudiantes}
        `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", 0.8);
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

    // Título
    g.append("text")
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#374151")
      .text("Rendimiento por Materia");

    // Etiquetas de valores
    g.selectAll(".value-label")
      .data(data)
      .enter().append("text")
      .attr("class", "value-label")
      .attr("x", d => x(d.materia) + x.bandwidth() / 2)
      .attr("y", d => y(d.promedio) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#374151")
      .text(d => d.promedio);

  }, []);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">📊 Rendimiento por Materia</h3>
        <div className="text-sm text-gray-500">
          Promedio de calificaciones
        </div>
      </div>
      <svg
        ref={svgRef}
        width={600}
        height={400}
        className="w-full h-auto"
      />
    </div>
  );
};

export default BarChart;
