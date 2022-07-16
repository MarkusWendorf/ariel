const styles = {
  textColor: "var(--textColor, #333)",
  mainBkg: "var(--mainBkg, #ECECFF)",
  edgeLabelBackground: "var(--edgeLabelBackground, #e8e8e8)",
  lineColor: "var(--lineColor, #333)",
  nodeBorder: "var(--nodeBorder, #9370DB)",

  // note
  noteBkgColor: "var(--noteBkgColor, #fff5ad)",
  noteBorderColor: "var(--noteBorderColor, #aaaa33)",

  // sequence
  actorTextColor: "var(--actorTextColor)",
  actorBorder: "var(--actorBorder)",

  // class
  classText: "var(--textColor, #333)",

  // gantt
  altSectionBkgColor: "var(--altSectionBkgColor, white)",
  sectionBkgColor: "var(--sectionBkgColor, rgba(102, 102, 255, 0.49))",
  sectionBkgColor2: "var(--sectionBkgColor2, #fff400)",
  excludeBkgColor: "var(--excludeBkgColor, #eeeeee)",
  taskBorderColor: "var(--taskBorderColor, #534fbc)",
  taskBkgColor: "var(--taskBkgColor, #8a90dd)",
  activeTaskBorderColor: "var(--activeTaskBorderColor, #534fbc)",
  activeTaskBkgColor: "var(--activeTaskBkgColor, #bfc7ff)",
  gridColor: "var(--gridColor, darkgrey)",
  doneTaskBkgColor: "var(--doneTaskBkgColor, lightgrey)",
  doneTaskBorderColor: "var(--doneTaskBorderColor)",
  critBorderColor: "var(--critBorderColor, #ff8888)",
  critBkgColor: "var(--critBkgColor, red)",
  todayLineColor: "var(--todayLineColor)",
  taskTextColor: "var(--taskTextColor, white)",
  taskTextOutsideColor: "var(--taskTextOutsideColor)",
  taskTextLightColor: "var(--taskTextLightColor, white)",
  taskTextDarkColor: "var(--taskTextDarkColor, #333)",
  taskTextClickableColor: "var(--taskTextClickableColor)",

  // state
  transitionLabelColor: "var(--textColor, #333)",
  transitionColor: "var(--lineColor, #333)",

  // pie
  pie1: "var(--pie1, rgb(255, 255, 222))",
  pie2: "var(--pie2, rgb(236, 236, 255))",
  pie3: "var(--pie3, rgb(181, 255, 32))",
  pie4: "var(--pie4, rgb(185, 185, 255))",
  pie5: "var(--pie5, rgb(185, 185, 40))",
  pie6: "var(--pie6, rgb(255, 255, 69))",
  pie7: "var(--pie7, rgb(215, 255, 134))",
  pie8: "var(--pie8, rgb(255, 134, 255))",
  pie9: "var(--pie9, rgb(32, 255, 255))",
  pie10: "var(--pie10, rgb(255, 32, 32))",
  pie11: "var(--pie11, rgb(255, 32, 255))",
  pie12: "var(--pie12, rgb(32, 255, 143))",
};

export default `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Page Titles</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
      <script>
        mermaid.initialize({ 
          startOnLoad:false, 
          themeVariables: ${JSON.stringify(styles)}
        })
      </script>
    </head>
    <body>
    </body>
  </html>
`;
