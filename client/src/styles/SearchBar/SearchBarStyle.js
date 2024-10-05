export default {
    control: (provided) => ({
      ...provided,
      background: 'none',
      color: 'var(--text-white)',
      minWidth: '360px',
      borderRadius: '2px',
      border: '2px solid rgba(39, 46, 57, 255);',
      outline: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(39, 46, 57, 255)',
      color: 'var(--text-white)',

    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(60, 72, 89, 255)' : 'rgba(39, 46, 57, 255)',
      color: 'var(--text-white)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--text-white)',
    }),
  };