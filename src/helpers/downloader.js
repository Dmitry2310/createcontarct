const download = (filename, url) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPdf = (filename, data) => {
  const blob = new Blob([data], {
    type: "application/pdf"
  });
  download(filename, URL.createObjectURL(blob));
};

export default download;
