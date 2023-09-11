const styles = {
  fontFamily: "var(--fontFamily, 'trebuchet ms',verdana,arial,sans-serif)",
  textColor: "var(--textColor, #333)",
  mainBkg: "var(--mainBkg, #ECECFF)",
  edgeLabelBackground: "var(--edgeLabelBackground, #e8e8e8)",
  lineColor: "var(--lineColor, #333)",
  nodeBorder: "var(--nodeBorder, #9370DB)",

  // note
  noteBkgColor: "var(--noteBkgColor, #fff5ad)",
  noteBorderColor: "var(--noteBorderColor, #aaaa33)",

  // sequence
  actorTextColor: "var(--actorTextColor, black)",
  actorBorder: "var(--actorBorder, hsl(260, 60%, 87%))",
  sequenceNumberColor: "var(--sequenceNumberColor, white)",

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
  doneTaskBorderColor: "var(--doneTaskBorderColor, grey)",
  critBorderColor: "var(--critBorderColor, #ff8888)",
  critBkgColor: "var(--critBkgColor, red)",
  todayLineColor: "var(--todayLineColor, red)",
  taskTextColor: "var(--taskTextColor, white)",
  taskTextOutsideColor: "var(--taskTextOutsideColor, black)",
  taskTextLightColor: "var(--taskTextLightColor, white)",
  taskTextDarkColor: "var(--taskTextDarkColor, #333)",
  taskTextClickableColor: "var(--taskTextClickableColor, #003163)",

  // state
  transitionLabelColor: "var(--textColor, #333)",
  transitionColor: "var(--lineColor, #333)",
  stateBkg: "var(--stateBkg, #ECECFF)",
  compositeBackground: "var(--compositeBackground, white)",
  stateLabelColor: "var(--textColor, #333)",
  altBackground: "var(--altBackground, #f0f0f0)",
  compositeTitleBackground: "var(--compositeTitleBackground, #ECECFF)",

  // pie
  pieTitleTextColor: "var(--textColor, #333)",
  pieLegendTextColor: "var(--textColor, #333)",
};

export default `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Page Titles</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="https://cdn.jsdelivr.net/npm/mermaid@9.4.3/dist/mermaid.min.js"></script>
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
