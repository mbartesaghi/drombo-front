import React from "react";
import CardProps from "./card.types";

const Card: React.FC<CardProps> = ({ title, icon: Icon, children, iconColor = "text-gray-600" }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className={iconColor} />}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default Card;
