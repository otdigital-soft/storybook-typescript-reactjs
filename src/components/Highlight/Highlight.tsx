interface HighlightProps {
  needle: string;
  haystack: string;
}

const Highlight = ({ needle, haystack }: HighlightProps) => {
  if (!needle.trim()) {
    return <span>{haystack}</span>;
  }
  const regex = new RegExp(`(${needle})`, 'gi');
  const parts = haystack.split(regex);

  return (
    <span>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <strong key={i}>{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
};

export default Highlight;
