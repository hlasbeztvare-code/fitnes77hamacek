type Props = {
  condition: 'A' | 'B' | 'C';
};

export default function ConditionBadge({ condition }: Props) {
  const styles =
    condition === 'A'
      ? 'bg-green-600 text-white'
      : condition === 'B'
      ? 'bg-yellow-500 text-black'
      : 'bg-red-600 text-white';

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold 
uppercase ${styles}`}>
      Stav {condition}
    </span>
  );
}
