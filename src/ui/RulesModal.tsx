const RulesModal = () => {
  return (
    <div className="text-black flex flex-col justify-center h-3/4">
      <h2 className="mb-4 text-center text-xl">Rules of the Game</h2>
      <hr className="my-4 border-2" />

      <div className="text-black m-5">
        <h3 className="text-center text-black font-bold text-lg mb-4">Endless Run Mode</h3>
        <p>
          The only available mode is an endless run. This means the game only ends when the player is defeated. Players
          must clear each wave successively, aiming to reach the highest wave possible and secure a spot on the
          leaderboard. If a mob reaches the end of the path, the player loses a life. The game concludes once all lives
          are lost. After successfully clearing a wave, the next wave is unlocked and mobs become progressively
          challenging in line with the wave number.
        </p>

        <h3 className="text-center text-black font-bold text-lg mt-5 mb-4">Towers</h3>
        <p>
          Players can utilize their gold to purchase towers. Each tower boasts unique attributes. Players have the
          option to either construct a new tower or upgrade an existing one.
        </p>

        <h3 className="text-center text-black font-bold text-lg mt-5 mb-4">Mobs</h3>
        <p>
          There are various types of mobs, each with distinctive attributes. The final mob of each wave is a boss,
          possessing the strongest attributes. Upon defeating a mob, players are rewarded with gold. The stronger the
          mob, the greater the reward.
        </p>
      </div>
    </div>
  );
};

export default RulesModal;
