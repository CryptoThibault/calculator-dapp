function Button({id}) {
  if (id > 9) {
  switch (id) {
    case 10: id = '+'; break
    case 11: id = '-'; break
    case 12: id = '*'; break
    case 13: id = '/'; break
    case 14: id = '%'; break
    case 15: id = '='; break
    case 16: id = 'c'; break
    default: throw new Error(`${id} is not a valid id`)
  }
}
  return (
    <button key={id}>
      {id}
    </button>
  );
};

export default Button;