export default function SkillCheckboxes({ options, selected, onChange }) {
  return (
    <div>
      {options.map(opt => (
        <label key={opt.id} style={{ display: 'block', marginBottom: '4px' }}>
          <input
            type="checkbox"
            checked={selected.includes(String(opt.id))}
            onChange={e => {
              const newSelected = selected.includes(String(opt.id))
                ? selected.filter(id => id !== String(opt.id))
                : [...selected, String(opt.id)];
              onChange(newSelected);
            }}
          />
          {opt.name}
        </label>
      ))}
    </div>
  );
}