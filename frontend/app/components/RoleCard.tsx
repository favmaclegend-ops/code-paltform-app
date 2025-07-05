import React, { useState } from "react";

type RoleCardProps = {
  role: "student" | "lecturer";
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
};

const RoleIcon = ({ role }: { role: "student" | "lecturer" }) => {
  if (role === "student") {
    return (
      <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  }
  
  return (
    <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
};

const getRoleDetails = (role: "student" | "lecturer") => {
  if (role === "student") {
    return {
      title: "Student",
      description: "Access courses, track progress, and learn from expert instructors",
      features: ["Interactive Learning", "Progress Tracking", "Certificates", "Community Access"],
      gradient: "from-primary-500 to-primary-600",
      bgGradient: "from-primary-50 to-primary-100",
      darkBgGradient: "from-primary-900/20 to-primary-800/30",
      borderColor: "border-primary-200 hover:border-primary-400 dark:border-primary-700 dark:hover:border-primary-500"
    };
  }
  
  return {
    title: "Lecturer",
    description: "Create courses, manage students, and share your expertise with learners",
    features: ["Course Creation", "Student Management", "Analytics", "Revenue Tracking"],
    gradient: "from-success-500 to-success-600",
    bgGradient: "from-success-50 to-success-100",
    darkBgGradient: "from-success-900/20 to-success-800/30",
    borderColor: "border-success-200 hover:border-success-400 dark:border-success-700 dark:hover:border-success-500"
  };
};

export default function RoleCard({ role, onClick, selected = false, disabled = false }: RoleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const details = getRoleDetails(role);
  
  return (
    <div
      className={`
        relative cursor-pointer group
        bg-white dark:bg-secondary-900
        border-2 ${selected ? details.borderColor.replace('hover:', '') : details.borderColor}
        rounded-2xl p-8 
        transition-all duration-300 ease-out
        transform hover:scale-105 hover:shadow-2xl
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        min-h-[400px] w-full max-w-sm mx-auto
        flex flex-col justify-between
      `}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient Overlay */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-gradient-to-br ${details.bgGradient} dark:${details.darkBgGradient}
      `} />
      
      {/* Selected State Indicator */}
      {selected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon with gradient background */}
        <div className={`
          w-20 h-20 rounded-2xl mb-6 flex items-center justify-center
          bg-gradient-to-br ${details.gradient}
          text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300
          transform group-hover:scale-110 group-hover:rotate-3
        `}>
          <RoleIcon role={role} />
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
          {details.title}
        </h3>
        
        {/* Description */}
        <p className="text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
          {details.description}
        </p>
        
        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {details.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-secondary-700 dark:text-secondary-300">
              <svg className="w-4 h-4 mr-2 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Action Button */}
      <div className="relative z-10 mt-auto">
        <div className={`
          w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300
          ${selected 
            ? `bg-gradient-to-r ${details.gradient} text-white shadow-lg` 
            : `border-2 ${details.borderColor} text-secondary-700 dark:text-secondary-300 group-hover:bg-gradient-to-r group-hover:${details.gradient} group-hover:text-white group-hover:border-transparent`
          }
        `}>
          {selected ? 'Selected' : `Choose ${details.title}`}
        </div>
      </div>
      
      {/* Hover glow effect */}
      {isHovered && (
        <div className={`
          absolute inset-0 rounded-2xl blur-xl opacity-30 transition-opacity duration-300
          bg-gradient-to-br ${details.gradient}
          -z-10 scale-110
        `} />
      )}
    </div>
  );
}
