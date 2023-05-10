export function Gallery({
  file,
}) {
  return (
    <pre>
      Selected file is
      {JSON.stringify(file, null, 2)}
    </pre>
  )
};
