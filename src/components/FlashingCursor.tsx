const FlashingCursor = ({
  height,
  width,
}: {
  height: string;
  width: string;
}) => {
  return (
    <span
      className="cursor"
      style={{
        height: height,
        width: width,
      }}
    ></span>
  );
};

export default FlashingCursor;
