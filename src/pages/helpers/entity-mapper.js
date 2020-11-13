export default function entityMapper(id, data) {
  return (entity) => {
    if (entity._id === id) {
      return {
        ...entity,
        ...data,
      };
    }

    return entity;
  };
}
