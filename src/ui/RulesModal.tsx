const RulesModal = () => {
  return (
    <div className="text-black flex  flex-col justify-center h-3/4">
      <h2 className="mb-4 text-center">Rules of the game</h2>
      <hr className="my-4 border-2" />
      <div className="text-black grid grid-cols-3 gap-4 m-5">
        <div className="relative">
          <span className=" flex items-center text-center text-black font-bold text-lg ">
            Choose your name and launch the game
          </span>
        </div>
      </div>
    </div>
  );
};
export default RulesModal;
