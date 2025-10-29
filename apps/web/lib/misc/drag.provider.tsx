'use client';
import React, { useState } from 'react';
import { DndContext, useDraggable, DragEndEvent } from '@dnd-kit/core';

export const DraggableBox: React.FC<{
  id: string;
  children?: React.ReactNode;
}> = ({ id, children }) => {
  const { position } = useDragContext();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  // Apply position + live drag transform
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute' as const,
    cursor: 'grab',
    left: position.x,
    top: position.y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-fit h-fit"
    >
      {children}
    </div>
  );
};

type DragContextType = {
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
};

const DragContext = React.createContext<DragContextType | null>(null);

export function useDragContext() {
  const context = React.useContext(DragContext);
  if (!context) {
    throw new Error('useDragContext must be used within a DragProvider');
  }
  return context;
}

const FreeDragPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;
    // Update the position state so the box stays where dropped
    setPosition((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  };

  return (
    <DragContext.Provider value={{ position, setPosition }}>
      <DndContext onDragEnd={handleDragEnd}>
        <div
          style={{
            position: 'relative',
            backgroundColor: '#f3f4f6',
          }}
          className="w-full h-full min-h-[86vh] bg-amber-500"
        >
          {children}
        </div>
      </DndContext>
    </DragContext.Provider>
  );
};

export default FreeDragPage;
