import React from 'react';
type FilterType = 'all' | 'active' | 'completed';
interface FilterButtonsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}
const FilterButtons: React.FC<FilterButtonsProps> = ({
  filter,
  onFilterChange
}) => {
  return <div className="flex justify-center space-x-2 mb-4">
      <FilterButton selected={filter === 'all'} onClick={() => onFilterChange('all')}>
        All
      </FilterButton>
      <FilterButton selected={filter === 'active'} onClick={() => onFilterChange('active')}>
        Active
      </FilterButton>
      <FilterButton selected={filter === 'completed'} onClick={() => onFilterChange('completed')}>
        Completed
      </FilterButton>
    </div>;
};
interface FilterButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
const FilterButton: React.FC<FilterButtonProps> = ({
  selected,
  onClick,
  children
}) => {
  return <button onClick={onClick} className={`px-3 py-1 text-sm rounded-md transition-colors ${selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
      {children}
    </button>;
};
export default FilterButtons;