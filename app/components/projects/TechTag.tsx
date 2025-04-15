import React from 'react';

interface TechTagProps {
  name: string;
}

const TechTag: React.FC<TechTagProps> = ({ name }) => {
  return (
    <span className="inline-block bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--border-primary)] whitespace-nowrap">
      {name}
    </span>
  );
};

export default TechTag;
