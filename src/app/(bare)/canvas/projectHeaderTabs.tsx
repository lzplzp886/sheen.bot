// src/app/canvas/projectHeaderTabs.tsx

"use client";

import React from "react";

interface Project {
  name: string;
  isSaved: boolean;
}

interface ProjectTabsProps {
  projects: Project[];
  activeIndex: number;
  onSwitchProject: (index: number) => void;
  onNewProject: () => void;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({
  projects,
  activeIndex,
  onSwitchProject,
  onNewProject,
}) => {
  return (
    <div className="flex space-x-3 items-center">
      {projects.map((proj, idx) => (
        <div key={proj.name} className="relative">
          <button
            type="button"
            onClick={() => onSwitchProject(idx)}
            className={`px-2 py-1 rounded ${
              activeIndex === idx ? "bg-secondary" : "bg-light"
            }`}
          >
            {proj.name}
            {!proj.isSaved && activeIndex === idx && "*"}
          </button>
        </div>
      ))}
      <button type="button" onClick={onNewProject} className="px-3 py-1 bg-highlight rounded">
        + New
      </button>
    </div>
  );
};

export default ProjectTabs;
