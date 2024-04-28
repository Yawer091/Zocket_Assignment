import React, { useEffect, useRef } from "react";

const CanvasComponent = ({ image, backgroundColor, adContent, cta }) => {
  const data = {
    caption: {
      text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
      position: { x: 50, y: 50 },
      max_characters_per_line: 31,
      font_size: 44,
      alignment: "left",
      text_color: "#FFFFFF",
    },
    cta: {
      text: "Shop Now",
      position: { x: 190, y: 320 },
      text_color: "#FFFFFF",
      background_color: "#000000",
    },
    image_mask: {
      x: 56,
      y: 442,
      width: 970,
      height: 600,
    },
    urls: {
      mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png?random=12345",
      stroke:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png?random=12345",
      design_pattern:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png?random=12345",
    },
  };

  const Coffeeimage =
    "https://img.freepik.com/free-photo/cup-coffee-with-heart-drawn-foam_1286-70.jpg?t=st=1714218266~exp=1714221866~hmac=c054219a6e358ca00d3e9b5620693fae0a71766891cbc324a3854b14d73a5b2c&w=740";
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (image) {
        const img1 = new Image();
        img1.onload = () => {
          drawRoundedImage(img1, 40, 20, 340, 280, 30);
        };
        img1.src = image;
      }

      const drawRoundedImage = (img, x, y, width, height, radius) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
      };
      ctx.beginPath();
      ctx.rect(140, 15, 250, 350);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";

      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(170, 10);
      ctx.lineTo(420, 430);
      ctx.lineWidth = 250;
      ctx.strokeStyle = backgroundColor;
      ctx.stroke();

      ctx.fillStyle = data.caption.text_color;
      ctx.font = `20px Arial`;
      ctx.textAlign = data.caption.alignment;
      ctx.fillText(adContent, 20, canvas.height - 70);

      const ctaWidth = 180;
      const ctaHeight = 40;
      ctx.fillRect(
        data.cta.position.x,
        data.cta.position.y,
        ctaWidth,
        ctaHeight
      );
      ctx.fillStyle = data.cta.background_color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${data.cta.font_size || 30}px Arial`;
      ctx.fillText(
        cta,
        data.cta.position.x + ctaWidth / 2,
        data.cta.position.y + ctaHeight / 2
      );
    };

    draw();
  }, [image, backgroundColor, adContent, cta]);

  return (
    <div className="border-[3px] h-[420px]">
      <canvas ref={canvasRef} width={420} height={420} />
    </div>
  );
};

export default CanvasComponent;
