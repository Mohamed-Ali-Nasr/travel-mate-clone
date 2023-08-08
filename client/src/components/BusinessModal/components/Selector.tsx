import { getTime } from "utils/dateTime";

interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
  valid: boolean;
}

const Selector = ({ value, onChange, valid }: SelectorProps) => {
  const time = new Date("1970-01-01T00:00:00.000Z");

  const times = [...Array(4 * 24)].map(() => {
    const current = getTime(time.toISOString());
    time.setMinutes(time.getMinutes() + 15);
    return current;
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      value={value}
      onChange={onChangeHandler}
      className={`rounded border ${!valid && "border-red-600"}`}
    >
      <option value="--:--">--:--</option>

      {times.map((current) => {
        return (
          <option value={current} key={current}>
            {current}
          </option>
        );
      })}
    </select>
  );
};

export default Selector;
