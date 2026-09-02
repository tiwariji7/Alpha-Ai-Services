import React from 'react';

interface ProjectTagsProps {
  tags: string[];
  className?: string;
  variant?: 'default' | 'pill' | 'chip';
}

export const ProjectTags: React.FC<ProjectTagsProps> = ({
  tags,
  className = '',
  variant = 'default',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide font-mono transition-colors ${
            variant === 'pill'
              ? 'rounded-full bg-[#F1F2FF] text-[#2D3DB7] border border-[#2D3DB7]/20 shadow-2xs'
              : 'rounded-xl bg-[#F7F8FF] text-[#0B1235] border border-[#2D3DB7]/14 hover:border-[#2D3DB7]/30'
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
