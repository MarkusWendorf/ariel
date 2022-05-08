export default (errorOrStacktrace: string, diagram: string) => {
  return `
    <div>
      <div>Error generating svg for diagram:</div>
      <pre>${diagram}</pre>

      <details>
        <summary>Show error</summary>
        <pre>${errorOrStacktrace}</pre>
      </details>
    </div>
  `;
};
