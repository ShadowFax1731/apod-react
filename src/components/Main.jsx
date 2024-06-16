const Main = ({ data }) => {
  return (
    <div className="image-container">
      <img src={data?.hdurl} alt={data?.title} className="bgImage" />
    </div>
  );
};

export default Main;
