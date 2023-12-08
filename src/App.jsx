import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid


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
  const [overlayActive, setOverlayActive] = useState(false);


  const handleAddCard = () => {
    const newCardId = uuidv4(); // Utiliza uuid para generar un identificador único

    // Buscar la primera posición vacía
    let row = 0;
    let col = 0;

    while (layout.some(item => {
      // Verificar si la posición está ocupada por la tarjeta actual o parte de ella
      return (
        (item.x <= col && item.x + item.w > col) &&
        (item.y <= row && item.y + item.h > row)
      );
    })) {
      col++;

      // Si se llega al final de la fila, pasar a la siguiente fila
      if (col >= cols) {
        col = 0;
        row++;
      }
    }

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

  const handleToggleOverlay = () => {
    setOverlayActive((prevOverlayActive) => !prevOverlayActive);
  };

  const handleRemoveCard = (cardId) => {
    // Filtrar las tarjetas para mantener solo las que no coinciden con la card clickeada
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== cardId));
  };

  return (
    <div className="appContainer">
      <div className="buttonsContainer">
        <button onClick={handleAddCard}>Agregar Tarjeta</button>
        <button onClick={handleAddColumn}>Agregar Columna</button>
        <button onClick={handleRemoveColumn}>Eliminar Columna</button>
        <button onClick={handleToggleOverlay}>
          {overlayActive ? 'Desactivar' : 'Activar'} Eliminar
        </button>
      </div>
      <div className="a4Container">
      <GridLayout
        className="layout"
        layout={layout}
        cols={cols}
        rowHeight={101}
        width={790}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        resizeHandles={['se', 'sw', 'ne', 'nw']}
        isDraggable={!overlayActive}
        onDragStart={(layout, oldItem, newItem, placeholder, e, element) => {
          if (overlayActive) {
            e.preventDefault();
          }
        }}
      >
        {layout.map((item) => (
          <div key={item.i} className="card">
            {item.i}
            {overlayActive && (
              <div className="overlay">
                <button className="removeButton" onClick={() => handleRemoveCard(item.i)}>
                  X
                </button>
              </div>
            )}
          </div>
        ))}
      </GridLayout>
      </div>
    </div>
  );
};

export default App;