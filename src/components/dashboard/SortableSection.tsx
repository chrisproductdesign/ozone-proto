/**
 * SortableSection - Wrapper component for draggable dashboard sections
 *
 * Provides drag-and-drop functionality for dashboard sections using @dnd-kit/sortable
 */

import { GripVertical } from 'lucide-react';
import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableSectionProps {
  id: string;
  children: React.ReactNode;
  showDragHandle?: boolean;
}

export const SortableSection: React.FC<SortableSectionProps> = ({
  id,
  children,
  showDragHandle = true,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag handle */}
      {showDragHandle && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-10 cursor-grab active:cursor-grabbing opacity-40 hover:opacity-100 transition-opacity"
          aria-label={`Drag to reorder ${id} section`}
        >
          <GripVertical className="w-5 h-5 text-neutral-600" />
        </div>
      )}

      {/* Section content */}
      {children}
    </div>
  );
};
