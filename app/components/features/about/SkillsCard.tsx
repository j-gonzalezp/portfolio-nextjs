import React from 'react';

export interface TechnicalSkillItem {
  category: string;
  skills: string;
}

interface SkillsCardProps {
  title: string;
  skills: string[] | TechnicalSkillItem[];
  type: 'soft' | 'technical';
}

export default function SkillsCard({ title, skills, type }: SkillsCardProps) {
  return (
    <div className="p-6 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-primary)] shadow-sm">
      <h3 className="font-semibold mt-0 mb-4 border-b border-[var(--border-secondary)] pb-2 text-[var(--text-primary)]">{title}</h3>
      {type === 'technical' ? (
        <ul className="list-none p-0 space-y-1.5 text-sm text-[var(--text-secondary)]">
          {(skills as TechnicalSkillItem[]).map((item, index) => (
            <li key={index}>
              <strong className="font-medium text-[var(--text-primary)]">{item.category}:</strong> {item.skills}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="list-none p-0 space-y-1.5 text-sm text-[var(--text-secondary)]">
          {(skills as string[]).map((skill, index) => <li key={index}>{skill}</li>)}
        </ul>
      )}
    </div>
  );
}
