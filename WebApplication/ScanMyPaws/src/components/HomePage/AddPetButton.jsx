import React, { useState, useEffect } from "react";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const DraggableAddPetButton = () => {
  const [position, setPosition] = useState({
    top: window.innerHeight - 80, // Initial vertical position
    left: window.innerWidth - 140, // Initial horizontal position
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        top: Math.min(prev.top, window.innerHeight - 80), // Keep within bottom boundary
        left: Math.min(prev.left, window.innerWidth - 140), // Keep within right boundary
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const buttonWidth = 140; // Button width
    const buttonHeight = 48; // Button height
    const margin = 16; // Minimum margin from edges
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newLeft = clientX - buttonWidth / 2;
    let newTop = clientY - buttonHeight / 2;

    // Ensure the button stays fully visible within the viewport
    newLeft = Math.max(margin, Math.min(newLeft, screenWidth - buttonWidth - margin));
    newTop = Math.max(margin, Math.min(newTop, screenHeight - buttonHeight - margin));

    // Snap to left or right
    if (newLeft < screenWidth / 2) {
      newLeft = margin; // Snap to left
    } else {
      newLeft = screenWidth - buttonWidth - margin; // Snap to right
    }

    setPosition({ top: newTop, left: newLeft });
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
    document.addEventListener("touchmove", handleDrag, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1100,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "all 0.3s ease",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <Fab
        variant="extended"
        color="primary"
        sx={{
          width: "140px",
          height: "48px",
          justifyContent: "center",
          backgroundColor: "var(--primary-color)",
          color: "var(--text-color)",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "var(--secondary-color)",
          },
          padding: "0 16px",
          fontWeight: "bold",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AddIcon sx={{ marginRight: "8px" }} />
        Add Pet
      </Fab>
    </Box>
  );
};

export default DraggableAddPetButton;
