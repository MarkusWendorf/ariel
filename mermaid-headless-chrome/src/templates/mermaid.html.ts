const styles = {
  primaryTextColor: "--primaryTextColor",
  secondaryColor: "--secondaryColor",
  tertiaryColor: "--tertiaryColor",
  primaryBorderColor: "--primaryBorderColor",
  secondaryBorderColor: "--secondaryBorderColor",
  tertiaryBorderColor: "--tertiaryBorderColor",
  noteBorderColor: "--noteBorderColor",
  noteBkgColor: "--noteBkgColor",
  noteTextColor: "--noteTextColor",
  secondaryTextColor: "--secondaryTextColor",
  tertiaryTextColor: "--tertiaryTextColor",
  lineColor: "--lineColor",
  textColor: "--textColor",

  /* Flowchart variables */
  nodeBkg: "--nodeBkg",
  mainBkg: "--mainBkg",
  nodeBorder: "--nodeBorder",
  clusterBkg: "--clusterBkg",
  clusterBorder: "--clusterBorder",
  defaultLinkColor: "--defaultLinkColor",
  titleColor: "--titleColor",
  edgeLabelBackground: "--edgeLabelBackground",
  nodeTextColor: "--nodeTextColor",

  /* Sequence Diagram variables */
  actorBorder: "--actorBorder",
  actorBkg: "--actorBkg",
  actorTextColor: "--actorTextColor",
  actorLineColor: "--actorLineColor",
  labelBoxBkgColor: "--labelBoxBkgColor",
  signalColor: "--signalColor",
  signalTextColor: "--signalTextColor",
  labelBoxBorderColor: "--labelBoxBorderColor",
  labelTextColor: "--labelTextColor",
  loopTextColor: "--loopTextColor",
  activationBorderColor: "--activationBorderColor",
  activationBkgColor: "--activationBkgColor",
  sequenceNumberColor: "--sequenceNumberColor",

  /* Gantt chart variables */
  sectionBkgColor: "--sectionBkgColor",
  altSectionBkgColor: "--altSectionBkgColor",
  sectionBkgColor2: "--sectionBkgColor2",
  excludeBkgColor: "--excludeBkgColor",
  taskBorderColor: "--taskBorderColor",
  taskBkgColor: "--taskBkgColor",
  activeTaskBorderColor: "--activeTaskBorderColor",
  activeTaskBkgColor: "--activeTaskBkgColor",
  gridColor: "--gridColor",
  doneTaskBkgColor: "--doneTaskBkgColor",
  doneTaskBorderColor: "--doneTaskBorderColor",
  critBorderColor: "--critBorderColor",
  critBkgColor: "--critBkgColor",
  todayLineColor: "--todayLineColor",
  taskTextColor: "--taskTextColor",
  taskTextOutsideColor: "--taskTextOutsideColor",
  taskTextLightColor: "--taskTextLightColor",
  taskTextDarkColor: "--taskTextDarkColor",
  taskTextClickableColor: "--taskTextClickableColor",

  /* Sequence Diagram variables */
  personBorder: "--personBorder",
  personBkg: "--personBkg",

  /* state colors */
  transitionColor: "--transitionColor",
  transitionLabelColor: "--transitionLabelColor",

  /* The color of the text tables of the states*/
  stateLabelColor: "--stateLabelColor",
  stateBkg: "--stateBkg",
  labelBackgroundColor: "--labelBackgroundColor",
  compositeBackground: "--compositeBackground",
  altBackground: "--altBackground",
  compositeTitleBackground: "--compositeTitleBackground",
  compositeBorder: "--compositeBorder",
  innerEndBackground: "--innerEndBackground",
  errorBkgColor: "--errorBkgColor",
  errorTextColor: "--errorTextColor",
  specialStateColor: "--specialStateColor",

  /* class */
  classText: "--classText",

  /* user-journey */
  fillType0: "--fillType0",
  fillType1: "--fillType1",
  fillType2: "--fillType2",
  fillType3: "--fillType3",
  fillType4: "--fillType4",
  fillType5: "--fillType5",
  fillType6: "--fillType6",
  fillType7: "--fillType7",

  /* pie */
  pie1: "--pie1",
  pie2: "--pie2",
  pie3: "--pie3",
  pie4: "--pie4",
  pie5: "--pie5",
  pie6: "--pie6",
  pie7: "--pie7",
  pie8: "--pie8",
  pie9: "--pie9",
  pie10: "--pie10",
  pie11: "--pie11",
  pie12: "--pie12",
  pieTitleTextSize: "--pieTitleTextSize",
  pieTitleTextColor: "--pieTitleTextColor",
  pieSectionTextSize: "--pieSectionTextSize",
  pieSectionTextColor: "--pieSectionTextColor",
  pieLegendTextSize: "--pieLegendTextSize",
  pieLegendTextColor: "--pieLegendTextColor",
  pieStrokeColor: "--pieStrokeColor",
  pieStrokeWidth: "--pieStrokeWidth",
  pieOpacity: "--pieOpacity",

  /* requirement-diagram */
  requirementBackground: "--requirementBackground",
  requirementBorderColor: "--requirementBorderColor",
  requirementBorderSize: "--requirementBorderSize",
  requirementTextColor: "--requirementTextColor",
  relationColor: "--relationColor",
  relationLabelBackground: "--relationLabelBackground",
  relationLabelColor: "--relationLabelColor",

  /* git */
  git0: "--git0",
  git1: "--git1",
  git2: "--git2",
  git3: "--git3",
  git4: "--git4",
  git5: "--git5",
  git6: "--git6",
  git7: "--git7",
  gitInv0: "--gitInv0",
  gitInv1: "--gitInv1",
  gitInv2: "--gitInv2",
  gitInv3: "--gitInv3",
  gitInv4: "--gitInv4",
  gitInv5: "--gitInv5",
  gitInv6: "--gitInv6",
  gitInv7: "--gitInv7",
  branchLabelColor: "--branchLabelColor",
  gitBranchLabel0: "--gitBranchLabel0",
  gitBranchLabel1: "--gitBranchLabel1",
  gitBranchLabel2: "--gitBranchLabel2",
  gitBranchLabel3: "--gitBranchLabel3",
  gitBranchLabel4: "--gitBranchLabel4",
  gitBranchLabel5: "--gitBranchLabel5",
  gitBranchLabel6: "--gitBranchLabel6",
  gitBranchLabel7: "--gitBranchLabel7",

  tagLabelColor: "--tagLabelColor",
  tagLabelBackground: "--tagLabelBackground",
  tagLabelBorder: "--tagLabelBorder",
  tagLabelFontSize: "--tagLabelFontSize",
  commitLabelColor: "--commitLabelColor",
  commitLabelBackground: "--commitLabelBackground",
  commitLabelFontSize: "--commitLabelFontSize",
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
