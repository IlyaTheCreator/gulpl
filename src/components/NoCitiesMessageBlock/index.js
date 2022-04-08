const NoCitiesMessageBlock = () => {
  return (
    <div className="empty-city-list-container">
      <p className="empty-city-list-container__text">
        It seems like you don't have any cities selected.{" "}
        <span className="empty-city-list-container__action">
          Let's add one!
        </span>
      </p>
    </div>
  );
};

export default NoCitiesMessageBlock;
