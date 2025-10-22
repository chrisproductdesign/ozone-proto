'use client';

import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

import { classNames } from '../../lib/classNames';

import './Table.css';

// Table Root
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Whether the table should have striped rows
   * @default false
   */
  striped?: boolean;
  /**
   * Whether the table should have hover effect on rows
   * @default true
   */
  hoverable?: boolean;
  /**
   * Whether the table should be compact
   * @default false
   */
  compact?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  children?: ReactNode;
}

export const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  ({ striped = false, hoverable = true, compact = false, className, children, ...props }, ref) => {
    return (
      <div className="ui-table__wrapper">
        <table
          ref={ref}
          className={classNames(
            'ui-table',
            striped && 'ui-table--striped',
            hoverable && 'ui-table--hoverable',
            compact && 'ui-table--compact',
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

TableRoot.displayName = 'Table';

// Table Head
export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children?: ReactNode;
}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={classNames('ui-table__head', className)}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHead.displayName = 'TableHead';

// Table Body
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children?: ReactNode;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={classNames('ui-table__body', className)}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

// Table Row
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Whether the row is selected
   * @default false
   */
  selected?: boolean;
  className?: string;
  children?: ReactNode;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected = false, className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={classNames(
          'ui-table__row',
          selected && 'ui-table__row--selected',
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

// Table Cell
export interface TableCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
  /**
   * Type of cell
   * @default 'td'
   */
  as?: 'td' | 'th';
  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: ReactNode;
}

export const TableCell = forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ as = 'td', align = 'left', className, children, ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref as any}
        className={classNames(
          'ui-table__cell',
          `ui-table__cell--${align}`,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TableCell.displayName = 'TableCell';

// Table Header Cell (convenience wrapper)
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean;
  /**
   * Current sort direction
   */
  sortDirection?: 'asc' | 'desc' | null;
  /**
   * Callback when sort is clicked
   */
  onSort?: () => void;
  className?: string;
  children?: ReactNode;
}

export const TableHeaderCell = forwardRef<HTMLTableHeaderCellElement, TableHeaderCellProps>(
  ({ align = 'left', sortable = false, sortDirection = null, onSort, className, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={classNames(
          'ui-table__header-cell',
          `ui-table__header-cell--${align}`,
          sortable && 'ui-table__header-cell--sortable',
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className="ui-table__header-content">
          <span>{children}</span>
          {sortable && (
            <span className="ui-table__sort-icon">
              {sortDirection === 'asc' && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 3.5L12 9.5H4L8 3.5Z" />
                </svg>
              )}
              {sortDirection === 'desc' && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 12.5L4 6.5H12L8 12.5Z" />
                </svg>
              )}
              {!sortDirection && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity="0.3">
                  <path d="M8 5L11 9H5L8 5Z M8 11L5 7H11L8 11Z" />
                </svg>
              )}
            </span>
          )}
        </div>
      </th>
    );
  }
);

TableHeaderCell.displayName = 'TableHeaderCell';

// Export compound component
export const Table = {
  Root: TableRoot,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
};