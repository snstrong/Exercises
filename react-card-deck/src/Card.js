import React, { useState, useEffect } from "react";

const Card = ({ srcUrl, name }) => {
  return <img src={srcUrl} alt={name} />;
};

export default Card;
