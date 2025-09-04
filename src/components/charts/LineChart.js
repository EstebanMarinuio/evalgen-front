import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [
      { mes: 'Ene', promedio: 7.2 },
      { mes: 'Feb', promedio: 7.5 },
      { mes: 'Mar', promedio: 7.8 },
      { mes: 'Abr', promedio: 8.1 },
      { mes: 'May', promedio: 8.3 },
      { mes: 'Jun', promedio: 8.4 },
      { mes: 'Jul', promedio: 8.2 },
      { mes: 'Ago', promedio: 8.6 },
      { mes: 'Sep', promedio: 8.7 },
      { mes: 'Oct', promedio: 8.5 },
      { mes: 'Nov', promedio: 8.8 },
      { mes: 'Dic', promedio: 8.4 }
    ];

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.mes))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([6.5, d3.max(data, d => d.promedio) + 0.5])
      .nice()
      .range([height, 0]);

    // Línea
    const line = d3.line()
      .x(d => x(d.mes) + x.bandwidth() / 2)
      .y(d => y(d.promedio))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Puntos
    g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.mes) + x.bandwidth() / 2)
      .attr("cy", d => y(d.promedio))
      .attr("r", 5)
      .attr("fill", "#3B82F6")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("r", 7);
        
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
          <strong>${d.mes} 2024</strong><br/>
          Promedio: ${d.promedio}
        `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("r", 5);
        d3.selectAll(".tooltip").remove();
      });

    // Área bajo la línea
    const area = d3.area()
      .x(d => x(d.mes) + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.promedio))
      .curve(d3.curveMonotoneX);

    g.insert("path", ":first-child")
      .datum(data)
      .attr("fill", "#3B82F6")
      .attr("opacity", 0.1)
      .attr("d", area);

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
      .text("Evolución Temporal de Calificaciones");

    // Línea de tendencia
    const trendLine = d3.line()
      .x(d => x(d.mes) + x.bandwidth() / 2)
      .y(d => y(d.promedio))
      .curve(d3.curveLinear);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#EF4444")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("d", trendLine);

  }, []);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">📈 Evolución Temporal</h3>
        <div className="text-sm text-gray-500">
          Promedio mensual 2024
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

export default LineChart;
