import "./App.css";

import React, { useState, useEffect } from "react";

import QRCode from "react-qr-code";
import react from "react";

function App() {
  const qrLevels = ["L", "M", "Q", "H"];
  const borderTypes = ["None", "Simple", "Brand", "Brand all sides"];

  const [value, setValue] = useState(0);
  const [border, setBorder] = useState(borderTypes[0]);
  const [borderColor, setBorderColor] = useState("#303030");
  const [qrBorderText, setQrBorderText] = useState("SIMPLE QR");
  const [qrBgColor, setQrBgColor] = useState("#ffffff");
  const [qrFgColor, setQrFgColor] = useState("#000000");
  const [qrLevel, setQrLevel] = useState("L");
  const [qrSize, setQrSize] = useState("200");
  const [canva, setCanva] = useState(document.getElementById("canva"));
  const [downloadLink, setDownloadLink] = useState("");

  useEffect(() => {
    setCanva(document.getElementById("canva"));
  });

  useEffect(() => {
    qrChanged();
    console.log(border);
  }, [
    value,
    border,
    borderColor,
    qrBgColor,
    qrFgColor,
    qrLevel,
    qrSize,
    qrBorderText,
  ]);

  const qrChanged = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.getElementById("canva");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const dwnldLink = document.createElement("a");
    img.onload = () => {
      if (border == "None") {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      } else if (border == "Simple") {
        canvas.width = img.width + 16;
        canvas.height = img.height + 16;
        ctx.drawImage(img, 8, 8);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 16;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      } else if (border == "Brand") {
        canvas.width = img.width + 16;
        canvas.height = img.height + 58;
        // Draw image
        ctx.drawImage(img, 8, 8);
        // Draw border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 16;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        // Draw bottom stripe
        ctx.fillStyle = borderColor;
        ctx.fillRect(0, canvas.height - 50, canvas.width, canvas.height);
        // Draw text
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(qrBorderText, canvas.width / 2, canvas.height - 16);
      } else if (border == "Brand all sides") {
        canvas.width = img.width + 100;
        canvas.height = img.height + 100;
        // Draw image
        ctx.drawImage(img, 50, 50);
        // Draw border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 100;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Draw text
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(qrBorderText, canvas.width / 2, canvas.height - 15);
        ctx.save();
        ctx.rotate(0.5 * Math.PI);
        ctx.fillText(qrBorderText, canvas.width / 2, -15);
        ctx.save();
        ctx.restore();
        ctx.rotate(-0.5 * Math.PI);
        ctx.fillText(qrBorderText, -canvas.width / 2, canvas.height - 15);
        ctx.save();
        ctx.restore();
        ctx.rotate(-1 * Math.PI);
        ctx.fillText(qrBorderText, -canvas.width / 2, -15);
        ctx.save();
        ctx.restore();
        ctx.rotate(0.5 * Math.PI);
        ctx.fillText(qrBorderText, -canvas.width / 2, canvas.height - 15);
      }
      const pngFile = canvas.toDataURL("image/png");
      dwnldLink.download = "QRCode";
      dwnldLink.href = `${pngFile}`;
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;

    setCanva(canvas);
    setDownloadLink(dwnldLink);
  };

  const onImageDownload = () => {
    downloadLink.click();
  };
  const qrValueChanged = (e) => {
    setValue(e.target.value);
  };

  const asd = (e) => {
    console.log(e);
  };
  return (
    <div className="qr">
      <div className="qr__content">
        <div className="qr__inputs">
          <label htmlFor="qrValue">
            <span>Share Anything!</span>
            <input
              id="qrValue"
              type="text"
              value={value}
              onChange={(e) => qrValueChanged(e)}
            />
          </label>
          <label htmlFor="borderType">
            <span>Border type:</span>
            <select id="borderType" onChange={(e) => setBorder(e.target.value)}>
              {borderTypes.map((borderType) => (
                <option key={borderType} value={borderType}>
                  {borderType}
                </option>
              ))}
            </select>
          </label>

          {border !== "None" ? (
            <react.Fragment>
              <label htmlFor="borderColor">
                <span>Border color:</span>
                <input
                  id="borderColor"
                  type="color"
                  value={borderColor}
                  onChange={(e) => {
                    setBorderColor(e.target.value);
                  }}
                />
              </label>
              <label htmlFor="borderText">
                <span>Border text:</span>
                <input
                  id="borderText"
                  type="text"
                  value={qrBorderText}
                  onChange={(e) => {
                    setQrBorderText(e.target.value);
                  }}
                />
              </label>
            </react.Fragment>
          ) : null}

          <label htmlFor="qrBgColor">
            <span>Background color:</span>
            <input
              id="qrBgColor"
              type="color"
              value={qrBgColor}
              onChange={(e) => {
                setQrBgColor(e.target.value);
              }}
            />
          </label>
          <label htmlFor="qrFgColor">
            <span>Foreground color:</span>
            <input
              id="qrFgColor"
              type="color"
              value={qrFgColor}
              onChange={(e) => {
                setQrFgColor(e.target.value);
              }}
            />
          </label>
          <label htmlFor="qrLevel">
            <span>QR Code level:</span>
            <select id="qrLevel" onChange={(e) => setQrLevel(e.target.value)}>
              {qrLevels.map((qrLevel) => (
                <option key={qrLevel} value={qrLevel}>
                  {qrLevel}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="qrSize">
            <span>QR Code Size:</span>
            <input
              id="qrSize"
              type="text"
              value={qrSize}
              onChange={(e) => {
                setQrSize(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="qr__preview">
          <div className="qr__canvas">
            <QRCode
              id="QRCode"
              value={value + ""}
              bgColor={qrBgColor}
              fgColor={qrFgColor}
              level={qrLevel}
              style={{ display: "none" }}
              size={qrSize}
            />
            <canvas id="canva"></canvas>
          </div>
          <input type="button" value="Download QR" onClick={onImageDownload} />
        </div>
      </div>
    </div>
  );
}

export default App;
