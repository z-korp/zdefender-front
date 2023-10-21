import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import useIP from './hooks/useIp';
import Canvas from './ui/Canvas';
import Credits from './ui/Credits';
import LeaderBoardButton from './ui/LeaderBoardButton';
import Leaderboard from './ui/Leaderboard';
import RulesModal from './ui/RulesModal';
import { useElementStore } from './utils/store';

function App() {
  Modal.setAppElement('#root');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRuleModalOpen, setRuleModalOpen] = useState(false);

  const [isLeaderBoardModalOpen, setLeaderBoardModalOpen] = useState(false);
  const [isMusicPlaying, setMusicPlaying] = useState(false);

  const toggleMusic = () => {
    const newIsMusicPlaying = !isMusicPlaying;
    localStorage.setItem('isMusicPlaying', JSON.stringify(newIsMusicPlaying));
    setMusicPlaying(newIsMusicPlaying);
  };

  const toggleLeaderBoardModal = () => {
    setLeaderBoardModalOpen(!isLeaderBoardModalOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleRuleModal = () => {
    setRuleModalOpen(!isRuleModalOpen);
  };

  const { set_ip } = useElementStore((state) => state);

  const { ip, loading } = useIP();
  useEffect(() => {
    if (!loading && ip) {
      set_ip(ip);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ip, loading]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex justify-between space p-2">
        <LeaderBoardButton onClick={toggleLeaderBoardModal}></LeaderBoardButton>
        <div className="flex justify-center items-center text-7xl text">zDefender</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 mx-10 my-10 text-white font-bold py-2 px-4 rounded"
          onClick={toggleRuleModal}
        >
          Rules
        </button>
        <button
          onClick={toggleMusic}
          className="p-2 mr-2 text-2xl w-6 "
          style={{ position: 'absolute', top: 5, right: 10 }}
        >
          {isMusicPlaying ? <i className="fa fa-volume-up"></i> : <i className="fa fa-volume-off"></i>}
        </button>
      </div>

      <div className="flex-grow mx-auto mt-2">
        <Canvas setMusicPlaying={setMusicPlaying} />
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} className="modal-base modal-medium" ariaHideApp={false}>
        <div className="relative">
          <button onClick={toggleModal} className="absolute top-[-10px] right-0 p-2">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 w-1 h-full bg-black transform rotate-45 origin-center"></div>
              <div className="absolute inset-0 w-1 h-full bg-black transform -rotate-45 origin-center"></div>
            </div>
          </button>
          <Credits />
        </div>
      </Modal>

      <Modal isOpen={isRuleModalOpen} onRequestClose={toggleRuleModal} className="modal-base modal-large">
        <div className="relative">
          <button onClick={toggleRuleModal} className="absolute top-[-10px] right-0 p-2">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 w-1 h-full bg-black transform rotate-45 origin-center"></div>
              <div className="absolute inset-0 w-1 h-full bg-black transform -rotate-45 origin-center"></div>
            </div>
          </button>
          <RulesModal />
        </div>
      </Modal>

      <Modal
        isOpen={isLeaderBoardModalOpen}
        onRequestClose={toggleLeaderBoardModal}
        className="modal-base modal-large"
        ariaHideApp={false}
      >
        <div className="relative">
          <button onClick={toggleLeaderBoardModal} className="absolute top-[-10px] right-0 p-2">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 w-1 h-full bg-black transform rotate-45 origin-center"></div>
              <div className="absolute inset-0 w-1 h-full bg-black transform -rotate-45 origin-center"></div>
            </div>
          </button>
          <Leaderboard />
        </div>
      </Modal>
    </div>
  );
}

export default App;
