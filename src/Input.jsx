function Input({ label, type, className, ...props }) {
  return (
    <>
      <div className="form-group">
        {label && <label>{label}</label>}
        <input type={type} className={className} {...props} />
      </div>
    </>
  );
}
export default Input;
