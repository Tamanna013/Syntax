const EmptyChatContainer = () => {
  return (
    <div className="flex-1 hidden md:flex flex-col justify-center items-center bg-[#1c1d25] transition-all duration-1000 text-white">
      <img
        src="/logo.png"
        alt="empty-chat"
        className="w-40 h-40 object-contain mb-6 opacity-70"
      />
      <p className="text-sm opacity-80">Select a chat to start messaging</p>
    </div>
  );
};

export default EmptyChatContainer;
