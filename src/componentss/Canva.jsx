import React, { Component } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { ChromePicker } from "react-color";

class CanvasComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
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
      },
      caption: "",
      ctaText: "",
      recentColors: [],
      backgroundColor: "#0369A1",
      showPicker: false,
      imageSrc:
        "https://img.freepik.com/free-photo/cup-coffee-with-heart-drawn-foam_1286-70.jpg?t=st=1714218266~exp=1714221866~hmac=c054219a6e358ca00d3e9b5620693fae0a71766891cbc324a3854b14d73a5b2c&w=740",
    };

    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  wrapText(context, text, x, y, maxCharactersPerLine) {
    let words = text.split(" ");
    let line = "";
    let lineHeight = this.state.data.caption.font_size;
    let lines = 1;
    const maxWidth =
      maxCharactersPerLine * (this.state.data.caption.font_size * 0.6);

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y + (lines - 1) * lineHeight);
        line = words[n] + " ";
        lines++;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y + (lines - 1) * lineHeight);
  }

  drawCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { caption, ctaText, backgroundColor, imageSrc } = this.state;
    const { data } = this.state;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //design

    const designPatternImg = new Image();
    designPatternImg.src = data.urls.design_pattern;
    designPatternImg.onload = () => {
      ctx.drawImage(designPatternImg, 0, 0);
    };

    //mask
    const maskImg = new Image();
    maskImg.src = data.urls.mask;
    maskImg.onload = () => {
      ctx.drawImage(
        maskImg,
        data.image_mask.x,
        data.image_mask.y,
        data.image_mask.width,
        data.image_mask.height
      );
    };

    //mask stroke
    const maskStrokeImg = new Image();
    maskStrokeImg.src = data.urls.stroke;
    maskStrokeImg.onload = () => {
      ctx.drawImage(maskStrokeImg, data.image_mask.x, data.image_mask.y);
    };

    //image

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      ctx.drawImage(
        image,
        data.image_mask.x + 60,
        data.image_mask.y + 60,
        data.image_mask.width - 120,
        data.image_mask.height - 100
      );
    };

    //Caption
    ctx.fillStyle = data.caption.text_color;
    ctx.font = `${data.caption.font_size}px Arial`;
    ctx.textAlign = data.caption.alignment;
    ctx.textBaseline = "top";
    this.wrapText(
      ctx,
      caption,
      data.caption.position.x,
      data.caption.position.y,
      data.caption.max_characters_per_line
    );

    //cta
    const ctaWidth = 180;
    const ctaHeight = 60;
    ctx.fillRect(data.cta.position.x, data.cta.position.y, ctaWidth, ctaHeight);
    ctx.fillStyle = data.cta.background_color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${data.cta.font_size || 30}px Arial`;
    ctx.fillText(
      ctaText,
      data.cta.position.x + ctaWidth / 2,
      data.cta.position.y + ctaHeight / 2
    );
  }

  handleCaptionChange = (e) => {
    this.setState({ caption: e.target.value });
  };

  handleCtaTextChange = (e) => {
    this.setState({ ctaText: e.target.value });
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ imageSrc: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleColorButtonClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  handlePickerButtonClick = () => {
    this.setState((prevState) => ({
      showPicker: !prevState.showPicker,
    }));
  };

  handleBackgroundColorChange = (color) => {
    const newColor = color.hex;
    this.setState((prevState) => ({
      backgroundColor: newColor,
      recentColors: [newColor, ...prevState.recentColors.slice(0, 4)],
    }));
  };

  render() {
    const {
      caption,
      ctaText,
      recentColors,
      backgroundColor,
      showPicker,
      imageSrc,
    } = this.state;
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
    };

    return (
      <>
        <div className="flex justify-evenly mt-10">
          <canvas
            ref={this.canvasRef}
            height={1080}
            width={1080}
            style={{ width: "400px", height: "400px" }}
          />

          <div style={{ padding: "20px" }}>
            <h3 className="text-2xl font-bold  text-center font-mono">
              Ad customization
            </h3>
            <p className="text-xl italic font-mono text-gray-500 text-center mt-4">
              Customise your ad and get the templates accordingly
            </p>

            <div className="px-[20px] w-full md:max-w-md lg:max-w-md xl:max-w-md">
              <div className=" border-[1px]  rounded-[10px]  my-[10px] p-[10px]">
                <label
                  htmlFor="adImageUpload"
                  className="icon-placeholder w-full"
                >
                  <AddPhotoAlternateIcon
                    color="primary"
                    sx={{ fontSize: 34 }}
                  />
                  <p className=" inline-block">
                    Change the ad Creative image{"    "}
                    <span className=" underline text-blue-700 hover:cursor-pointer hover:text-blue-800">
                      {"  "} Select File
                    </span>
                  </p>
                </label>
                <input
                  id="adImageUpload"
                  type="file"
                  className="hidden"
                  onChange={this.handleImageUpload}
                />
              </div>
            </div>

            <p
              className="text-sm font-sans text-gray-500 text-center mt-5"
              style={gridStyle}
            >
              <hr className="mt-2 border-[1px]" />
              <p className="text-[15px] font-bold ">Edit contents</p>{" "}
              <hr className="mt-2  border-[1px]" />
            </p>

            {/* caption */}
            <div className="mb-4">
              <label
                className="block text-lg font-bold mt-2 mb-2 "
                htmlFor="username"
              >
                Ad Content
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                type="text"
                value={caption}
                onChange={this.handleCaptionChange}
              />
            </div>

            {/* CTA */}
            <div className="mb-6">
              <label
                className="block text-lg font-bold mb-2"
                htmlFor="ctaInput"
              >
                CTA
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ctaInput"
                type="text"
                value={ctaText}
                onChange={this.handleCtaTextChange}
              />

              <div>
                <label
                  className="block text-lg font-bold mt-4"
                  htmlFor="backgroundColorInput"
                  style={{ fontFamily: "cursive" }}
                >
                  Choose your color
                </label>
                <div className="flex space-x-2 mt-4">
                  {recentColors.map((color, index) => (
                    <button
                      key={index}
                      className="w-4 h-4 rounded-full cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => this.handleColorButtonClick(color)}
                    />
                  ))}
                  <button
                    className="pointer w-[25px] h-[25px] border-[2px] rounded-[50%] text-[12px]"
                    onClick={this.handlePickerButtonClick}
                  >
                    +
                  </button>
                </div>
                {showPicker && (
                  <ChromePicker
                    color={backgroundColor}
                    onChangeComplete={this.handleBackgroundColorChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CanvasComponent;
