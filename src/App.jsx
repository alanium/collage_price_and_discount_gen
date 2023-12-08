import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';

const App = () => {
  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 1, h: 1 },
    { i: '2', x: 1, y: 0, w: 1, h: 1 },
    { i: '3', x: 2, y: 0, w: 1, h: 1 },
    { i: '4', x: 0, y: 1, w: 1, h: 1 },
    { i: '5', x: 1, y: 1, w: 1, h: 1 },
    { i: '6', x: 2, y: 1, w: 1, h: 1 },
    { i: '7', x: 0, y: 2, w: 1, h: 1 },
    { i: '8', x: 1, y: 2, w: 1, h: 1 },
    { i: '9', x: 2, y: 2, w: 1, h: 1 },
  ]);
  const [cols, setCols] = useState(3);

  const handleAddCard = () => {
    const newCardId = (layout.length + 1).toString();

    // Calcular la posición para la nueva tarjeta
    const col = layout.length % cols; // Columna actual
    const row = Math.floor(layout.length / cols); // Fila actual

    // Añadir la nueva tarjeta
    const newLayoutItem = {
      i: newCardId,
      x: col,
      y: row,
      w: 1,
      h: 1,
    };

    setLayout((prevLayout) => [...prevLayout, newLayoutItem]);
  };

  const handleAddColumn = () => {
    setCols((prevCols) => prevCols + 1);
  };

  const handleRemoveColumn = () => {
    if (cols > 1) {
      // Eliminar la última columna
      setCols((prevCols) => prevCols - 1);

      // Reorganizar las tarjetas para ocupar las posiciones disponibles
      setLayout((prevLayout) => {
        return prevLayout.map((item) => {
          // Mover a la columna anterior si está en la columna eliminada
          if (item.x === cols - 1) {
            return { ...item, x: cols - 2 };
          }
          // Mantener las tarjetas en otras columnas
          return item;
        });
      });
    }
  };

  return (
    <div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={cols}
        rowHeight={100}
        width={300}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        resizeHandles={['se', 'sw', 'ne', 'nw']}  // Permitir cambiar tamaño desde todas las esquinas
      >
        {layout.map((item) => (
          <div key={item.i} className="card">
            {item.i}
          </div>
        ))}
      </GridLayout>
      <button onClick={handleAddCard}>Agregar Tarjeta</button>
      <button onClick={handleAddColumn}>Agregar Columna</button>
      <button onClick={handleRemoveColumn}>Eliminar Columna</button>
    </div>
  );
};

export default App;
