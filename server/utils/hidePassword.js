function hidePassword(schema) {
  const strip = (_doc, ret) => {
    delete ret.password;
    return ret;
  };
  schema.set("toJSON", { transform: strip });
  schema.set("toObject", { transform: strip });
}

module.exports = hidePassword;
