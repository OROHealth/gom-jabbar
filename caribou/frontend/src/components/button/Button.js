function Button(props) {
  return (
    <motion.button
      className
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 4px rgb(255,255,255)",
        color: "#4787c7",
        border: "1px solid #4787c7",
      }}
    >
      props.label
    </motion.button>
  );
}
